<template>
  <pro-table
    ref="proTable"
    title="列表"
    :request="getList"
    :columns="columns"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" @click="$router.push({ name: 'systemMasterAdd' })">
        <el-icon><Plus /></el-icon>&nbsp;创建账号
      </el-button>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
    </template>

    <template #user_status="status">
      <span :style="{ color: status.row.status === 1 ? 'red' : '' }">{{ status.row.status === 1 ? '冻结' : '正常' }}</span>
    </template>

    <!-- 操作列 -->
    <template #operate="scope">
      <el-button size="small" type="primary" @click="handleResetPasswordEdit(scope.row)">重置密码</el-button>
      <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="small" @click="handleUnlock(scope.row)">解锁</el-button>
      <el-button size="small" :type="scope.row.status === 1 ? 'warning' : 'danger'" @click="handleStatus(scope.row)">{{ scope.row.status === 1 ? '启用' : '停用' }}</el-button>
    </template>
  </pro-table>


  <el-dialog title="重置密码" v-model="dialogVisibleResetPassword">
    <el-form ref="resetPasswordForm" :rules="resetPasswordRules" :model="model" label-width="90px">
      <el-form-item label="ID">
        <el-input v-model="currentData.account_id" disabled />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="currentData.username" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="currentData.name" disabled />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="currentData.tel" disabled />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="model.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input v-model.trim="model.confirm_password"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleResetPassword(currentData)">确 定</el-button>
      <el-button @click="dialogVisibleResetPassword = false">取 消</el-button>
    </template>

  </el-dialog>

  <!-- 编辑表单对话框 -->
  <el-dialog title="编辑账号" v-model="dialogVisible">
    <el-form ref="editForm" :model="currentData" label-width="90px">
      <el-form-item label="ID">
        <el-input v-model="currentData.account_id" disabled />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="currentData.username" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="currentData.name" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="currentData.tel" />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-radio-group v-model="currentData.status">
          <el-radio :label="0" :checked="currentData.status === 0">正常</el-radio>
          <el-radio :label="1" :checked="currentData.status === 1">冻结</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>

  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref, toRefs } from "vue";
import {
  ShowSystemMaster,
  EditSystemMaster,
  EditStatusSystemMaster,
  ResetPasswordSystemMaster, UnlockSystemMaster
} from "@/api/system-permissions";

export default defineComponent({
  name: 'systemMasterList',
  setup() {
    const { proxy: ctx } = getCurrentInstance()
    const state = reactive({
      columns: [
        { label: "序号", type: "index" },
        { label: "ID", prop: "account_id" },
        { label: "用户名", prop: "username" },
        { label: "姓名", prop: "name" },
        { label: "电话", prop: "tel" },
        {
          label: "用户状态",
          prop: "status",
          tdSlot: "user_status"
        },
        {
          label: "操作",
          fixed: "right",
          width: 380,
          align: "center",
          tdSlot: "operate" // 自定义单元格内容的插槽名称
        }
      ],
      dialogVisible: false,
      dialogVisibleResetPassword: false,
      currentData: {},

      paginationConfig: {
        layout: "total, prev, pager, next, sizes",
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
      },
    })

    // 请求函数
    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { code, data, message } = await ShowSystemMaster({
        page: params.current,
        size: params.size
      })

      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      }
    }

    const proTable = ref(null)
    // 刷新
    const refresh = () => {
      proTable.value.refresh()
    }

    // 打开编辑表单对话框
    const handleEdit = (row) => {
      state.currentData = { ...row } // 这里需要深拷贝一份，防止修改数据时影响列表中的数据
      state.dialogVisible = true
    }

    // 提交修改
    const handleSubmit = async () => {
      try {
        // 获取表单数据
        const formData = { ...state.currentData }
        // console.log(formData)
        const { code, message } =  await EditSystemMaster(formData)

        if (+code === 0) {
          ctx.$message.success({
            message: message,
            duration: 1000,
          })
        } else {
          ctx.$message.error(message)
        }

        proTable.value.refresh() // 重新加载表格数据
        state.dialogVisible = false // 隐藏表单对话框
      } catch (error) {
        console.error(error)
      }
    }

    const handleStatus = async (row) => {
      try {
        const isConfirmed = confirm(row.status ? '是否启用？' : '是否停用？')

        if (isConfirmed) {
          const statusData = {
            status: row.status ? 0 : 1,
            account_id: row.account_id
          }
          const { code, message } = await EditStatusSystemMaster(statusData)
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
          } else {
            ctx.$message.error(message)
          }

          proTable.value.refresh()
        }
      } catch (error) {
        console.error(error)
      }
    }

    const handleUnlock = async (row) => {
      try {
        const isConfirmed = confirm('是否解锁用户？')

        if (isConfirmed) {
          const unlockData = {
            account_id: row.account_id
          }

          const { code, message } = await UnlockSystemMaster(unlockData)

          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
          } else {
            ctx.$message.error(message)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    const handleResetPasswordEdit = (row) => {
      state.currentData = { ...row } // 这里需要深拷贝一份，防止修改数据时影响列表中的数据
      state.dialogVisibleResetPassword = true
    }

    const resetPasswordForm = ref(null)
    const resetPasswordRules = {
      password: [
        {
          required: true,
          message: "新密码称不能为空",
          trigger: ["blur", "change"]
        },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" },
      ],
      confirm_password: [
        {
          required: true,
          message: "确认新密码不能为空",
          trigger: ["blur", "change"]
        },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" },
        {
          validator: (rule, value) => {
            if (value === '') {
              return Promise.reject('请再次输入密码')
            } else if (value !== model.value.password) {
              return Promise.reject('两次输入密码不一致')
            } else {
              return Promise.resolve()
            }
          },
          trigger: 'blur',
        },
      ],
    }
    const model = ref({
      account_id: '',
      password: '',
      confirm_password: '',
    })

    const handleResetPassword = async (row) => {
      try {
        const isConfirmed = confirm('是否重置用户密码')

        if (isConfirmed) {
          const resetPasswordData = {
            account_id: row.account_id,
            password: model.value.password,
            confirm_password: model.value.confirm_password,
          }
          console.log(resetPasswordData)
          const { code, message } = await ResetPasswordSystemMaster(resetPasswordData)
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
          } else {
            ctx.$message.error(message)
          }
          state.dialogVisibleResetPassword = false
          proTable.value.refresh()
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
      handleEdit,
      handleSubmit,
      handleStatus,
      resetPasswordForm,
      resetPasswordRules,
      model,
      handleResetPasswordEdit,
      handleResetPassword,
    }
  }
})
</script>
