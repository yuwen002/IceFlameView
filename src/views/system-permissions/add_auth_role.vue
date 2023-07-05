<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model.trim="model.name"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model.trim="model.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        size="large"
        @click="submit"
      >
        {{ btnText }}
      </el-button>

      <el-button @click="resetForm" size="large">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, getCurrentInstance, ref } from "vue";
import { AddAuthRole } from "@/api/system-permissions";

export default {
  name: "authRoleAdd",
  setup() {
    let loading = false

    const { proxy: ctx } = getCurrentInstance()
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)

    const rules = {
      name: [
        {
          required: true,
          message: '角色名称不能为空',
          trigger: ['blur', 'change'],
        },
      ],
    }

    const model = ref({
      name: '',
      remark: '',
    })

    const submit = () => {
      if (loading) {
        return
      }

      addForm.value.validate(async (valid) => {
        if (valid) {
          loading = true
          const { code, message } = await AddAuthRole(model.value)
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

    // 重置表单方法
    const resetForm = () => {
      addForm.value.resetFields() // 调用 resetFields() 方法
    }

    return {
      loading,
      btnText,
      addForm,
      rules,
      model,
      submit,
      resetForm,
    }
  }
}
</script>

<style scoped>

</style>
