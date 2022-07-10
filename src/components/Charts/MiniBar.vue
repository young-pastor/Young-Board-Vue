<template>
  <div :style="{'width':width==null?'auto':width+'px'}">
    <v-chart :forceFit="width==null" :height="height" :data="data" padding="0">
      <v-tooltip/>
      <v-bar position="x*y"/>
    </v-chart>
  </div>
</template>

<script>

  const sourceData = []
  const beginDay = new Date().getTime()

  for (let i = 0; i < 10; i++) {
    sourceData.push({
      x: '',
      y: Math.round(Math.random() * 10)
    })
  }

  const tooltip = [
    'x*y',
    (x, y) => ({
      name: x,
      value: y
    })
  ]

  const scale = [{
    dataKey: 'x',
    min: 2
  }, {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 30
  }]

  export default {
    name: 'MiniBar',
    props: {
      dataSource: {
        type: Array,
        default: () => []
      },
      width: {
        type: Number,
        default: null
      },
      height: {
        type: Number,
        default: 200
      }
    },
    created() {
      if (this.dataSource.length === 0) {
        this.data = sourceData
      } else {
        this.data = this.dataSource
      }
    },
    data() {
      return {
        tooltip,
        data: [],
        scale
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "chart";
</style>