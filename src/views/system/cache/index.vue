<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="24">
      <a-card :bordered="false" :loading="treeLoading">
        <div v-if="this.cacheKeyTree!='' ">
          <a-tree
            style="scroll:true"
            :treeData="cacheKeyTree"
            v-if="cacheKeyTree.length"
            :show-line="true"
            :show-icon="true"
            @select="handleClick"
            :style="{overflow:'hidden',overflowX:'scroll'}"/>
        </div>
        <div v-else>
          <a-empty :image="simpleImage"/>
        </div>
      </a-card>
    </a-col>

    <a-col :md="16" :sm="24">
      <x-card>
        <div slot="content">
          <a-form>
            <a-form-item
              label="缓存名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input placeholder="" v-model="cacheModel.key"/>
            </a-form-item>

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="过期时间"
            >
              <a-input-number placeholder="" style="width: 100%" v-model="cacheModel.time" />
            </a-form-item>

            <a-form-item
              label="时间类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >

              <a-select v-model="cacheModel.timeUnit" placeholder="" >
                <a-select-option v-for="(item,index) in timeUnitDict" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              label="缓存值"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-textarea :rows="10" placeholder="请输入备注" v-model="cacheModel.value"></a-textarea>
            </a-form-item>

            <a-form-item
              label=" "
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-button type="primary" @click="saveCache">保存</a-button>
              <a-button type="primary" @click="deleteCache">删除</a-button>
              <a-button type="primary" style="margin-left: 8px" @click="() => cacheModel = {}">新增</a-button>
            </a-form-item>
          </a-form>
        </div>
      </x-card>
    </a-col>
  </a-row>
</template>
<script>
import { XCard, XDown } from '@/components'
import { sysCacheTree, sysCacheValue, sysCacheAdd, sysCacheDelete } from '@/api/modular/system/cacheManage'
import { Empty } from 'ant-design-vue'
import moment from 'moment'

export default {
  components: {
    XDown,
    XCard
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      // 查询参数
      queryParam: {},
      cacheModel: {},
      cacheKeyTree: [],
      treeLoading: true,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      selectKeyStr: '',
      timeUnitDict: []
    }
  },
  created() {
    this.getCacheTree()
    this.timeUnitDict = this.$options.filters['dictData']('cache_time_unit')
  },
  methods: {
    moment,
    /**
     * 获取到机构树，展开顶级下树节点，考虑到后期数据量变大，不建议全部展开
     */
    getCacheTree() {
      sysCacheTree(Object.assign(this.queryParam)).then(res => {
        this.treeLoading = false
        if (!res.success) {
          return
        }
        this.cacheKeyTree = res.data
        this.queryParam.parentId = this.cacheKeyTree[0].id
        // 全部展开，上面api方法提供的不生效，先用此方法
        for (var item of res.data) {
          // eslint-disable-next-line eqeqeq
          if (item.parentId == 0) {
            // this.defaultExpandedKeys.push(item.id)
          }
        }
      })
    },
    handleClick(e) {
      if (e.toString() !== '') {
        this.queryParam = {
          key: e.toString()
        }
      }
      sysCacheValue(this.queryParam).then(res => {
        this.cacheModel = res.data
      })
    },
    saveCache() {
      sysCacheAdd(this.cacheModel).then(res => {
        if (res.success) {
          this.$message.success('保存成功')
          this.queryParam = {}
          this.cacheKeyTree = []
          this.getCacheTree()
        } else {
          this.$message.success('保存失败')
        }
      })
    },
    deleteCache() {
      sysCacheDelete(this.cacheModel).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
          this.queryParam = {}
          this.cacheKeyTree = []
          this.getCacheTree()
        } else {
          this.$message.success('删除失败')
        }
      })
    }
  }
}
</script>
<style lang="less">
.table-operator {
  margin-bottom: 18px;
}
</style>
