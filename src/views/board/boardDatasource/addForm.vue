<template>
  <a-modal
    title="新增数据源配置表"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="数据源名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入数据源名称" v-decorator="['displayName', {rules: [{required: true, message: '请输入数据源名称！'}]}]" />
        </a-form-item>

        <a-form-item
          label="数据库类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select style="width: 100%" placeholder="请输入数据库类型" v-decorator="['type', {rules: [{ required: true, message: '请输入数据库类型！' }]}]" >
            <a-select-option v-for="(item,index) in dataSourceTypeDictTypeDropDown" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="数据库配置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入数据库配置" v-decorator="['config', {rules: [{required: true, message: '请输入数据库配置！'}]}]" />
        </a-form-item>

        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入备注" v-decorator="['remark']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { boardDataSourceAdd } from '@/api/modular/board/boardDatasource/boardDataSourceManage'
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
        dataSourceTypeDictTypeDropDown: []
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.sysDictTypeDropDown()
      },
      sysDictTypeDropDown () {
        this.dataSourceTypeDictTypeDropDown = this.$options.filters['dictData']('board_datasource_type')
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
            boardDataSourceAdd(values).then((res) => {
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
