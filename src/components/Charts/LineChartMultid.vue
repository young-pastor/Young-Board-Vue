<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :onClick="handleClick">
      <v-tooltip/>
      <v-axis/>
      <v-legend/>
      <v-line position="type*y" color="x"/>
      <v-point position="type*y" color="x" :size="4" :v-style="style" :shape="'circle'"/>
    </v-chart>
  </div>
</template>

<script>
  import { DataSet } from '@antv/data-set'
  import { ChartEventMixins } from './mixins/ChartMixins'

  export default {
    name: 'LineChartMultid',
    mixins: [ChartEventMixins],
    props: {
      title: {
        type: String,
        default: ''
      },
      dataSource: {
        type: Array,
        default: () => [
          { type: 'Jan', [1]: 7.0,  [2]: 3.9  },
          { type: 'Feb', [1]: 6.9,  [2]: 4.2  },
          { type: 'Mar', [1]: 9.5,  [2]: 5.7  },
          { type: 'Apr', [1]: 14.5, [2]: 8.5  },
          { type: 'May', [1]: 18.4, [2]: 11.9 },
          { type: 'Jun', [1]: 21.5, [2]: 15.2 },
          { type: 'Jul', [1]: 25.2, [2]: 17.0 },
          { type: 'Aug', [1]: 26.5, [2]: 16.6 },
          { type: 'Sep', [1]: 23.3, [2]: 14.2 },
          { type: 'Oct', [1]: 18.3, [2]: 10.3 },
          { type: 'Nov', [1]: 13.9, [2]: 6.6  },
          { type: 'Dec', [1]: 9.6,  [2]: 4.8  }
        ]
      },
      fields: {
        type: Array,
        default: () => [[1], [2]]
      },
      // 别名，需要的格式：[{field:'name',alias:'姓名'}, {field:'sex',alias:'性别'}]
      aliases:{
        type: Array,
        default: () => []
      },
      height: {
        type: Number,
        default: 254
      }
    },
    data() {
      return {
        scale: [{
          type: 'cat',
          dataKey: 'x',
          min: 0,
          max: 1
        }],
        style: { stroke: '#fff', lineWidth: 1 }
      }
    },
    computed: {
      data() {
        const dv = new DataSet.View().source(this.dataSource)
        dv.transform({
          type: 'fold',
          fields: this.fields,
          key: 'x',
          value: 'y'
        })
        let rows =  dv.rows
        // 替换别名
        rows.forEach(row => {
          for (let item of this.aliases) {
            if (item.field === row.x) {
              row.x = item.alias
              break
            }
          }
        })
        return rows
      }
    }
  }
</script>

<style scoped>

</style>