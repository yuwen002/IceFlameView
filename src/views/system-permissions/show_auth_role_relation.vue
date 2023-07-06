<template>
  <pro-table
    ref="proTable"
    title="列表"
    :request="getList"
    :columns="columns"
    :pagination="paginationConfig"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" @click="$router.push({ name: 'authRoleRelationAdd' })">
        <el-icon><Plus /></el-icon>&nbsp;添加权限绑定
      </el-button>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
    </template>

    <template #account_id_and_name="text"> <!-- 注意这里使用了 v-slot 指令 -->
      <span>{{ `(${text.row.account_id})${text.row.name}` }}</span>
    </template>

    <!-- 操作列 -->
    <template #operate="scope">
      <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="mini" :type="scope.row.status === 1 ? 'warning' : 'danger'" @click="handleStatus(scope.row)">{{ scope.row.status === 1 ? '启用' : '停用' }}</el-button>
    </template>
  </pro-table>

  <el-dialog title="编辑权限" v-model="dialogVisible">
    <el-form ref="editForm" :model="currentData" label-width="90px">
      <el-form-item label="ID">
        <el-input v-model="currentData.id" disabled />
      </el-form-item>
      <el-form-item label="角色信息">
        <el-select v-model="currentData.role_id" placeholder="请选择决角色信息">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员信息">
        <el-select v-model="currentData.account_id" placeholder="请选择决管理员信息">
          <el-option
            v-for="item in accountIdOptions"
            :key="item.account_id"
            :label="item.name"
            :value="item.account_id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>

  </el-dialog>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import {
  EditAuthRoleRelation,
  GetAllSystemMaster,
  GetAuthRole,
  ShowAuthRoleRelation
} from "@/api/system-permissions";

export default {
  name: "authRoleRelationList",
  setup() {
    const { proxy: ctx } = getCurrentInstance()
    const proTable = ref(null)
    const refresh = () => {
      if (proTable.value) {
        proTable.value.refresh()
      }
    }

    const state = reactive({
      columns: [
        { label: "序号", type: "index" },
        { label: "管理员ID", prop: "account_id" },
        { label: "管理员名称",prop: "name" },
        { label: "角色ID", prop: "role_id" },
        { label: "角色名称", prop: "role_name" },
        { label: "创建时间", prop: "created_at" },
        { label: "修改时间", prop: "updated_at" },
        {
          label: "操作",
          fixed: "right",
          width: 180,
          align: "center",
          tdSlot: "operate" // 自定义单元格内容的插槽名称
        }
      ],
      dialogVisible: false,
      currentData: ref(null),
      paginationConfig: {
        layout: "total, prev, pager, next, sizes",
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
      },
    })

    const getList = async (params) => {
      const { code, data, message } = await ShowAuthRoleRelation({
        page: params.current,
        size: params.size
      })
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      }
    }

    // 角色信息
    const roleOptions = ref([])
    const fetchRoleOptions = async () => {
      const { code, message, data } = await GetAuthRole()
      // console.log(data)
      if (+code === 0) {
        roleOptions.value = [...data.list]
      } else {
        ctx.$message.error(message)
      }
    }

    const accountIdOptions = ref([])
    const fetchAccountIdOptions = async () => {
      const { code, message, data } = await GetAllSystemMaster()
      console.log(data)
      if (+code === 0) {
        accountIdOptions.value = [...data.list]
      } else {
        ctx.$message.error(message)
      }
    }

    onMounted(() => {
      fetchRoleOptions()
      fetchAccountIdOptions()
    })

    const handleEdit = (row) => {
      console.log(row)
      state.currentData = { ...row}
      state.dialogVisible = true
    }

    const handleSubmit = async () => {
      try {
        // 获取表单数据
        const formData = { ...state.currentData }
        // console.log(formData)
        const { code, message } =  await EditAuthRoleRelation(formData)

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

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
      roleOptions,
      accountIdOptions,
      handleEdit,
      handleSubmit,
    }
  }
}
</script>

<style scoped>

</style>
