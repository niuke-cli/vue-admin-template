<template>
  <n-data-table
    :size="size"
    :columns="state.columns"
    :data="dataSource"
    :loading="state.loading"
    :bordered="bordered"
    :striped="striped"
    :single-line="singleLine"
    :row-key="rowKey"
    :pagination="pagination"
    @update:checked-row-keys="handleCheck"
  />
</template>

<script lang="ts" setup>
import {
  DataTableColumns,
  DataTableRowKey,
  NButton,
  PaginationInfo,
} from 'naive-ui';
interface PaginationObj {
  page: number;
}
const props = withDefaults(
  defineProps<{
    /** 表格源数据 */
    dataSource: Record<string, unknown>[];
    /** 需要展示的列信息 */
    columns: DataTableColumns[];
    /** 子节点的属性名 */
    childrenProp?: string;
    /** 需要合并的连续列的属性名*/
    // mergeProps?: string[]
    /** 尺寸 'small' | 'medium' | 'large' */
    size?: string;
    /** 超过几行则显示展开/缩起 */
    min?: number;
    /** 是否带边框 */
    bordered?: boolean;
    /** 是否带条纹 */
    striped?: boolean;
    /** 单行线 */
    singleLine?: boolean;
    /** 是否开启勾选 */
    hasCheck?: boolean;

    /** 唯一值的属性名 */
    rowKey?: Function;
    /** 拓展的插槽属性名 */
    extendSlotAttrNames?: string[];
    /** 分页 */
    pagination?: boolean | object;
    /** 操作事件 */
    actionsEvents?: { render: Function };
  }>(),
  {
    size: 'large',
    min: 2,
    bordered: true,
    striped: false,
    loading: false,
    singleLine: false,
    rowKey: (row: any) => row.id,
    pagination: () => {
      return { page: 1 };
    },
  }
);

const state = reactive<{
  loading: boolean;
  dataSource: Record<string, unknown>[];
  columns: DataTableColumns[];
}>({
  loading: false,
  dataSource: [],
  columns: [],
});

const emit = defineEmits(['update:selected-row-keys']);

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  emit('update:selected-row-keys', rowKeys);
};

const createColumns = (columns: any[]) => {
  columns.forEach((item) => {
    if (item.key === 'actions') {
      item.render = props.actionsEvents?.render;
    }
  });
  return columns;
};
watch(
  () => props.dataSource,
  (dataSource) => {
    state.loading = true;
    setTimeout(() => {
      state.loading = false;
    }, 600);
  },
  { immediate: true }
);

watch(
  () => props.columns,
  (columns) => {
    if (props.childrenProp) state.columns = createColumns(columns);
    else state.columns = createColumns(columns);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
