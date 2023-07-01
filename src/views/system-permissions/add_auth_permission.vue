<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="上级菜单" prop="fid">
      <el-select v-model="model.fid" placeholder="请选择上级菜单">
        <el-option
          v-for="item in menuOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model.trim="model.name"></el-input>
    </el-form-item>
    <el-form-item label="程序模块" prop="module">
      <el-input v-model.trim="model.module"></el-input>
    </el-form-item>
    <el-form-item label="URI地址" prop="uri">
      <el-input v-model.trim="model.uri"></el-input>
    </el-form-item>
    <el-form-item label="模块类型" prop="type">
      <el-select v-model="model.type" placeholder="请选择模块类型">
        <el-option label="菜单" value="1"></el-option>
        <el-option label="按钮" value="2"></el-option>
        <el-option label="提交程序" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model.trim="model.sort"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model.trim="model.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="btn"
        size="large"
        @click="submit"
      >
        {{ btnText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import {
  AddAuthPermission,
  GetAuthFirstPermission
} from "@/api/system-permissions";

export default {
  name: 'authPermissionAdd',
  setup() {
    const { proxy: ctx } = getCurrentInstance()

    const rules = {
      name: [
        {
          required: true,
          message: '菜单名称不能为空',
          trigger: ['blur', 'change'],
        },
      ],
      type: [
        {
          required: true,
          message: '模块类型不能为空',
          trigger: ['blur', 'change'],
        },
      ],
      sort: [
        {
          type: 'number',
          message: '排序必须为数字',
          trigger: ['blur', 'change'],
          transform(value) {
            if (value) {
              return Number(value)
            }
          },
        },
      ],
    }

    let loading = false
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)
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

    const model = ref({
      fid: 0,
      name: '',
      module: '',
      uri: '',
      type: '',
      sort: '',
      remark: '',
    })

    const submit = () => {
      if (loading) {
        return
      }

      addForm.value.validate(async (valid) => {
        if (valid) {
          loading = true
          const { code, message } = await AddAuthPermission(model.value)
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000,
            })
            addForm.value.resetFields()
          } else {
            ctx.$message.error(message)
          }
          loading = false
        }
      })
    }

    onMounted(fetchMenuOptions)

    return {
      rules,
      model,
      loading,
      btnText,
      addForm,
      menuOptions,
      fetchMenuOptions,
      submit,
    }
  },
}
</script>

<style scoped></style>
