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
                <a-button icon="edit" size="small" @click="editEventGroup"></a-button>
                <a-button icon="sync" size="small" @click="loadEventGroupTree"></a-button>
                <a-button type="danger" icon="delete" size="small" @click="deleteEventGroup"></a-button>
              </a-button-group>
            </div>
          </a-card>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-card :bordered="false" :loading="treeLoading">
            <div v-if="this.eventGroupTree!='' ">
              <a-tree
                style="scroll:true"
                :treeData="eventGroupTree"
                v-if="eventGroupTree.length"
                :show-line="true"
                :show-icon="true"
                @select="selectEventGroup"
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
        <div class="table-page-search-wrapper" v-if="hasPerm('boardEvent:page')">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="事件分组">
                  <a-input v-model="queryParam.eventGorupId" allow-clear placeholder="请输入事件分组"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="事件名称">
                  <a-input v-model="queryParam.displayName" allow-clear placeholder="请输入事件名称"/>
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
                  <a-form-item label="事件值">
                    <a-input v-model="queryParam.value" allow-clear placeholder="请输入事件值"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="事件值类型">
                    <a-input v-model="queryParam.valueType" allow-clear placeholder="请输入事件值类型"/>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
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
          <template class="table-operator" slot="operator" v-if="hasPerm('boardEvent:add')">
            <a-button type="primary" v-if="hasPerm('boardEvent:add')" icon="plus" @click="$refs.addForm.add()">新增元事件配置
            </a-button>
            <a-button
              type="danger"
              :disabled="selectedRowKeys.length < 1"
              v-if="hasPerm('boardEvent:delete')"
              @click="batchDelete">
                 <a-icon type="delete"/>
              批量删除
            </a-button>
            <x-down
              v-if="hasPerm('boardEvent:export')"
              ref="batchExport"
              @batchExport="batchExport"
            />
          </template>
          <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('boardEvent:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('boardEvent:edit') & hasPerm('boardEvent:delete')"/>
          <a-popconfirm v-if="hasPerm('boardEvent:delete')" placement="topRight" title="确认删除？"
                        @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
        </s-table>
        <add-form ref="addForm" @ok="handleOk"/>
        <edit-form ref="editForm" @ok="handleOk"/>
        <add-group-form ref="addGroupForm" @ok="loadEventGroupTree" />
        <edit-group-form ref="editGroupForm" @ok="loadEventGroupTree" />
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import {Empty} from 'ant-design-vue'
import {STable, XDown} from '@/components'
import {
  boardEventGroupDetail,
  boardEventGroupDelete,
  boardEventGroupTree
} from "@/api/modular/board/boardEventGroup/boardEventGroupManage"
import {boardEventDelete, boardEventExport, boardEventPage} from '@/api/modular/board/boardEvent/boardEventManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
import addGroupForm from './addGroupForm.vue'
import editGroupForm from './editGroupForm.vue'

export default {
  components: {
    STable,
    addForm,
    editForm,
    addGroupForm,
    editGroupForm,
    XDown
  },
  data() {
    return {
      eventGroupTree: [],
      selectedEventGroup: {},
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
          title: '事件分组',
          align: 'center',
          dataIndex: 'eventGorupId'
        },
        {
          title: '事件名称',
          align: 'center',
          dataIndex: 'displayName'
        },
        {
          title: '表字段ID',
          align: 'center',
          dataIndex: 'tableColumnId'
        },
        {
          title: '计算方式',
          align: 'center',
          dataIndex: 'measure'
        },
        {
          title: '事件值',
          align: 'center',
          dataIndex: 'value'
        },
        {
          title: '事件值类型',
          align: 'center',
          dataIndex: 'valueType'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return boardEventPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    }
  },
  created() {
    if (this.hasPerm('boardEvent:edit') || this.hasPerm('boardEvent:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
    this.loadEventGroupTree()
  },
  methods: {
    loadEventGroupTree() {
      boardEventGroupTree(Object.assign(this.queryParam)).then(res => {
        this.treeLoading = false
        if (!res.success) {
          this.eventGroupTree = []
          return
        }
        this.eventGroupTree = res.data
      })
    },
    selectEventGroup(e) {
      this.selectedEventGroup = e.toString()
    },
    deleteEventGroup() {
      boardEventGroupDelete([{id:this.selectedEventGroup}]).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.loadEventGroupTree();
          }
      })
    },
    editEventGroup() {
      boardEventGroupDetail({id:this.selectedEventGroup}).then(res => {
        if (res.success) {
          this.$refs.editGroupForm.edit(res.data)
        }
      })
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ 'id': record.id }]
      this.boardEventDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'id': d }
      })
      this.boardEventDelete(paramIds)
    },
    boardEventDelete(record) {
      boardEventDelete(record).then((res) => {
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
        return { 'id': d }
      })
      boardEventExport(paramIds).then((res) => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
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
