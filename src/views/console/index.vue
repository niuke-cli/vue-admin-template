<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { useTableData } from '@/components/nk-table/useTableData';
const state = reactive({
  selectedRowKeys: [],
  dataSource: [
    { id: '1', no: 3, title: 'Wonderwall', length: '4:18' },
    { id: '2', no: 4, title: "Don't Look Back in Anger", length: '4:48' },
    { id: '3', no: 12, title: 'Champagne Supernova', length: '7:27' },
  ],
  columns: [
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
  },
  pagination: {},
});
const param = reactive({});
const { dataSource, pagination } = useTableData({
  api: '',
  param,
});
</script>
<template>
  <div class="console">
    <nk-table
      v-model:selected-row-keys="state.selectedRowKeys"
      :dataSource="state.dataSource"
      :columns="state.columns"
      :actionsEvents="state.actionsEvents"
      :pagination="pagination"
    >
    </nk-table>
  </div>
</template>
<style>
.console {
  padding: 50px;
}
</style>
