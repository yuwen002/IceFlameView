<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="访问类型标题" prop="title">
      <el-input v-model.trim="model.title"></el-input>
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
import { AddAuthRole, AddVisitCategory } from "@/api/system-permissions";

export default {
  name: "visitCategoryAdd",
  setup() {
    let loading = false

    const { proxy: ctx } = getCurrentInstance()
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)

    const rules = {
      title: [
        {
          required: true,
          message: '访问类型标题不能为空',
          trigger: ['blur', 'change'],
        },
      ],
    }

    const model = ref({
      title: '',
    })

    const resetForm = () => {
      addForm.value.resetFields() // 调用 resetFields() 方法
    }

    const submit = () => {
      if (loading) {
        return
      }

      addForm.value.validate(async (valid) => {
        if (valid) {
          loading = true
          const { code, message } = await AddVisitCategory(model.value)
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
      loading,
      btnText,
      addForm,
      rules,
      model,
      submit,
      resetForm,
    }
  },
}
</script>

<style scoped>

</style>
