<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="权限信息" prop="permission_ids">
      <div v-for="item in permissions" :key="item.id">
        <strong>{{ item.name }}</strong>
        <el-checkbox-group v-model="form.permission_ids">
          <el-checkbox v-for="childItem in item.children" :key="childItem.id" :label="childItem.name">
            {{ childItem.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" size="large" @click="submit">
        {{ btnText }}
      </el-button>

      <el-button @click="resetForm" size="large">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { ShowEditAuthRoleRelation } from "@/api/system-permissions";
import { useRoute } from "vue-router";

export default {
  name: 'authRoleRelationShowEdit',
  setup() {
    let loading = false

    const { proxy: ctx } = getCurrentInstance()
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)
    const checkboxOptions = ref([])
    const route = useRoute()
    const fetchCheckboxOptions = async () => {
      const { code, message, data } = await ShowEditAuthRoleRelation({
        role_id: route.params.role_id
      })
    }
    const resetForm = () => {
      addForm.value.resetFields() // 调用 resetFields() 方法
    }

    onMounted(fetchCheckboxOptions)
    return {
      loading,
      btnText,
      addForm,
      checkboxOptions,
      resetForm,
    }
  },
}
</script>

<style scoped></style>
