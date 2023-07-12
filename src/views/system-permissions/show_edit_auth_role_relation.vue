<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="权限信息" prop="permission_ids">
      <div v-for="item in checkboxOptions" :key="item.id">
        <strong>{{ item.name }}</strong>
        <el-checkbox-group v-model="model.permission_ids">
          <el-checkbox
            v-for="childItem in item.children"
            :key="childItem.id"
            :label="childItem.id"
            :value="childItem.id"
            :checked="childItem.checked === 1"
            @change="updateCheckedState(childItem)"
          >
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
import { computed, getCurrentInstance, onMounted, ref, reactive } from 'vue'
import {
  EditAuthRolePermissionRelation,
  ShowEditAuthRoleRelation
} from "@/api/system-permissions";
import { useRoute } from 'vue-router'

export default {
  name: 'authRoleRelationShowEdit',
  methods: { reactive },
  setup() {
    let loading = false

    const { proxy: ctx } = getCurrentInstance()
    const btnText = computed(() => (loading ? '提交中...' : '提交'))
    const addForm = ref(null)
    const route = useRoute()
    const model = ref({
      permission_ids: [],
    })

    const checkboxOptions = ref([])
    const fetchCheckboxOptions = async () => {
      const { code, message, data } = await ShowEditAuthRoleRelation({
        role_id: route.query.role_id,
      })

      if (+code === 0) {
        checkboxOptions.value = [...data.list]
      } else {
        ctx.$message.error(message)
      }
    }
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

          const params = {
            permission_ids: model.value.permission_ids,
            role_id: route.query.role_id,
          }

          const { code, message } = await EditAuthRolePermissionRelation(params)
          console.log(message)
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

    const updateCheckedState = (childItem) => {
      childItem.checked = childItem.checked === 1 ? 0 : 1;
    }

    onMounted(fetchCheckboxOptions)
    return {
      loading,
      btnText,
      addForm,
      model,
      checkboxOptions,
      resetForm,
      submit,
      updateCheckedState,
    }
  },
}
</script>

<style scoped></style>
