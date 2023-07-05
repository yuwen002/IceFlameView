<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="角色名称" prop="name">
      <el-select v-model="model.role_id" placeholder="请选择决角色信息">
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="管理员信息" prop="account_id">
      <el-select v-model="model.account_id" placeholder="请选择决角色信息">
        <el-option
          v-for="item in accountIdOptions"
          :key="item.account_id"
          :label="item.name"
          :value="item.account_id"
        ></el-option>
      </el-select>
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
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { GetAuthRole } from "@/api/system-permissions";

export default {
  name: "authRoleRelationAdd",
  setup() {
    let loading = false;

    const { proxy: ctx } = getCurrentInstance();
    const btnText = computed(() => (loading ? "提交中..." : "提交"));
    const addForm = ref(null);

    const model = ref({
      role_id: '',
      account_id: '',
    })

    // 角色信息
    const roleOptions = ref([])
    const fetchRoleOptions = async () => {
      const { code, message, data } = await GetAuthRole()
      // console.log(data)
      if (+code === 0) {
        roleOptions.value = [{ id: 0, name: '一级菜单' }, ...data.list]
      } else {
        ctx.$message.error(message)
      }
    }

    onMounted(fetchRoleOptions)

    return {
      loading,
      btnText,
      addForm,
      model,
      roleOptions,
    }
  }
};
</script>

<style scoped>

</style>
