<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model.trim="model.name"></el-input>
    </el-form-item>
    <el-form-item label="程序模块" prop="module">
      <el-input v-model.trim="model.module"></el-input>
    </el-form-item>
    <el-form-item label="URI地址" prop="uri">
      <el-input v-model.trim="model.uri"></el-input>
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
import { computed, getCurrentInstance, ref } from "vue";
import { AddAuthPermissionExclude } from "@/api/system-permissions";

export default {
  name: 'authPermissionExcludeAdd',
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
      module: [
        {
          required: true,
          message: '程序模块不能为空',
          trigger: ['blur', 'change'],
        },
      ],
      uri: [
        {
          required: true,
          message: 'URI地址不能为空',
          trigger: ['blur', 'change'],
        },
      ],
    }

    let loading = false
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)
    const model = ref({
      name: '',
      module: '',
      remark: '',
    })

    const submit = () => {
      if (loading) {
        return
      }

      addForm.value.validate(async (valid) => {
        if (valid) {
          loading = true
          const { code, message } = await AddAuthPermissionExclude(model.value)
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

    return {
      rules,
      model,
      loading,
      btnText,
      addForm,
      submit,
    }
  }
}
</script>

<style scoped>

</style>
