<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="标题" prop="title">
      <el-input v-model.trim="model.title"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model.trim="model.description"></el-input>
    </el-form-item>
    <el-form-item label="关键字" prop="keyword">
      <el-input v-model.trim="model.keyword"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <wangEditor v-model="valueHtml" :height="300" />
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
import { computed, getCurrentInstance, ref, shallowReactive, watch } from "vue";
import wangEditor  from '@/components/WangEditor/wang-editor.vue'
import { AddSinglePage } from "@/api/arcitle";

export default {
  name: "singlePageAdd",
  components: { wangEditor },
  setup() {
    const { proxy: ctx } = getCurrentInstance()

    const rules = {
      title: [
        {
          required: true,
          message: '标题不能为空',
          trigger: ['blur', 'change'],
        },
      ],
    }

    let loading = false
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)

    const model = ref({
      title: '',
      description: '',
      keyword: '',
      content: '',
    })

    const valueHtml = ref('')


    const submit = () => {
      if (loading) {
        return
      }

      addForm.value.validate(async (valid) => {
        model.value.content = valueHtml.value.value
        if (valid) {
          loading = true
          const { code, message } = await AddSinglePage(model.value)
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
      valueHtml,
      submit,
    }
  }
};
</script>

<style scoped>

</style>
