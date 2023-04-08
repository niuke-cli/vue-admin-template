<template>
  <NKForm :form-data="formData" />
</template>

<script lang="ts" setup>
interface FormDataType {
  field: String;
  type: String;
  label: String;
  labelTips: String;
  required: Boolean;
  isShow: Boolean;
  props: {
    placeholder: String;
    options: Array<[]>;
    onUpdateValue: Function;
  };
}
const formData = ref<[FormDataType]>([
  {
    field: 'name',
    type: 'input',
    label: '',
    labelTips: '',
    required: false,
    isShow: true,
    props: {
      placeholder: '',
      options: [],
      onUpdateValue: (e: any) => {
        console.log('e', e);
      },
    },
  },
  {
    field: 'age',
    type: 'select',
    label: '年龄选择',
    labelTips: '年龄选择提示',
    required: false,
    props: {
      placeholder: '请选择',
      options: [
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        let item = formData.value.find((item: { field: string }) => item.field === 'name') as FormDataType;
        item.isShow = e === 2;
        console.log('item', item);
        console.log('formData.value', formData.value);
        console.log('a', e);
      },
    },
  },
]);
</script>
