<template>
  <a-modal
    title="同步数据表"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="数据源"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select style="width: 100%" placeholder="请选择数据源" v-decorator="['dataSourceId']" >
            <a-select-option v-for="(item,index) in dataSourceList" :key="index" :value="item.id" >{{ item.displayName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {boardTableSync} from '@/api/modular/board/boardTable/boardTableManage'
import {boardDataSourceList} from '@/api/modular/board/boardDatasource/boardDataSourceManage'

export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        },
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        dataSourceList: []
      }
    },
    methods: {
      // 初始化方法
      sync (record) {
        this.visible = true
        this.getDataSourceList()
      },
      getDataSourceList() {
        boardDataSourceList().then(res => {
          if (res.success){
            this.dataSourceList =res.data
          }
        })
      },
      /**
       * 提交表单
       */
      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            for (const key in values) {
              if (typeof (values[key]) === 'object' && values[key] != null) {
                values[key] = JSON.stringify(values[key])
              }
            }
            boardTableSync([values]).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败')// + res.message
              }
            }).finally((res) => {
              this.confirmLoading = false
            })
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
