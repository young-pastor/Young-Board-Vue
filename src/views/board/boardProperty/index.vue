<template>
  <a-row :gutter="24">
    <a-col :md="5" :sm="24">
      <a-row :gutter="24">
        <a-col :md="24" :sm="24">
          <a-card :bordered="false" >
            <span>分组</span>
            <div :style="{ float: 'right', overflow: 'hidden' }">
              <a-button-group>
                <a-button icon="plus" size="small" @click="$refs.addGroupForm.add()"></a-button>
                <a-button icon="edit" size="small" @click="editPropertyGroup"></a-button>
                <a-button icon="sync" size="small" @click="loadPropertyGroupTree"></a-button>
                <a-button type="danger" icon="delete" size="small" @click="deletePropertyGroup"></a-button>
              </a-button-group>
            </div>
          </a-card>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-card :bordered="false" :loading="treeLoading">
            <div v-if="this.propertyGroupTree!='' ">
              <a-tree
                style="scroll:true"
                :treeData="propertyGroupTree"
                v-if="propertyGroupTree.length"
                :show-line="true"
                :show-icon="true"
                @select="selectPropertyGroup"
                :style="{overflow:'hidden',overflowX:'scroll'}"
                :replaceFields="replaceFields" />

            </div>
            <div v-else>
              <a-empty :image="simpleImage"/>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :md="19" :sm="24">
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('boardProperty:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="属性名称">
                <a-input v-model="queryParam.displayName" allow-clear placeholder="请输入属性名称"/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="表字段ID">
                  <a-input v-model="queryParam.tableColumnId" allow-clear placeholder="请输入表字段ID"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="计算方式">
                  <a-input v-model="queryParam.measure" allow-clear placeholder="请输入计算方式"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值">
                  <a-input v-model="queryParam.value" allow-clear placeholder="请输入属性值"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值类型">
                  <a-input v-model="queryParam.valueType" allow-clear placeholder="请输入属性值类型"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值">
                  <a-input v-model="queryParam.unit" allow-clear placeholder="请输入属性值"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值类型">
                  <a-input v-model="queryParam.unitType" allow-clear placeholder="请输入属性值类型"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值类型">
                  <a-input v-model="queryParam.isDefault" allow-clear placeholder="请输入属性值类型"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="属性值类型">
                  <a-input v-model="queryParam.remark" allow-clear placeholder="请输入属性值类型"/>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('boardProperty:add')" >
          <a-button type="primary" v-if="hasPerm('boardProperty:add')" icon="plus" @click="$refs.addForm.add()">新增属性</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('boardProperty:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('boardProperty:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="propertyGroup" slot-scope="text">
            {{ propertyGroupFilter(text) }}
          </span>
        <span slot="dataSource" slot-scope="text">
            {{ dataSourceFilter(text) }}
          </span>
        <span slot="table" slot-scope="text">
            {{ tableFilter(text) }}
          </span>
        <span slot="tableColumn" slot-scope="text">
            {{ tableColumnFilter(text) }}
          </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('boardProperty:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('boardProperty:edit') & hasPerm('boardProperty:delete')"/>
          <a-popconfirm v-if="hasPerm('boardProperty:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <add-group-form ref="addGroupForm" @ok="loadPropertyGroupTree" />
      <edit-group-form ref="editGroupForm" @ok="loadPropertyGroupTree" />
    </a-card>

    </a-col>
    </a-row>
</template>
<script>
  import { Empty } from 'ant-design-vue'
  import { STable, XDown } from '@/components'
  import {
    boardPropertyGroupDetail,
    boardPropertyGroupDelete,
    boardPropertyGroupTree,
    boardPropertyGroupList
  } from '@/api/modular/board/boardPropertyGroupManage'
  import { boardPropertyPage, boardPropertyDelete, boardPropertyExport } from '@/api/modular/board/boardPropertyManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import addGroupForm from './addGroupForm.vue'
  import editGroupForm from './editGroupForm.vue'
  import { boardDataSourceList } from '@/api/modular/board/boardDataSourceManage'
  import { boardTableList } from '@/api/modular/board/boardTableManage'
  import { boardTableColumnList } from '@/api/modular/board/boardTableColumnManage'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      addGroupForm,
      editGroupForm,
      XDown
    },
    data () {
      return {

        replaceFields: {
          key: 'id'
        },
        treeLoading: true,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '属性名称',
            align: 'center',
            dataIndex: 'displayName'
          },
          {
            title: '属性分组',
            align: 'center',
            dataIndex: 'propertyGroupId',
            scopedSlots: { customRender: 'propertyGroup' }
          },
          {
            title: '数据源',
            align: 'center',
            dataIndex: 'dataSourceId',
            scopedSlots: { customRender: 'dataSource' }
          },
          {
            title: '数据表',
            align: 'center',
            dataIndex: 'tableId',
            scopedSlots: { customRender: 'table' }
          },
          {
            title: '表字段',
            align: 'center',
            dataIndex: 'tableColumnId',
            scopedSlots: { customRender: 'tableColumn' }
          },
          {
            title: '计算方式',
            align: 'center',
            dataIndex: 'measure'
          },
          {
            title: '属性值',
            align: 'center',
            dataIndex: 'value'
          },
          {
            title: '属性值类型',
            align: 'center',
            dataIndex: 'valueType'
          },
          {
            title: '属性值',
            align: 'center',
            dataIndex: 'unit'
          },
          {
            title: '属性值类型',
            align: 'center',
            dataIndex: 'unitType'
          },
          {
            title: '属性值类型',
            align: 'center',
            dataIndex: 'isDefault'
          },
          {
            title: '属性值类型',
            align: 'center',
            dataIndex: 'remark'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return boardPropertyPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        propertyGroupList: [],
        propertyGroupTree: [],
        dataSourceDropDown: [],
        tableList: [],
        tableDropDown: [],
        columnList: [],
        columnDropDown: []
      }
    },
    created () {
      if (this.hasPerm('boardProperty:edit') || this.hasPerm('boardProperty:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
      this.loadPropertyGroupTree()
    },
    methods: {
      loadPropertyGroupTree() {
        boardPropertyGroupTree(Object.assign(this.queryParam)).then(res => {
          this.treeLoading = false
          this.propertyGroupTree = [{
            'id': '-1',
            'parentId': '0',
            'title': '顶级',
            'value': '0',
            'pid': '0'
          }]
          if (!res.success) {
            return
          }
          this.propertyGroupTree[0]['children'] = res.data
        })
        boardPropertyGroupList().then(res => {
          this.propertyGroupList = res.data
        })
        boardDataSourceList().then(res => {
          this.dataSourceDropDown = res.data
        })
        boardTableList().then(res => {
          this.tableList = res.data
        })
        boardTableColumnList().then(res => {
          this.columnList = res.data
        })
      },

      propertyGroupFilter(t) {
        const values = this.propertyGroupList.filter(item => item.id === t)
        if (values.length > 0) {
          return values[0].displayName
        }
      },
      dataSourceFilter(t) {
        const values = this.dataSourceDropDown.filter(item => item.id === t)
        if (values.length > 0) {
          return values[0].displayName
        }
      },
      tableFilter(t) {
        const values = this.tableList.filter(item => item.id === t)
        if (values.length > 0) {
          return values[0].displayName
        }
      },
      tableColumnFilter(t) {
        const values = this.columnList.filter(item => item.id === t)
        if (values.length > 0) {
          return values[0].displayName
        }
      },
      selectPropertyGroup(e) {
        this.queryParam.propertyGroupId = e.toString()
      },
      deletePropertyGroup() {
        boardPropertyGroupDelete([ { id: this.queryParam.propertyGroupId } ]).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.loadPropertyGroupTree()
          }
        })
      },
      editPropertyGroup() {
        boardPropertyGroupDetail({ id: this.queryParam.propertyGroupId }).then(res => {
          if (res.success) {
            this.$refs.editGroupForm.edit(res.data)
          }
        })
      },
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'id': record.id }]
        this.boardPropertyDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.boardPropertyDelete(paramIds)
      },
      boardPropertyDelete (record) {
        boardPropertyDelete(record).then((res) => {
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
        boardPropertyExport(paramIds).then((res) => {
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
