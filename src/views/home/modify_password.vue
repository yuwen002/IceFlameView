<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="旧密码" prop="old_password">
      <el-input v-model.trim="model.old_password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_password">
      <el-input v-model.trim="model.new_password"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="confirm_new_password">
      <el-input v-model.trim="model.confirm_new_password"></el-input>
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

    </el-form-item>
  </el-form>
</template>

<script>
import { computed, getCurrentInstance, ref } from "vue";
import { ModifyPassword } from "@/api/system-permissions-exclude";

export default {
  name: "modifyPassword",
  setup() {
    let loading = false;

    const { proxy: ctx } = getCurrentInstance();
    const btnText = computed(() => (loading ? "提交中..." : "提交"));
    const addForm = ref(null);

    const rules = {
      old_password: [
        {
          required: true,
          message: "旧密码称不能为空",
          trigger: ["blur", "change"]
        },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" },
      ],
      new_password: [
        {
          required: true,
          message: "新密码称不能为空",
          trigger: ["blur", "change"]
        },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" },
      ],
      confirm_new_password: [
        {
          required: true,
          message: "确认新密码不能为空",
          trigger: ["blur", "change"]
        },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" },
        {
          validator: (rule, value) => {
            if (value === '') {
              return Promise.reject('请再次输入密码')
            } else if (value !== model.value.password) {
              return Promise.reject('两次输入密码不一致')
            } else {
              return Promise.resolve()
            }
          },
          trigger: 'blur',
        },
      ]
    };

    const model = ref({
      old_password: "",
      new_password: "",
      confirm_new_password: ""
    });

    const submit = () => {
      if (loading) {
        return;
      }

      addForm.value.validate(async (valid) => {
        if (valid) {
          loading = true;
          const { code, message } = await ModifyPassword(model.value);
          if (+code === 0) {
            ctx.$message.success({
              message: message,
              duration: 1000
            });
            addForm.value.resetFields();
          } else {
            ctx.$message.error(message);
          }
          loading = false;
        }
      });
    };

    return {
      loading,
      btnText,
      addForm,
      rules,
      model,
      submit
    };
  }
};
</script>

<style scoped>

</style>
