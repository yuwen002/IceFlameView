<template>
  <we-editor
    toolbar-class="toolbar"
    editable-class="editable"
    toolbar-style="border: 1px solid #d9d9d9"
    editable-style="border: 1px solid #d9d9d9"
    :toolbar-option="toolbar"
    :editable-option="editable"
    :toolbar-reloadbefore="onToolbarReloadBefore"
    :editable-reloadbefore="onEditableReloadBefore"
    v-model="formData.jarr"
    v-model:json="formData.jstr"
    v-model:html="formData.html"
  />
</template>

<script>
// 引入 wangeditor5 样式
import '@wangeditor/editor/dist/css/style.css'

import { WeEditor, useWangEditor } from 'wangeditor5-for-vue3'
import { defineComponent, shallowReactive } from 'vue'
export default defineComponent({
  name: 'wangeditor',
  components: { WeEditor },
  setup() {
    // 编辑器配置
    const editableOption = {}

    // 菜单栏配置
    const toolbarOption = {}

    // 防抖时长。当会触发重载的配置项发生变化 365ms 后，编辑器会重载
    const reloadDelary = 365

    // 对于上面的三个对象，经过 useWangEditor 处理后，返回的 editable 和 toolbar 分别对应编辑器和菜单栏的配置项
    const { editable, toolbar } = useWangEditor(
      editableOption,
      toolbarOption,
      reloadDelary
    )

    // 开启只读模式【不可编辑】
    editable.config.readOnly = false

    // 不要使用 reactive/ref，应该使用 shallowReactive/shallowRef 来接收 json array 数据
    const formData = shallowReactive({ jarr: [], jstr: '', html: '' })

    // 在可编辑的重新加载之前
    function onEditableReloadBefore(inst) {
      console.log(inst)
      console.log('editable 即将重载: ' + new Date().toLocaleString())
    }

    // 在工具栏上重新加载之前
    function onToolbarReloadBefore(inst) {
      console.log(inst)
      console.log('toolbar 即将重载: ' + new Date().toLocaleString())
    }

    return {
      editable,
      toolbar,
      formData,
      onEditableReloadBefore,
      onToolbarReloadBefore,
    }
  },
})
</script>

<style scoped></style>
