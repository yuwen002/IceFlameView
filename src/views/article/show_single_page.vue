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
      <el-button type="primary" @click="$router.push({ name: 'singlePageAdd' })">
        <el-icon><Plus /></el-icon>&nbsp;添加单页
      </el-button>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
    </template>

    <template #article_status="status">
      <span :style="{ color: status.row.status === 1 ? 'red' : '' }">{{ status.row.status === 1 ? '停用' : '正常' }}</span>
    </template>

    <!-- 操作列 -->
    <template #operate="scope">
      <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="mini" :type="scope.row.status === 1 ? 'warning' : 'danger'" @click="handleStatus(scope.row)">{{ scope.row.status === 1 ? '启用' : '停用' }}</el-button>
    </template>
  </pro-table>
</template>

<script>
import { getCurrentInstance, reactive, ref, toRefs } from "vue";
import { EditStatusSinglePage, ShowSinglePage } from "@/api/arcitle";

export default {
  name: "singlePageList",
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
        { label: "ID", prop: "id" },
        { label: "标题", prop: "title" },
        { label: "点击量", prop: "click" },
        { label: "状态", prop: "status", tdSlot: "article_status" },
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
      const { code, data, message } = await ShowSinglePage({
        page: params.current,
        size: params.size
      })
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      }
    }

    const handleStatus = async (row) => {
      const isConfirmed = confirm(row.status ? '是否启用？' : '是否停用？')

      if (isConfirmed) {
        const statusData = {
          status: row.status ? 0 : 1,
          id: row.id,
        }

        const { code, message } = await EditStatusSinglePage(statusData)
      }
    }


    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
      handleStatus,
    }
  }
};
</script>

<style scoped></style>
