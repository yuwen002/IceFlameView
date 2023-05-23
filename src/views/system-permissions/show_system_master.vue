<template>
  <pro-table ref="proTable" title="列表" :request="getList" :columns="columns">
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" @click="$router.push({ name: 'add_system_master' })">
        <el-icon><Plus /></el-icon>&nbsp;创建账号
      </el-button>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </template>

    <template #operate="scope">
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import { ShowSystemMaster } from "@/api/system-permissions";

export default defineComponent({
  name: 'systemMasterList',
  setup() {
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
          label: "操作",
          fixed: "right",
          width: 180,
          align: "center",
          tdSlot: "operate" // 自定义单元格内容的插槽名称
        }
      ]
    });

    // 请求函数
    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { code, data, message } = await ShowSystemMaster(state.params);

      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      };
    };


    const proTable = ref(null);
    // 刷新
    const refresh = () => {
      proTable.value.refresh();
    };

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh
    };
  }
});
</script>
