<template>
  <div>
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { createEditor } from 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'

export default {
  name: 'TinyMCEComponent',
  setup() {
    const editorRef = ref(null)

    onMounted(() => {
      createEditor({
        target: editorRef.value,
        height: 500, // 设置编辑器高度
        // 可以根据需要进行其他配置
      })
    })

    return {
      editorRef,
    }
  },
}
</script>
