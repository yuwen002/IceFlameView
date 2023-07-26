<template>
  <pro-table
    ref="proTable"
    title="列表"
    :request="getList"
    :columns="columns"
    :pagination="paginationConfig"
  >
    <template #account_id_and_name="text">
      <span>{{ `(${text.row.account_id})${text.row.system_master_name}` }}</span>
    </template>
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
    </template>


  </pro-table>

</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { ShowVisitLogs } from "@/api/system-permissions";

export default {
  name: "visitLogsShow",
  setup() {
    const proTable = ref(null)
    const refresh = () => {
      if (proTable.value) {
        proTable.value.refresh()
      }
    }

    const state = reactive({
      columns: [
        { label: "序号", type: "index" },
        { label: "ID", prop: "id" },
        { label: "管理员", prop: "account_id", tdSlot: "account_id_and_name" },
        { label: "分类", prop: "os_category_name" },
        { label: "标题", prop: "visit_category_name" },
        { label: "说明", prop: "description" },
        { label: "IP", prop: "ip" },
        { label: "创建时间", prop: "created_at" },
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
      const { code, data, message } = await ShowVisitLogs({
        page: params.current,
        size: params.size
      })
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
}
</script>

<style scoped>

</style>
