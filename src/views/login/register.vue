<template>
  <div class="register">
    <el-form class="form" :model="model" :rules="rules" ref="registerForm">
      <h1 class="title">管理员注册</h1>
      <el-form-item label="电话" prop="tel" label-width="100px">
        <el-input v-model.trim="model.tel"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="100px">
        <el-input type="password" v-model.trim="model.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" label-width="100px">
        <el-input type="password" v-model.trim="model.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" label-width="100px">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" class="btn login-btn" size="large" @click="toSubmit">登入</el-button>
        <el-button type="primary" class="btn register-btn" size="large" @click="submit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, unref } from "vue";
import { Register } from "@/api/login";
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'

export default {
  name: "register",
  setup(props) {
    const { proxy: ctx } = getCurrentInstance()
    const registerForm = ref(null)
    const router = useRouter()
    const rules = {
      tel: [
        {
          required: true,
          message: "手机号码不能为空",
          trigger: ["blur", "change"]
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "手机号码格式不正确",
          trigger: "blur"
        }
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
            } else if (value !== model.password) {
              return Promise.reject("两次输入密码不一致");
            } else {
              return Promise.resolve();
            }
          },
          trigger: "blur"
        }
      ],
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
    }

    const model = reactive({
      tel: "",
      password: "",
      confirmPassword: "",
      name: ""
    })

    const submit = async () => {
      const form = unref(registerForm)
      console.log(form.validate())
      try {
        await form.validate()
        const { code, message } = await Register(model)
        console.log(code)
        if (+code === 0) {
          ctx.$message.success({
            message: "注册成功",
            duration: 3000,
          })
          form.resetFields()

          let timer = setTimeout(() => {
            clearTimeout(timer) // 清除定时器
            router.push('/login') // 这里是跳转到名为 home 的页面的示例
          }, 2000)
        } else {
          ctx.$message.error(message)
        }
      } catch (error) {
        ElMessage.error("请检查表单填写是否正确");
      }
    }

    const toSubmit = () => {

    }

    onMounted(() => {
      // 页面 DOM 渲染完毕之后，注册表单组件实例
      registerForm.value = ctx.$refs.registerForm;
    })

    return {
      model,
      rules,
      submit,
      toSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;

  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;

    :deep {
      .el-input__wrapper {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        background: rgba(0, 0, 0, 0.1);
      }

      .el-input-group--append > .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .el-input-group--prepend > .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }

    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        color: #fff;
        height: 48px;
        line-height: 48px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .btn {
      width: 45%;
    }

    .login-btn {
      margin-right: 15px;
    }

    .register-btn {
      margin-left: 10px; /* 调整注册按钮左侧的间距 */
    }

    .form-item {
      display: flex;
      align-items: center;
    }

    .form-item label {
      margin-right: 10px;
    }

    .el-form-item__content {
      width: calc(100% - 100px);
      display: flex;
      align-items: center;
    }
  }
}
</style>
