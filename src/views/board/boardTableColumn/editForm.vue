<template>
  <a-modal
    title="编辑数据字段配置"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['id']" /></a-form-item>
        <a-form-item
          label="数据表ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入数据表ID" v-decorator="['tableId', {rules: [{required: true, message: '请输入数据表ID！'}]}]" />
        </a-form-item>
        <a-form-item
          label="字段名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入字段名称" v-decorator="['columnName', {rules: [{required: true, message: '请输入字段名称！'}]}]" />
        </a-form-item>
        <a-form-item
          label="展示名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入展示名称" v-decorator="['displayName', {rules: [{required: true, message: '请输入展示名称！'}]}]" />
        </a-form-item>
        <a-form-item
          label="刷新方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入刷新方式" v-decorator="['refreshType', {rules: [{required: true, message: '请输入刷新方式！'}]}]" />
        </a-form-item>
        <a-form-item
          label="字段类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入字段类型" v-decorator="['columnType', {rules: [{required: true, message: '请输入字段类型！'}]}]" />
        </a-form-item>
        <a-form-item
          label="数据类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入数据类型" v-decorator="['dataType', {rules: [{required: true, message: '请输入数据类型！'}]}]" />
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入备注" v-decorator="['remark', {rules: [{required: true, message: '请输入备注！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { boardTableColumnEdit } from '@/api/modular/board/boardTableColumn/boardTableColumnManage'
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
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              id: record.id,
              tableId: record.tableId,
              columnName: record.columnName,
              displayName: record.displayName,
              refreshType: record.refreshType,
              columnType: record.columnType,
              dataType: record.dataType,
              remark: record.remark
            }
          )
        }, 100)
      },
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
            boardTableColumnEdit(values).then((res) => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('编辑失败')//  + res.message
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
