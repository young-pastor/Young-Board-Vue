<template>
  <a-modal
    title="编辑元事件"
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
          label="事件分组"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件分组" v-decorator="['eventGroupId', {rules: [{required: true, message: '请输入事件分组！'}]}]" />
        </a-form-item>
        <a-form-item
          label="事件名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件名称" v-decorator="['displayName', {rules: [{required: true, message: '请输入事件名称！'}]}]" />
        </a-form-item>
        <a-form-item
          label="表字段ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入表字段ID" v-decorator="['tableColumnId', {rules: [{required: true, message: '请输入表字段ID！'}]}]" />
        </a-form-item>
        <a-form-item
          label="计算方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入计算方式" v-decorator="['measure', {rules: [{required: true, message: '请输入计算方式！'}]}]" />
        </a-form-item>
        <a-form-item
          label="事件值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件值" v-decorator="['value', {rules: [{required: true, message: '请输入事件值！'}]}]" />
        </a-form-item>
        <a-form-item
          label="事件值类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件值类型" v-decorator="['valueType', {rules: [{required: true, message: '请输入事件值类型！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { boardEventEdit } from '@/api/modular/board/boardEvent/boardEventManage'
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
              eventGroupId: record.eventGroupId,
              displayName: record.displayName,
              tableColumnId: record.tableColumnId,
              measure: record.measure,
              value: record.value,
              valueType: record.valueType
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
            boardEventEdit(values).then((res) => {
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
