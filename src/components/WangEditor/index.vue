<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleInput"
    />
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>fffffffffffff</p>') //  工具栏配置

    const toolbarConfig = {
      excludeKeys: [
        'fullScreen', //不显示全屏
        'group-video', // 不显示上传视频
      ],
    }

    //菜单配置
    const editorConfig = {
      placeholder: '请输入内容...',

      MENU_CONF: {
        // 配置默认字号
        // 配置上传图片
        uploadImage: {
          // 上传图片请求接口路径
          server: '/api//v1/upload/file',
          // 后端接收的文件名称
          fieldName: 'multipartFile',
          maxFileSize: 10 * 1024 * 1024, // 上传图片10M
          // 上传的图片类型
          allowedFileTypes: ['image/*'],
          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 10 * 1024, // 10MB
          // 自定义上传图片返回格式【后端返回的格式】
          customInsert(res, insertFn) {
            if (res.code != 200) {
              ElMessage.error('上传文件失败，' + res.message)
              return
            }

            // 从 res 中找到 url alt href ，然后插入图片 ,根据后端实际返回的字段来

            insertFn(res.data.url, res.data.alt, res.data.url)
          },

          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: true,
          // 单个文件上传成功之后
          onSuccess(file, res) {
            if (res.code == 200) {
              ElMessage.success(`${file.name} 上传成功`)
              return
            } else {
              ElMessage.warning(`${file.name} 上传出了点异常`)
              return
            }
            // console.log(`${file.name} 上传成功`, res)
            //ElMessage.success(`${file.name} 上传成功`, res)
          },
          // 单个文件上传失败
          onFailed(file, res) {
            console.log(res)
            ElMessage.error(`${file.name} 上传失败`)
          },
          // 上传错误，或者触发 timeout 超时
          onError(file, err, res) {
            console.log(err, res)
            ElMessage.error(`${file.name} 上传出错`)
          },
        },
      },
    }

    const handleInput = () => {
      // 监听输入事件，更新valueHtml的值
      valueHtml.value = editorRef.value?.value || ''
      console.log("我的：", editorRef.value)
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = editor => {
      editorRef.value = editor // 记录 editor 实例，重要！
      // 查看所有工具栏key，先查看可以根据实际情况进项增删
      // console.log(editor.getAllMenuKeys())
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleInput,
    }
  },
}
</script>
