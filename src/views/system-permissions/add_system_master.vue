<template>
  <el-form :model="model" :rules="rules" ref="addForm" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model.trim="model.username"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-input v-model.trim="model.tel"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model.trim="model.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model.trim="model.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model.trim="model.name"></el-input>
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
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
  watch
} from "vue";
import { AddSystemMaster } from "@/api/system-permissions";

export default defineComponent({
  name: "systemMasterAdd",
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    watch(() => state.addForm, (addForm) => {
      if (addForm) {
        state.addForm.value = addForm.model
      }
    })
    const getRules = () => ({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" }
      ],
      tel: [
        { required: true, message: "手机号码不能为空", trigger: ["blur", "change"] },
        { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 5, max: 32, message: "长度在 5 到 32 个字符", trigger: "blur" }
      ],
      confirmPassword: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        {
          validator: (rule, value) => {
            if (value === "") {
              return Promise.reject("请再次输入密码");
            } else if (value !== state.addForm.value.password) {
              return Promise.reject("两次输入密码不一致");
            } else {
              return Promise.resolve();
            }
          },
          trigger: "blur"
        }
      ],
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" }
      ]
    });
    const state = reactive({
      model: {
        username: "",
        tel: "",
        password: "",
        confirmPassword: "",
        name: ""
      },
      rules: getRules(),
      loading: false,
      btnText: computed(() =>
        state.loading ? "提交中..." : "提交"
      ),
      addForm: ref(null),
      submit: () => {
        if (state.loading) {
          return;
        }
        state.addForm.validate(async valid => {
          if (valid) {
            state.loading = true;
            const { code, message } = await AddSystemMaster(state.model);
            if (+code === 0) {
              ctx.$message.success({
                message: message,
                duration: 1000
              });
            } else {
              ctx.$message.error(message);
            }
            state.loading = false;
          }
        });
      }
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>
