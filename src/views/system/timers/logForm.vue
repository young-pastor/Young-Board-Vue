<template>
  <a-modal
    title="执行日志"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >

    <x-card >
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="定时任务">
                <a-select v-model="queryLogParam.timerId" placeholder="请选择任务" >
                  <a-select-option v-for="(item,index) in timerList" :key="index" :value="item.id" >{{ item.timerName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryLogParam = {}">重置</a-button>
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
        <template slot="operator">
          <a-button @click="clearLog()" icon="delete" type="danger" v-if="hasPerm('sysTimers:add')">清除日志</a-button>
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
  import { sysTimersLogPage, sysTimersLogDelete } from '@/api/modular/system/sysTimersLogManage'
  import { sysTimersList } from '@/api/modular/system/timersManage'


  export default {
    name: 'sysTimersLogInfo',
    components: {
      XCard,
      STable
    },
    data () {
      return {
        queryLogParam: {
            timerId: ''
        },
        timerList:[],
        columns:[
          {
            title: '执行时间',
            dataIndex: 'executeStartTime'
          },
          {
            title: '执行状态',
            dataIndex: 'executeCode'
          },
          {
            title: '执行信息',
            dataIndex: 'executeMsg'
          }
        ],
        visible: false,
        confirmLoading: false,
        loadData: parameter => {
          return sysTimersLogPage(Object.assign(parameter, this.queryLogParam)).then((res) => {
            return res.data
          })
        }
      }
    },
    computed: {
    },
    methods: {
      // 初始化方法
      queryLog (record) {
        this.visible = true
        this.queryLogParam.timerId = record.id
        this.queryTimerList();
        if(this.$refs.table){
          this.$refs.table.refresh()
        }
      },
      queryTimerList(){
        sysTimersList().then((res) => {
           if (res.success) {
              this.timerList = res.data;
           }
        })
      },
      clearLog(){
        sysTimersLogDelete(this.queryLogParam).then((res) => {
           if (res.success) {
             this.$message.success('删除成功')
             this.$refs.table.refresh()
           }
        })
      },
      handleSubmit () {
        this.confirmLoading = false
        this.visible = false
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>
