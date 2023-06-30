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
      <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="mini" :type="scope.row.status === 1 ? 'warning' : 'danger'" @click="handleStatus(scope.row)">{{ scope.row.status === 1 ? '启用' : '停用' }}</el-button>
    </template>
  </pro-table>

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
import { ShowSystemMaster, EditSystemMaster, EditStatusSystemMaster } from "@/api/system-permissions";

export default defineComponent({
  name: 'systemMasterList',
  setup() {
    const { proxy: ctx } = getCurrentInstance()
    const state = reactive({
      params: {
        page: "1",
        size: "10"
      },
      // 表格列配置，大部分属性跟el-table-column配置一样
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
          width: 180,
          align: "center",
          tdSlot: "operate" // 自定义单元格内容的插槽名称
        }
      ],
      dialogVisible: false,
      currentData: {}
    })

    // 请求函数
    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { code, data, message } = await ShowSystemMaster(state.params)

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
          // console.log(statusData)
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

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
      handleEdit,
      handleSubmit,
      handleStatus,
    }
  }
})
</script>
