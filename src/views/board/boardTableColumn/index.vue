<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('boardTableColumn:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="数据表ID">
                <a-input v-model="queryParam.tableId" allow-clear placeholder="请输入数据表ID"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="字段名称">
                <a-input v-model="queryParam.columnName" allow-clear placeholder="请输入字段名称"/>
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
                <a-form-item label="字段类型">
                  <a-input v-model="queryParam.columnType" allow-clear placeholder="请输入字段类型"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="数据类型">
                  <a-input v-model="queryParam.dataType" allow-clear placeholder="请输入数据类型"/>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('boardTableColumn:add')" >
          <a-button type="primary" v-if="hasPerm('boardTableColumn:add')" icon="plus" @click="$refs.addForm.add()">新增数据字段配置</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardTableColumn:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('boardTableColumn:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('boardTableColumn:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('boardTableColumn:edit') & hasPerm('boardTableColumn:delete')"/>
          <a-popconfirm v-if="hasPerm('boardTableColumn:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable, XDown } from '@/components'
  import { boardTableColumnPage, boardTableColumnDelete, boardTableColumnExport } from '@/api/modular/board/boardTableColumn/boardTableColumnManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
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
            title: '数据表ID',
            align: 'center',
            dataIndex: 'tableId'
          },
          {
            title: '字段名称',
            align: 'center',
            dataIndex: 'columnName'
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
            title: '字段类型',
            align: 'center',
            dataIndex: 'columnType'
          },
          {
            title: '数据类型',
            align: 'center',
            dataIndex: 'dataType'
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
          return boardTableColumnPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
      if (this.hasPerm('boardTableColumn:edit') || this.hasPerm('boardTableColumn:delete')) {
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
        this.boardTableColumnDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.boardTableColumnDelete(paramIds)
      },
      boardTableColumnDelete (record) {
        boardTableColumnDelete(record).then((res) => {
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
        boardTableColumnExport(paramIds).then((res) => {
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
  button {
    margin-right: 8px;
  }
</style>
