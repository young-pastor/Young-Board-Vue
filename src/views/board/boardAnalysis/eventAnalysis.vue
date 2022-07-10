<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <div v-for="(analysisEvent,index) in analysisParam.eventList" :key="index">
            <a-row :gutter="24" style="margin-top: 10px">
              <a-col :md="1" :sm="12">
                <a-form-item label="">
                  <a-button type="primary" shape="circle" size="small" disabled>
                    {{ String.fromCharCode(index + 65) }}
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col :md="5" :sm="12">
                <a-form-item>
                  <a-button-group
                    style="display: inline-block; vertical-align: middle"
                    :compact="true"
                  >
                    <a-button type="text" disabled style="background: #FFFFFF;border: 0px">
                      {{ getAnalysisEventDisplayName(analysisEvent) }}
                    </a-button>
                    <a-button type="link" size="small" icon="edit"></a-button>
                  </a-button-group>
                </a-form-item>
              </a-col>
              <a-col :md="2" :sm="24">
                <a-button type="link" shape="round" icon="copy">复制</a-button>
              </a-col>
              <a-col :md="1" :sm="24">
                <a-button type="link" shape="round" icon="delete">删除</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :offset="1" :md="4" :sm="20">
                <a-form-item label="">
                  <a-select v-model="analysisEvent.eventId" allow-clear placeholder="请选择事件">
                    <a-select-option v-for="(item,index) in eventList" :key="index" :value="item.id">{{
                        item.displayName
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="1" :sm="4">
                <a-form-item label="">
                  <a-button type="text" disabled style="background: #FFFFFF;border: 0px">的</a-button>
                </a-form-item>
              </a-col>
              <a-col :md="3" :sm="24">
                <a-form-item label="">
                  <a-select v-model="analysisEvent.property.id" allow-clear placeholder="请选择">
                    <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                      {{ item.displayName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="2" :sm="24">
                <a-form-item label="">
                  <a-select v-model="analysisEvent.property.measure" allow-clear placeholder="请选择">
                    <a-select-option v-for="(item,index) in eventList" :key="index" :value="item.id">{{
                        item.displayName
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="1" :sm="24">
                <a-button type="link" shape="round" icon="filter">过滤</a-button>
              </a-col>
            </a-row>
          </div>
          <a-row :gutter="24">
            <a-col :md="8" :sm="8">
              <a-button type="link" icon="plus">指标</a-button>
            </a-col>
          </a-row>
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c;font-size: small">筛选条件</span>
          </a-divider>
          <a-row :gutter="24">
            <a-col :md="4" :sm="12">
              <a-form-item>
                <a-select v-model="analysisParam.filterList.id" allow-clear placeholder="请选择" default-value="0">
                  <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <a-form-item label="">
                <a-select v-model="analysisParam.dimensionList.id" allow-clear placeholder="请选择">
                  <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="">
                <a-range-picker :style="{width: '350px'}" showTime/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="8" :sm="8">
              <a-button type="link" icon="plus">添加</a-button>
            </a-col>
          </a-row>
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c ;font-size: small">按*分组</span>
          </a-divider>
          <a-row :gutter="24">
            <a-col :md="4" :sm="12">
              <a-form-item>
                <a-select v-model="analysisParam.dimensionList.id" allow-clear placeholder="请选择" default-value="0">
                  <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="1" :sm="12">
              <a-form-item>
                <a-button type="link" shape="round" icon="setting"></a-button>
              </a-form-item>
            </a-col>
            <a-col :md="1" :sm="12">
              <a-form-item>
                <a-button type="link" icon="plus">添加</a-button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c;font-size: small">按*查看</span>
          </a-divider>
          <a-row :gutter="24">
            <a-col :md="4" :sm="24">
              <a-form-item label="">
                <a-select v-model="analysisParam.dimensionList.id" allow-clear placeholder="请选择">
                  <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <a-form-item label="">
                <a-select v-model="analysisParam.dimensionList.id" allow-clear placeholder="请选择">
                  <a-select-option v-for="(item,index) in propertyList" :key="index" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="">
                <a-range-picker :style="{width: '350px'}" showTime/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="queryAnalysisData">查询</a-button>
                <a-button style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-row>
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :bordered="false" title=""
                :style="{ height: '100%' }">
          <div slot="extra" style="height: inherit;">
            <!-- style="bottom: 12px;display: inline-block;" -->
            <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link"></a-icon>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">操作一</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">操作二</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
          </div>
          <div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {boardDataSourceDelete, boardDataSourceExport} from '@/api/modular/board/boardDataSourceManage'
import {boardEventList} from '@/api/modular/board/boardEventManage'
import {boardPropertyList} from '@/api/modular/board/boardPropertyManage'
import {boardAnalysisAnalysisById} from '@/api/modular/board/boardAnalysisManage'


export default {
  components: {},
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      analysisParam: {
        id: '1',
        displayName: '',
        type: '',
        chartConfig: '',
        subLogic: '',
        sort: '',
        eventList: [],
        propertyList: [],
        dimensionList: [],
        filterList: [],
      },
      tstyle: {'padding-bottom': '0px', 'margin-bottom': '10px'},
      eventList: [],
      propertyList: [],
      analysisData: {
        dataSource: [],
        fields: []
      },
    }
  },
  created() {
    this.loadDropDownData()
  },
  methods: {
    loadDropDownData() {
      boardPropertyList().then(res => {
        this.propertyList = res.data
        this.propertyList.unshift({id: "COUNT", displayName: "总次数"})
      })
      boardEventList().then(res => {
        this.eventList = res.data
        this.analysisParam.eventList[0] = {
          eventId: this.eventList[0].id
        }
      })
    },

    getAnalysisEventDisplayName(e) {
      var analysisName = e.displayName;
      if (!analysisName) {
        var event = this.eventList.filter(i => i.id == e.eventId)[0]
        analysisName = event.displayName + " 的 "
        var analysisProperty = this.getAnalysisEventProperty(e.eventId);
        if (analysisProperty) {
          e.property = analysisProperty
          var propertyName = analysisProperty.displayName;
          if (!propertyName && analysisProperty.property) {
            propertyName = analysisProperty.property.displayName
            if (analysisProperty.property.id != "COUNT") {
              propertyName += "总次数"
            }
          }
          analysisName += propertyName
        }
      }
      return analysisName
    },
    getAnalysisEventProperty(e) {
      var analysisProperty = this.analysisParam.propertyList.filter(i => i.analysisEventId === e)[0]
      if (!analysisProperty) {
        analysisProperty = {}
        analysisProperty.property = {id: "COUNT", displayName: "总次数", measure: "COUNT"}
      } else {
        analysisProperty.property = this.propertyList.filter(i => i.id === e.propertyId)[0]
      }
      return analysisProperty
    },
    queryAnalysisData() {
      boardAnalysisAnalysisById(this.analysisParam).then(res => {
        this.analysisData.dataSource = res.data.resultData.rows;
        this.analysisData.fields = res.data.resultData.fields;
      })
    },
    typeFilter(t) {
      const values = this.dataSourceTypeDictTypeDropDown.filter(item => item.code === t)
      if (values.length > 0) {
        return values[0].name
      }
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{'id': record.id}]
      this.boardDataSourceDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map((d) => {
        return {'id': d}
      })
      this.boardDataSourceDelete(paramIds)
    },
    boardDataSourceDelete(record) {
      boardDataSourceDelete(record).then((res) => {
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
      boardDataSourceExport(paramIds).then((res) => {
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

.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.table-page-search-wrapper .ant-form-inline .ant-form-item {
  margin-bottom: 5px;
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);

  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, .45);
    cursor: pointer;
    transition: color .32s;
    color: black;
  }
}
</style>
