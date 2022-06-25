<template>
  <a-modal
    title="表关联设置"
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
            <a-col :md="12" :sm="24" v-show="this.showSelectTable">
              <a-form-item
                label="表名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                has-feedback
              >
                <a-select style="width: 100%" placeholder="请选择表" v-model="queryParam.tableId"
                          @change="selectTableChange">
                  <a-select-option v-for="(item,index) in tableList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item
                label="字段"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                has-feedback
              >
                <a-select style="width: 100%" placeholder="请选择字段" v-model="queryParam.columnId">
                  <a-select-option v-for="(item,index) in tableColumnList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>


            <a-col :md="12" :sm="24">
              <a-form-item
                label="关联表"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                has-feedback
              >
                <a-select style="width: 100%" placeholder="请选择关联表" v-model="queryParam.connectTableId">
                  <a-select-option v-for="(item,index) in connectTableList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="12" :sm="24">
              <a-form-item
                label="关联类型"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                has-feedback
              >
                <a-select style="width: 100%" placeholder="请选择关联类型" v-model="queryParam.connectType">
                  <a-select-option v-for="(item,index) in connectTypeDictTypeDropDown" :key="index" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="24" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
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
          <a-button type="primary" icon="plus" @click="$refs.addConnectForm.add()">新增关联</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardTable:delete')"
                    @click="batchDelete">
            <a-icon type="delete"/>
            批量删除
          </a-button>
        </template>
        <span slot="table" slot-scope="text">
           {{ tableFilter(text) }}
        </span>
        <span slot="column" slot-scope="text">
           {{ columnFilter(text) }}
        </span>
        <span slot="connectTable" slot-scope="text">
           {{ connectTableFilter(text) }}
        </span>
        <span slot="connectColumn" slot-scope="text">
           {{ connectColumnFilter(text) }}
        </span>
        <span slot="connectType" slot-scope="text">
           {{ connectTypeFilter(text) }}
        </span>
      </s-table>
      <add-connect-form ref="addConnectForm" @ok="handleOk"/>
    </a-card>
  </a-modal>
</template>

<script>
import {STable, XCard} from '@/components'
import {boardTableList} from '@/api/modular/board/boardTable/boardTableManage'
import {boardTableColumnList} from "@/api/modular/board/boardTableColumn/boardTableColumnManage";
import {
  boardTableConnectDelete,
  boardTableConnectPage
} from "@/api/modular/board/boardTableConnect/boardTableConnectManage";
import addConnectForm from './addConnectForm.vue'

export default {
  name: 'connectTableForm',
  components: {
    XCard,
    STable,
    addConnectForm
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
          title: '表名称',
          align: 'center',
          dataIndex: 'tableId',
          scopedSlots: {customRender: 'table'}
        },
        {
          title: '字段名称',
          align: 'center',
          dataIndex: 'columnId',
          scopedSlots: {customRender: 'column'}
        },
        {
          title: '关联表',
          align: 'center',
          dataIndex: 'connectTableId',
          scopedSlots: {customRender: 'connectTable'}
        },
        {
          title: '关联字段',
          align: 'center',
          dataIndex: 'connectColumnId',
          scopedSlots: {customRender: 'connectColumn'}
        },
        {
          title: '光联类型',
          align: 'center',
          dataIndex: 'connectType',
          scopedSlots: {customRender: 'connectType'}
        }
      ],
      loadData: parameter => {
        return boardTableConnectPage(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true, clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      showSelectTable: true,
      tableList: [],
      columnList: [],
      connectTableList: [],
      tableColumnList: [],
      connectTypeDictTypeDropDown: []
    }
  },
  methods: {
    // 初始化方法
    connect(record) {
      this.visible = true
      this.queryParam = {}
      this.showSelectTable = true;
      if (record) {
        this.showSelectTable = false;
        this.queryParam.tableId = record.id
      }
      this.loadSelectDataList()
      if (this.$refs.table) {
        this.$refs.table.refresh()
      }
    },
    tableFilter(t) {
      const values = this.tableList.filter(item => item.id == t)
      if (values.length > 0) {
        return values[0].displayName
      }
    },
    columnFilter(t) {
      const values = this.columnList.filter(item => item.id == t)
      if (values.length > 0) {
        return values[0].displayName
      }
    },
    connectTableFilter(t) {
      const values = this.tableList.filter(item => item.id == t)
      if (values.length > 0) {
        return values[0].displayName
      }
    },
    connectColumnFilter(t) {
      const values = this.columnList.filter(item => item.id == t)
      if (values.length > 0) {
        return values[0].displayName
      }
    },
    connectTypeFilter(t) {
      const values = this.connectTypeDictTypeDropDown.filter(item => item.code == t)
      if (values.length > 0) {
        return values[0].name
      }
    },
    loadSelectDataList() {
      boardTableList().then(res => {
        if (res.success) {
          this.tableList = res.data
          this.loadBoardConnectTableList();
        }
      })
      boardTableColumnList().then(res => {
        if (res.success) {
          this.columnList = res.data
        }
      })
      this.connectTypeDictTypeDropDown = this.$options.filters['dictData']('board_connect_type')
    },
    selectTableChange(e) {
      this.tableColumnList = this.columnList.filter(item => item.tableId == e);
      this.loadBoardConnectTableList(e)
    },
    loadBoardConnectTableList(e) {
      if (!e) {
        this.connectTableList = this.tableList
        return;
      }
      var dsId = this.tableList.find(function (item, index) {
        return item.id === e;
      });
      dsId = dsId.dataSourceId;
      this.connectTableList = this.tableList.filter(item => item.dataSourceId == dsId && item.id != e);
    },

    handleSubmit() {
      this.handleCancel()
    },
    handleCancel() {
      this.visible = false
    },

    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{'id': record.id}]
      this.boardTableConnectDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map((d) => {
        return {'id': d}
      })
      this.boardTableConnectDelete(paramIds)
    },
    boardTableConnectDelete(record) {
      boardTableConnectDelete(record).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.clearRefreshSelected()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map((d) => {
        return {'id': d}
      })
      boardTableColumnExport(paramIds).then((res) => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
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
