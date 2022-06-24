<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('boardTable:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="数据源ID">
                <a-input v-model="queryParam.dataSourceId" allow-clear placeholder="请输入数据源ID"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="表名称">
                <a-input v-model="queryParam.tableName" allow-clear placeholder="请输入表名称"/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="展示名称">
                  <a-input v-model="queryParam.displayName" allow-clear placeholder="请输入展示名称"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="刷新方式">
                  <a-input v-model="queryParam.refreshType" allow-clear placeholder="请输入刷新方式"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="备注">
                  <a-input v-model="queryParam.remark" allow-clear placeholder="请输入备注"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="8" :sm="24" >
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="(record) => record.id"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('boardTable:add')" >
          <a-button type="primary" v-if="hasPerm('boardTable:add')" icon="plus" @click="$refs.addForm.add()">新增数据表</a-button>
          <a-button type="primary" icon="sync" @click="$refs.syncForm.sync()">同步数据表</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardTable:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('boardTable:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('boardTable:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('boardTable:edit') & hasPerm('boardTable:delete')"/>
          <a-popconfirm v-if="hasPerm('boardTable:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <sync-form ref="syncForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable, XDown } from '@/components'
  import { boardTablePage, boardTableDelete, boardTableExport } from '@/api/modular/board/boardTable/boardTableManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import syncForm from './syncForm.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      syncForm,
      XDown
    },
    data () {
      return {
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '数据源ID',
            align: 'center',
            dataIndex: 'dataSourceId'
          },
          {
            title: '表名称',
            align: 'center',
            dataIndex: 'tableName'
          },
          {
            title: '展示名称',
            align: 'center',
            dataIndex: 'displayName'
          },
          {
            title: '刷新方式',
            align: 'center',
            dataIndex: 'refreshType'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return boardTablePage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: [],
        options: {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
      }
    },
    created () {
      if (this.hasPerm('boardTable:edit') || this.hasPerm('boardTable:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
    },
    methods: {
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'id': record.id }]
        this.boardTableDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.boardTableDelete(paramIds)
      },
      boardTableDelete (record) {
        boardTableDelete(record).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.clearRefreshSelected()
          } else {
            this.$message.error('删除失败') // + res.message
          }
        })
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        boardTableExport(paramIds).then((res) => {
            this.$refs.batchExport.downloadfile(res)
        })
      },
      handleOk () {
        this.$refs.table.refresh()
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }
  }
</script>
<style lang="less">
  .table-operator {
    margin-bottom: 18px;
  }
</style>
