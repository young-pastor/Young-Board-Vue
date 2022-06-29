<template>
  <a-modal
    title="编辑数据表"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >

    <x-card :spinning="confirmLoading">
      <div slot="content" class="table-page-search-wrapper">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="0" :sm="0">
            <a-form-item v-show="false">
              <a-input v-decorator="['id']"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="数据源ID"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select :disabled="true" style="width: 100%" placeholder="请选择数据源"
                        v-decorator="['dataSourceId' , {rules: [{required: true, message: '请输入数据源ID！'}]}]">
                <a-select-option v-for="(item,index) in dataSourceList" :key="index" :value="item.id">
                  {{ item.displayName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="表名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input :disabled="true" placeholder="请输入表名称"
                       v-decorator="['tableName', {rules: [{required: true, message: '请输入表名称！'}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="展示名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入展示名称"
                       v-decorator="['displayName', {rules: [{required: true, message: '请输入展示名称！'}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="备注"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入备注" v-decorator="['remark']"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="(record) => record.id"
        :rowSelection="options.rowSelection"
      >
        <template slot="operator">
          <a-button type="primary" icon="sync" @click="syncTableColumns()">同步字段</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardTable:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
        </template>
        <span slot="executeParam" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ executeParam }}</ellipsis>
        </span>
        <span slot="executeCode" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ executeCode }}</ellipsis>
        </span>
      </s-table>

    </a-card>
  </a-modal>
</template>

<script>
import { STable, Ellipsis, XCard } from '@/components'
import {boardTableEdit} from '@/api/modular/board/boardTableManage'
import {boardDataSourceList} from "@/api/modular/board/boardDataSourceManage";
import {
  boardTableColumnDelete, boardTableColumnExport,
  boardTableColumnPage , boardTableColumnSync
} from "@/api/modular/board/boardTableColumnManage";

export default {
  name: 'editTableForm',
  components: {
    XCard,
    STable
  },
  data() {
    return {
      labelCol: {
        xs: {span: 24},
        sm: {span: 5}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 15}
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      queryParam: {},
      columns: [
        {
          title: '展示名称',
          align: 'center',
          dataIndex: 'displayName'
        },
        {
          title: '字段名称',
          align: 'center',
          dataIndex: 'columnName'
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
      },
      dataSourceList: []
    }
  },
  methods: {
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue(
          {
            id: record.id,
            dataSourceId: record.dataSourceId,
            tableName: record.tableName,
            displayName: record.displayName,
            refreshType: record.refreshType,
            remark: record.remark
          }
        )
      }, 100)
      this.getDataSourceList()
      this.queryParam.tableId = record.id
    },
    getDataSourceList() {
      boardDataSourceList().then(res => {
        if (res.success) {
          this.dataSourceList = res.data
        }
      })
    },
    handleSubmit() {
      const {form: {validateFields}} = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof (values[key]) === 'object' && values[key] != null) {
              values[key] = JSON.stringify(values[key])
            }
          }
          boardTableEdit(values).then((res) => {
            if (res.success) {
              this.$message.success('编辑成功')
              this.confirmLoading = false
              this.$emit('ok', values)
              this.handleCancel()
            } else {
              this.$message.error('编辑失败')//  + res.message
            }
          }).finally((res) => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    },

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
    },
    syncTableColumns() {
      boardTableColumnSync(this.queryParam).then((res) => {
        if (res.success) {
          this.$message.success('同步成功')
          this.$refs.table.refresh()
        } else {
          this.$message.error('同步失败')
        }
      })
    }
  }
}
</script>
