<template>
  <div>
    <n-form ref="formRef" label-placement="left" :model="formValue" :rules="rules" size="small">
      <n-grid x-gap="12" :cols="4">
        <n-gi v-for="item in formData" :key="item">
          <n-form-item v-if="item.type === 'input' && item.isShow" :label="item.label">
            <n-input v-model:value="formValue[item.field]" @input="item.props.onUpdateValue($event)" :placeholder="item.props.placeholder || '请输入'" />
          </n-form-item>
          <n-form-item v-else-if="item.type === 'select'" :label="item.label">
            <n-select v-model:value="formValue[item.field]" @update:value="item.props.onUpdateValue($event)" :placeholder="item.props.placeholder || '请选择'" :options="item.props.options" />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick">验证</n-button>
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInst } from 'naive-ui';
const formProps = defineProps(['formData']);
console.log('formData', formProps.formData);
const formValue = ref({
  user: {
    name: '',
    age: '',
  },
  phone: '',
});

const rules = {
  user: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: '请输入年龄',
      trigger: ['input', 'blur'],
    },
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input'],
  },
};
const formRef = ref<FormInst | null>(null);
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      window['$message'].success('Valid');
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>
