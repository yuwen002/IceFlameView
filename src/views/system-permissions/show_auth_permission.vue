<template>

  <pro-table
    ref="proTable"
    title="列表"
    :request="getList"
    :columns="columns"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" @click="$router.push({ name: 'authPermissionAdd' })">
        <el-icon><Plus /></el-icon>&nbsp;添加权限
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

</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref, toRefs } from "vue";
import { ShowAuthPermission } from "@/api/system-permissions";

export default defineComponent({
  name: "authPermissionList",
  setup() {
    const { proxy: ctx } = getCurrentInstance()
    const proTable = ref(null)
    const refresh = () => {
      proTable.value.refresh()
    }

    const state = reactive({
      params: {
        page: "1",
        size: "10"
      },
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { label: "序号", type: "index" },
        { label: "ID", prop: "id" },
        { label: "菜单名称", prop: "name" },
        { label: "程序模块", prop: "module" },
        { label: "URI地址", prop: "uri" },
        { label: "模块状态", prop: "status", tdSlot: "user_status" },
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

    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { code, data, message } = await ShowAuthPermission(state.params)

      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      }
    }

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
    }
  }
})
</script>

<style scoped>

</style>
