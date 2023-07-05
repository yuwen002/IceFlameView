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
      <el-button type="primary" @click="$router.push({ name: 'authPermissionAdd' })">
        <el-icon><Plus /></el-icon>&nbsp;添加权限
      </el-button>
      <el-button type="danger" @click="refresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</el-button>
    </template>

    <template #module_status="status">
      <span :style="{ color: status.row.status === 1 ? 'red' : '' }">{{ status.row.status === 1 ? '停用' : '正常' }}</span>
    </template>

    <!-- 操作列 -->
    <template #operate="scope">
      <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="mini" :type="scope.row.status === 1 ? 'warning' : 'danger'" @click="handleStatus(scope.row)">{{ scope.row.status === 1 ? '启用' : '停用' }}</el-button>
    </template>
  </pro-table>

  <!-- 编辑表单对话框 -->
  <el-dialog title="编辑权限" v-model="dialogVisible">
    <el-form ref="editForm" :model="currentData" label-width="90px">
      <el-form-item label="ID">
        <el-input v-model="currentData.id" disabled />
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="currentData.fid" placeholder="请选择上级菜单">
          <el-option
            v-for="item in menuOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="currentData.name" />
      </el-form-item>
      <el-form-item label="程序模块">
        <el-input v-model="currentData.module" />
      </el-form-item>
      <el-form-item label="URI地址">
        <el-input v-model="currentData.uri" />
      </el-form-item>
      <el-form-item label="模块类型">
        <el-select v-model="currentData.type" placeholder="请选择模块类型">
          <el-option label="菜单" value="1"></el-option>
          <el-option label="按钮" value="2"></el-option>
          <el-option label="提交程序" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="currentData.sort" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="currentData.remark" />
      </el-form-item>
      <el-form-item label="模块状态">
        <el-radio-group v-model="currentData.status">
          <el-radio :label="0" :checked="currentData.status === 0">正常</el-radio>
          <el-radio :label="1" :checked="currentData.status === 1">停用</el-radio>
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
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, toRefs, watch } from "vue";
import {
  EditAuthPermission, EditAuthStatusPermission,
  GetAuthFirstPermission,
  ShowAuthPermission
} from "@/api/system-permissions";

export default defineComponent({
  name: "authPermissionList",
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
        { label: "菜单名称", prop: "name" },
        { label: "程序模块", prop: "module" },
        { label: "URI地址", prop: "uri" },
        { label: "模块状态", prop: "status", tdSlot: "module_status" },
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
      // console.log("getlist:", params)
      const { code, data, message } = await ShowAuthPermission({
        page: params.current,
        size: params.size
      })
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total
      }
    }

    const menuOptions = ref([]) // 下拉菜单选项的数据数组
    const fetchMenuOptions = async () => {
      const { code, message, data } = await GetAuthFirstPermission()
      // console.log(data)
      if (+code === 0) {
        menuOptions.value = [{ id: 0, name: '一级菜单' }, ...data.list]
      } else {
        ctx.$message.error(message)
      }
    }

    // 打开编辑表单对话框
    const handleEdit = (row) => {
      state.currentData = { ...row, 'type': row.type.toString()} // 这里需要深拷贝一份，防止修改数据时影响列表中的数据
      state.dialogVisible = true
    }

    const handleSubmit = async () => {
      try {
        // 获取表单数据
        const formData = { ...state.currentData }
        // console.log(formData)
        const { code, message } =  await EditAuthPermission(formData)

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
            id: row.id,
          }
          // console.log(statusData)
          const { code, message } = await EditAuthStatusPermission(statusData)
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

    onMounted(fetchMenuOptions)

    return {
      ...toRefs(state),
      proTable,
      getList,
      refresh,
      menuOptions,
      fetchMenuOptions,
      handleEdit,
      handleSubmit,
      handleStatus,
    }
  }
})
</script>

<style scoped>

</style>
