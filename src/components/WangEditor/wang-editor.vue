<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  components: { Editor, Toolbar },
  setup(props, { emit }) {
    const editorRef = shallowRef();
    const valueHtml = ref('');

    const toolbarConfig = {};
    const editorConfig = { placeholder: '请输入内容...' };

    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    const handleCreated = (editor) => {
      console.log('created', editor);
      editorRef.value = editor;
    };
    const handleChange = (editor) => {
      console.log('change:', editor.getHtml());
    };

    return {
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      emitValueChange(newValue) {
        emit('update:modelValue', { value: newValue });
      },
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.valueHtml = newVal.value;
      },
    },
    valueHtml(newVal) {
      this.emitValueChange(newVal);
    },
  },
};
</script>
