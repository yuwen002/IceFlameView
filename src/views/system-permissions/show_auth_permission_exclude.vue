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
      <el-button
        type="primary"
        @click="$router.push({ name: 'authRoleRelationShowAdd' })"
      >
        <el-icon>
          <Plus />
        </el-icon>
        &nbsp;添加排除权限
      </el-button>
      <el-button type="danger" @click="refresh">
        <el-icon>
          <Refresh />
        </el-icon>
        &nbsp;刷新
      </el-button>
    </template>

    <!-- 操作列 -->
    <template #operate="scope">
      <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
        编辑
      </el-button>
      <el-button size="mini" type="primary" @click="handleDelete(scope.row)">
        删除
      </el-button>
    </template>
  </pro-table>

  <el-dialog title="编辑排除权限" v-model="dialogVisible">
    <el-form ref="editForm" :model="currentData" label-width="90px">
      <el-form-item label="ID">
        <el-input v-model="currentData.id" disabled />
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
      <el-form-item label="备注">
        <el-input v-model="currentData.remark" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import {
  DelAuthPermissionExclude, EditAuthPermissionExclude,
  ShowAuthPermission,
  ShowAuthPermissionExclude
} from "@/api/system-permissions";

export default {
  name: 'authPermissionExcludeList',
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
        { label: '序号', type: 'index' },
        { label: 'ID', prop: 'id' },
        { label: '菜单名称', prop: 'name' },
        { label: '程序模块', prop: 'module' },
        { label: 'URI地址', prop: 'uri' },
        { label: '创建时间', prop: 'created_at' },
        { label: '修改时间', prop: 'updated_at' },
        {
          label: '操作',
          fixed: 'right',
          width: 180,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
      ],
      dialogVisible: false,
      currentData: ref(null),
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes',
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
      },
    })

    const getList = async params => {
      const { code, data, message } = await ShowAuthPermissionExclude({
        page: params.current,
        size: params.size,
      })
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total,
      }
    }

    const handleEdit = (row) => {
      state.currentData = { ...row} // 这里需要深拷贝一份，防止修改数据时影响列表中的数据
      state.dialogVisible = true
    }

    const handleSubmit = async () => {
        try {
          // 获取表单数据
          const formData = { ...state.currentData }
          const { code, message } =  await EditAuthPermissionExclude(formData)
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
          } else {
            ctx.$message.error(message)
          }

          proTable.value.refresh()
          state.dialogVisible = false
        } catch (error) {
          console.error(error)
        }
    }

    const handleDelete = async row => {
      try {
        const isConfirmed = confirm('是否删除？')
        if (isConfirmed) {
          const delData = { id: row.id }
          const { code, message } = await DelAuthPermissionExclude(delData)
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
            proTable.value.refresh()
          } else {
            ctx.$message.error(message)
          }
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
      handleDelete,
      handleSubmit,
    }
  },
}
</script>

<style scoped></style>
