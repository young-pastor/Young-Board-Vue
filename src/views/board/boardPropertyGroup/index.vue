<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('boardPropertyGroup:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="分组名称">
                <a-input v-model="queryParam.displayName" allow-clear placeholder="请输入分组名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('boardPropertyGroup:add')" >
          <a-button type="primary" v-if="hasPerm('boardPropertyGroup:add')" icon="plus" @click="$refs.addForm.add()">新增属性分组</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardPropertyGroup:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('boardPropertyGroup:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('boardPropertyGroup:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('boardPropertyGroup:edit') & hasPerm('boardPropertyGroup:delete')"/>
          <a-popconfirm v-if="hasPerm('boardPropertyGroup:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { boardPropertyGroupPage, boardPropertyGroupDelete, boardPropertyGroupExport } from '@/api/modular/board/boardPropertyGroup/boardPropertyGroupManage'
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
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '分组名称',
            align: 'center',
            dataIndex: 'displayName'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return boardPropertyGroupPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
      if (this.hasPerm('boardPropertyGroup:edit') || this.hasPerm('boardPropertyGroup:delete')) {
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
        this.boardPropertyGroupDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.boardPropertyGroupDelete(paramIds)
      },
      boardPropertyGroupDelete (record) {
        boardPropertyGroupDelete(record).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.clearRefreshSelected()
          } else {
            this.$message.error('删除失败') // + res.message
          }
        })
      },
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        boardPropertyGroupExport(paramIds).then((res) => {
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
