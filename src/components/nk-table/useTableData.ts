import { ref, reactive, toRefs, toRaw, onMounted, nextTick } from 'vue'
export function useTableData(params: any) {

  const handlePageSizeChange = (pageSize: number) => {
    console.log('pageSize',pageSize)
    pagination.pageSize = pageSize
    pagination.page = 1
    // getData()
  }

  const handlePageChange = (page: number) => {
    console.log('page',page)
    pagination.page = page
    // getData()
  }

  const dataSource = ref([])
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    pageCount: 10,
    pageSizes: [10, 20, 50],
    showSizePicker:true,
    onChange: handlePageChange,
    onUpdatePageSize:handlePageSizeChange
  })

  const getData = async () => {
    const page = pagination.page
    const limit = pagination.pageSize
    let datas
    if (params.param) {
      datas = {
        page,
        limit,
        data: {
          ...toRaw(params.param),
        },
      }
    } else {
      datas = {
        page,
        limit,
      }
    }
    let data = await params.api(params.url, datas)
    console.log('data', data)
    if (data.data) {
      pagination.pageCount = data.data.total || 0
      dataSource.value =  data.data.list || data.data.records
    } else {
      pagination.pageCount = data.data ? data.data.total : 0
      dataSource.value =  []
    }
  }

  

  const getSearch = ()=>{
    pagination.page = 1
    pagination.pageSize = 20
    getData()
  }

  onMounted(() => {
    // getData()
  })

  return {
    dataSource,
    pagination,
    getData,
    handlePageSizeChange,
    handlePageChange,
    getSearch
  }
}