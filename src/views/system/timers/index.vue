<template>
  <div>
    <x-card v-if="hasPerm('sysTimers:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="任务名称">
                <a-input v-model="queryParam.timerName" allow-clear placeholder="请输入任务名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="任务状态">
                <a-select v-model="queryParam.jobStatus" placeholder="请选择状态" >
                  <a-select-option v-for="(item,index) in jobStatusDictTypeDropDown" :key="index" :value="item.code" >{{ item.value }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
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
        :alert="false"
        :rowKey="(record) => record.id"
      >
        <template slot="operator" v-if="hasPerm('sysTimers:add')">
          <a-button @click="$refs.addForm.add()" icon="plus" type="primary" v-if="hasPerm('sysTimers:add')">新增定时器</a-button>
        </template>
        <span slot="actionClass" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="remark" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="jobStatus" slot-scope="text,record" v-if="hasPerm('sysTimers:start') || hasPerm('sysTimers:stop')">
          <a-popconfirm placement="top" :title="text===1? '确定停止该任务？':'确定启动该任务？'" @confirm="() => editjobStatusStatus(text,record)">
            <a-badge :status="text===1? 'processing':'default'" />
            <a>{{ 'run_status' | dictType(text) }}</a>
          </a-popconfirm>
        </span>
        <span slot="jobStatus" v-else>
          <a-badge :status="text===1? 'processing':'default'" />
          {{ 'run_status' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('sysTimers:edit')" @click="$refs.editForm.edit(record)">编辑</a>

          <a-divider type="vertical" v-if="hasPerm('sysTimers:execute')"/>
          <a v-if="hasPerm('sysTimers:execute')" @click="$refs.executeForm.execute(record)">执行</a>
          <a-divider type="vertical" v-if="hasPerm('sysTimers:queryLog') & hasPerm('sysTimers:queryLog')"/>
          <a v-if="hasPerm('sysTimers:execute')" @click="$refs.logForm.queryLog(record)">日志</a>
          <a-divider type="vertical" v-if="hasPerm('sysTimers:edit') & hasPerm('sysTimers:delete')"/>
          <a-popconfirm v-if="hasPerm('sysTimers:delete')" placement="topRight" title="确认删除？" @confirm="() => sysTimersDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <execute-form ref="executeForm" @ok="handleOk" />
      <log-form ref="logForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable, Ellipsis, XCard } from '@/components'
  import { sysTimersPage, sysTimersDelete, sysTimersStart, sysTimersStop } from '@/api/modular/system/timersManage'
  import addForm from './addForm'
  import editForm from './editForm'
  import executeForm from './executeForm'
  import logForm from './logForm'
  export default {
    name: 'PosIndex',
    components: {
      XCard,
      STable,
      Ellipsis,
      addForm,
      editForm,
      executeForm,
      logForm
    },
    data () {
      return {
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '任务名称',
            dataIndex: 'timerName'
          },
          {
            title: '任务class类名',
            dataIndex: 'actionClass',
            scopedSlots: { customRender: 'actionClass' }
          },
          {
            title: '定时任务表达式',
            dataIndex: 'cron'
          },
          {
            title: '备注',
            dataIndex: 'remark',
            scopedSlots: { customRender: 'remark' }
          },
          {
            title: '状态',
            dataIndex: 'jobStatus',
            scopedSlots: { customRender: 'jobStatus' }
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return sysTimersPage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        jobStatusDictTypeDropDown: []
      }
    },
    created () {
      this.sysDictTypeDropDown()// 注释掉
      if (this.hasPerm('sysTimers:edit') || this.hasPerm('sysTimers:delete')) {
        this.columns.push({
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
    },
    methods: {
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.jobStatusDictTypeDropDown = this.$options.filters['dictData']('run_status')
      },
      // jobStatusFilter (jobStatus) {
      //   // eslint-disable-next-line eqeqeq
      //   const values = this.jobStatusDictTypeDropDown.filter(item => item.code == jobStatus)
      //   if (values.length > 0) {
      //     return values[0].value
      //   }
      // },
      /**
       * 启动停止
       */
      editjobStatusStatus (code, record) {
        // eslint-disable-next-line eqeqeq
        if (code == 1) {
          sysTimersStop({ id: record.id }).then(res => {
            if (res.success) {
              this.$message.success('停止成功')
              this.$refs.table.refresh()
            } else {
              this.$message.error('停止失败：' + res.message)
            }
          })
        // eslint-disable-next-line eqeqeq
        } else if (code == 2) {
          sysTimersStart({ id: record.id }).then(res => {
            if (res.success) {
              this.$message.success('启动成功')
              this.$refs.table.refresh()
            } else {
              this.$message.error('启动失败：' + res.message)
            }
          })
        }
      },
      sysTimersDelete (record) {
        sysTimersDelete(record).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.refresh()
          } else {
            this.$message.error('删除失败：' + res.message)
          }
        }).catch((err) => {
          this.$message.error('删除错误：' + err.message)
        })
      },
      handleOk () {
        this.$refs.table.refresh()
      }
    }
  }
</script>
<style lang="less">
  .table-operator {
    margin-bottom: 18px;
  }
</style>
