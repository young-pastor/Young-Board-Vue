<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <div v-for="(analysisEvent,i1) in analysisParam.eventList">
            <a-row :gutter="24" style="margin-top: 10px">
              <a-col :md="1" :sm="12">
                <a-form-item label="">
                  <a-button type="primary" shape="circle" size="small" disabled>
                    {{ String.fromCharCode(i1 + 65) }}
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
                <a-button type="link" shape="round" icon="copy" @click="() => analysisParam.eventList.push(analysisEvent)">复制</a-button>
              </a-col>
              <a-col :md="1" :sm="24" v-if="analysisParam.eventList.length>1">
                <a-button type="link" shape="round" icon="delete" @click="() => analysisParam.eventList.splice(i1,1)">删除</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :offset="1" :md="4" :sm="20">
                <a-form-item>
                  <a-select v-model="analysisEvent.eventId" allow-clear placeholder="请选择事件" >
                    <a-select-option v-for="(event,i2) in eventAllList" :value="event.id" >{{event.displayName}}</a-select-option>
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
                  <a-select v-model="analysisEvent.property.propertyId" allow-clear placeholder="请选择">
                    <a-select-option v-for="(item,i3) in eventPropertyAllList"
                                     :value="item.id">
                      {{ item.displayName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="2" :sm="24" v-if="checkEventPropertyMeasureShow(analysisEvent.property.propertyId)">
                <a-form-item label="">
                  <a-select v-model="analysisEvent.property.measure" allow-clear placeholder="请选择">
                    <a-select-option v-for="(item,i4) in measureTypeDictTypeDropDown"  :value="item.code" v-if="checkFilterMeasureShow(analysisEvent.property.propertyId,item.code)">{{
                        item.name
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
              <a-button type="link" icon="plus" @click="() => analysisParam.eventList.push({property: {}})">指标</a-button>
            </a-col>
          </a-row>
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c;font-size: small">筛选条件</span>
          </a-divider>
          <a-row :gutter="24" v-for="(aFilter,i5) in analysisParam.filterList" :key="i5">
            <a-col :md="4" :sm="12">
              <a-form-item>
                <a-select v-model="aFilter.propertyId" allow-clear placeholder="请选择" default-value="0">
                  <a-select-option v-for="(item,i6) in filterPropertyAllList" :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24" v-if="checkFilterMeasureShow(aFilter.propertyId)">
              <a-form-item label="">
                <a-select v-model="aFilter.measure" allow-clear placeholder="请选择">
                  <a-select-option v-for="(item,i7) in filterTypeDictTypeDropDown" :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12" v-if="checkFilterParamShow(aFilter.propertyId,aFilter.measure,'INPUT')">
              <a-form-item label="" >
                <a-input v-model="aFilter.value" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12" v-if="checkFilterParamShow(aFilter.propertyId,aFilter.measure,'RANGE')">
              <a-form-item label="" >
                <a-range-picker :style="{width: '350px'}" showTime v-model="aFilter.value"/>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="12" >
              <a-form-item>
                <a-button type="link" icon="delete" @click="() => analysisParam.filterList.splice(i7,1)">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="8" :sm="8">
              <a-button type="link" icon="plus" @click="() => analysisParam.filterList.push({})">添加</a-button>
            </a-col>
          </a-row>
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c ;font-size: small">按*分组</span>
          </a-divider>
          <a-row :gutter="24" v-for="(aDimension,i8) in analysisParam.dimensionList">
            <a-col :md="4" :sm="12">
              <a-form-item>
                <a-select v-model="aDimension.propertyId" allow-clear placeholder="请选择" default-value="0">
                  <a-select-option v-for="(item,i9) in groupPropertyAllList"  :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="1" :sm="12" v-if="checkGroupDimensionUnitShow(aDimension.propertyId)">
              <a-form-item>
                <a-button type="link" shape="round" icon="setting"></a-button>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="12" v-if="analysisParam.dimensionList.length>1">
              <a-form-item>
                <a-button type="link" icon="delete" @click="() => analysisParam.dimensionList.splice(i8,1)">删除</a-button>
              </a-form-item>
            </a-col>
            <a-col :md="1" :sm="12" v-if="i8==analysisParam.dimensionList.length-1">
              <a-form-item>
                <a-button type="link" icon="plus" @click="() => analysisParam.dimensionList.push({})" >添加</a-button>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 展示属性 -->
          <a-divider orientation="left" plain style="margin: 0px;margin-bottom: 5px">
            <span style="color: #8c8c8c;font-size: small">按*查看</span>
          </a-divider>
          <a-row :gutter="24" >
            <a-col :md="4" :sm="24">
              <a-form-item label="">
                <a-select v-model="analysisParam.displayDimension.propertyId" allow-clear placeholder="请选择">
                  <a-select-option v-for="(item,i10) in groupPropertyAllList"   :value="item.id">
                    {{ item.displayName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <a-form-item label="">
                <a-select
                  v-model="analysisParam.displayDimension.measure"
                  allow-clear
                  placeholder="请选择"
                  v-if="checkDisplayDimensionMeasureShow(analysisParam.displayDimension.propertyId)">
                  <a-select-option
                    v-for="(item,i11) in filterTypeDictTypeDropDown"
                    :value="item.code"
                    v-if="checkDisplayDimensionMeasureShow(analysisParam.displayDimension.propertyId,item.code)">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="" v-if="analysisParam.displayDimension.measure == 'RANGE'">
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
        <a-card
          class="antd-pro-pages-dashboard-analysis-salesCard"
          :bordered="false"
          :style="{ height: '100%' }">
          <div slot="extra" style="height: inherit;">
            <!-- style="bottom: 12px;display: inline-block;" -->
            <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link"></a-icon>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">折线图</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">柱状图</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
          </div>
          <div>
            <div id="analysis_chart" style="height: 300px;width: 100%"></div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {boardEventAnalysisList} from '@/api/modular/board/boardEventManage'
import {boardPropertyAnalysisList} from '@/api/modular/board/boardPropertyManage'
import {boardAnalysisAnalysis, boardAnalysisAnalysisById} from '@/api/modular/board/boardAnalysisManage'

export default {
  components: {},
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      analysisParam: {
        id: 1,
        type: 'EVENT',
        subLogic: 'AND',
        eventList: [{eventId:null,property: {propertyId:null}}],
        propertyList: [],
        dimensionList: [{propertyId: 0 }],
        filterList: [],
        displayDimension:{
          propertyId:null,
          type:'ROW'
        },
      },
      tstyle: {'padding-bottom': '0px', 'margin-bottom': '10px'},
      eventAllList: [],
      eventPropertyAllList: [],
      filterPropertyAllList: [],
      groupPropertyAllList: [],
      filterTypeDictTypeDropDown: [],
      measureTypeDictTypeDropDown: [],
      analysisData: {
        legend: [],
        xAxis:  [],
        series: [],
      },
      filterMeasure:{
        'NUMBER' : ['IS_NULL','NOT_NULL','IS_EMPTY','NOT_EMPTY','EQUAL','NOT_EQUAL','LESS_THAN','LESS_THAN_EQUAL','GREATER_THAN','GREATER_THAN_EQUAL','RANGE','IN','NOT_IN',],
        'STRING' : ['IS_NULL','NOT_NULL','IS_EMPTY','NOT_EMPTY','IS_TRUE','IS_FALSE','EQUAL','NOT_EQUAL','IN','NOT_IN','LIKE','LEFT_LIKE','RIGHT_LIKE','NOT_LIKE','MATCH_CASE','MATCH_IGNORE_CASE','NOT_MATCH_CASE','NOT_MATCH_IGNORE_CASE'],
        'BOOLEAN' : ['IS_NULL','NOT_NULL', 'IS_EMPTY', 'NOT_EMPTY', 'IS_TRUE','IS_FALSE'],
        'DATE_TIME' : ['IS_NULL','NOT_NULL','IS_EMPTY','NOT_EMPTY','EQUAL','NOT_EQUAL','LESS_THAN','LESS_THAN_EQUAL','GREATER_THAN','GREATER_THAN_EQUAL','RANGE','IN','NOT_IN','LEAST_SEVEN_DAY','LEAST_FOURTEEN_DAY','LEAST_ONE_MONTH','LEAST_FOUR_MONTH','LEAST_HAFT_YEAR','LEAST_YEAR',]
      },
      filterParam: {
        'INPUT': ['EQUAL','NOT_EQUAL','LESS_THAN','LESS_THAN_EQUAL','GREATER_THAN','GREATER_THAN_EQUAL','RANGE','IN','NOT_IN']
      },
      indicatorMeasure:{
        'NUMBER' : ['COUNT','DISTINCT','SUM','AVG','MAX','MIN'],
        'STRING' : ['COUNT','DISTINCT'],
        'BOOLEAN' : ['COUNT','DISTINCT'],
        'DATE_TIME' : ['COUNT','DISTINCT','MAX','MIN']
      },
      analysisChartInstance:null
    }
  },
  created() {
    this.loadDropDownData()
  },
  methods: {
    drawChart() {
      if(!this.analysisChartInstance){
        this.analysisChartInstance = this.$echarts.init(document.getElementById("analysis_chart"));
        window.addEventListener('resize', function () {
          this.analysisChartInstance.resize()
        })
      }
      // 基于准备好的dom，初始化echarts实例
      // 指定图表的配置项和数据
      let option = {
        title: { text: ''},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.analysisData.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.analysisData.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: this.analysisData.series
      };
      // 使用刚指定的配置项和数据显示图表。
      this.analysisChartInstance.setOption(option);
    },
    loadDropDownData() {
      this.filterTypeDictTypeDropDown = this.$options.filters['dictData']('board_column_filter_type')
      this.measureTypeDictTypeDropDown = this.$options.filters['dictData']('board_column_measure_type')

      boardPropertyAnalysisList().then(res => {
        this.eventPropertyAllList = this.eventPropertyAllList.concat(res.data)
        this.eventPropertyAllList.unshift({id: "0", displayName: "总次数"})
        this.analysisParam.eventList[0].property.propertyId = this.eventPropertyAllList[0].id
        this.filterPropertyAllList = res.data
        this.groupPropertyAllList = this.groupPropertyAllList.concat(res.data)
        this.groupPropertyAllList.unshift({id: "0", displayName: "总体"})
        this.analysisParam.dimensionList[0].propertyId = this.groupPropertyAllList[0].id
        this.analysisParam.displayDimension.propertyId = this.groupPropertyAllList[0].id
      })
      boardEventAnalysisList().then(res => {
        this.eventAllList = res.data
        this.analysisParam.eventList[0].eventId = this.eventAllList[0].id
      })
    },
    getAnalysisEventDisplayName(e) {
      var analysisName = e.displayName;
      if (!analysisName) {
        var event = this.eventAllList.filter(i => i.id == e.eventId)[0]
        if(!event){
          return analysisName;
        }
        analysisName = event.displayName + " 的 "
        var analysisProperty = this.eventPropertyAllList.filter(i => i.id === e.property.propertyId)[0]
        if (analysisProperty) {
          analysisName += analysisProperty.displayName
          if(analysisProperty.column){
            let measureDict = this.measureTypeDictTypeDropDown.filter(i => i.code === e.property.measure)[0]
            if(measureDict){
              analysisName += measureDict.name
            }
          }
        }else {
          analysisName += "总次数"
        }
      }
      return analysisName
    },
    queryAnalysisData() {
      var that = this;
      var analysis_param = {
          type: that.analysisParam.type,
          subLogic: that.analysisParam.subLogic,
          eventList: [].concat(that.analysisParam.eventList),
          propertyList: [].concat(that.analysisParam.propertyList),
          dimensionList: [].concat(that.analysisParam.dimensionList).concat(that.analysisParam.displayDimension),
          filterList: [].concat(that.analysisParam.filterList),
      }
      boardAnalysisAnalysis(analysis_param).then(res => {
        that.analysisData.xAxis = []
        that.analysisData.legend = []
        that.analysisData.series = []
        that.analysisData.xAxis = res.data.resultData.displayRow;
        var index = 0;
        res.data.resultData.groupRow.forEach(function (d){
          var dStr = JSON.stringify(d)
          that.analysisData.legend.push(dStr);
          that.analysisData.series.push({
            name: dStr,
            type: 'line',
            stack: 'Total',
            data: res.data.resultData.valueCol[index]
          })
          index++;
        })
        this.drawChart();
      })
    },
    checkGroupDimensionUnitShow(pId){
      let property = this.groupPropertyAllList.filter(i => i.id === pId)[0]
      if(!property || !property.column){
        return false;
      }
      if (property.column.columnType == 'NUMBER'){
        return true;
      }
      return false;
    },
    checkFilterParamShow(pId,measure,type){
      let property = this.filterPropertyAllList.filter(i => i.id === pId)[0]
      if(!property || !property.column){
        return false;
      }
      if(measure && this.filterParam[type]){
        return this.filterParam[type].includes(measure)
      }
      return false;
    },
    checkEventPropertyMeasureShow(pId,measureCode){
      let property = this.eventPropertyAllList.filter(i => i.id === pId)[0]
      if(!property || !property.column){
        return false;
      }
      if(measureCode){
        return this.indicatorMeasure[property.column.columnType].includes(measureCode)
      }
      return true;
    },
    checkFilterMeasureShow(pId,measureCode){
      let property = this.filterPropertyAllList.filter(i => i.id === pId)[0]
      if(!property || !property.column){
        return false;
      }
      if(measureCode){
        return this.indicatorMeasure[property.column.columnType].includes(measureCode)
      }
      return true;
    },
    checkDisplayDimensionMeasureShow(pId,measureCode){
      let property = this.groupPropertyAllList.filter(i => i.id === pId)[0]
      if(!property || !property.column){
        return false;
      }
      if(measureCode){
        return this.filterMeasure[property.column.columnType].includes(measureCode)
      }
      return true;
    },
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
