<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { useTableData } from '@/components/nk-table/useTableData';
const state = reactive({
  selectedRowKeys: [],
  dataSource: [],// 表格数据
  columns: [ // 列
    {
      type: 'selection',
    },
    {
      title: 'No',
      key: 'no',
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Length',
      key: 'length',
    },
    {
      title: 'Action',
      key: 'actions',
    },
  ],
  actionsEvents: {
    render(row: any) {
      return [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => console.log(row),
          },
          { default: () => 'Send Email' }
        ),
        h(
          NButton,
          {
            size: 'small',
            onClick: () => console.log(row),
          },
          { default: () => 'Send Email' }
        ),
      ];
    },
  },//操作
});
const param = reactive({

}); // 查询参数
//dataSource 数据, pagination 分页相关参数
const { dataSource, pagination } = useTableData({
  api: '',// 接口
  param,
});
</script>
<template>
  <nk-table
    v-model:selected-row-keys="state.selectedRowKeys"
    :dataSource="state.dataSource"
    :columns="state.columns"
    :actionsEvents="state.actionsEvents"
    :pagination="pagination"
  >
  </nk-table>
</template>
<style>
</style>
