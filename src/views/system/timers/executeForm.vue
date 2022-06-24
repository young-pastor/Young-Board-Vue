<template>
  <a-modal
    title="执行定时任务"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="formLoading">
      <a-form :form="form">

        <a-form-item
          style="display: none;"
        >
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item
          style="display: none;"
        >
          <a-input v-decorator="['jobStatus']" />
        </a-form-item>

        <a-form-item
          label="任务名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入任务名称" v-decorator="['timerName', {rules: [{required: true, message: '请输入任务名称！'}]}]" />
        </a-form-item>

        <a-form-item
          label="任务class类名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select style="width: 100%" placeholder="请选择任务class类名" v-decorator="['actionClass', {rules: [{ required: true, message: '请选择任务class类名！' }]}]" >
            <a-select-option v-for="(item,index) in actionClassData" :key="index" :value="item" >{{ item }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务表达式"
        >
          <a-input placeholder="请输入任务表达式" v-decorator="['cron', {rules: [{required: true, message: '请输入任务表达式！'}]}]" />
        </a-form-item>

        <a-form-item
          label="参数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-textarea :rows="6" placeholder="请输入参数" v-decorator="['param']"></a-textarea>
        </a-form-item>

        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-textarea :rows="2" placeholder="请输入备注" v-decorator="['remark']"></a-textarea>
        </a-form-item>

      </a-form>

    </a-spin>
  </a-modal>
</template>

<script>
  import { sysTimersExecute, sysTimersGetActionClasses } from '@/api/modular/system/timersManage'

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
        actionClassData: [],
        formLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      execute (record) {
        this.visible = true
        this.formLoading = true
        this.getActionClass()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              id: record.id,
              timerName: record.timerName,
              actionClass: record.actionClass,
              cron: record.cron,
              jobStatus: record.jobStatus,
              param: record.param,
              remark: record.remark
            }
          )
        }, 100)
      },

      /**
       * 获取选择器下拉框数据
       */
      getActionClass () {
        sysTimersGetActionClasses().then((res) => {
          this.formLoading = false
          if (res.success) {
            this.actionClassData = res.data
          } else {
            this.$message.error('获取选择器下拉框数据')
          }
        })
      },

      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            sysTimersExecute(values).then((res) => {
              if (res.success) {
                this.$message.success('执行成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
                this.form.resetFields()
              } else {
                this.$message.error('执行失败：' + res.message)
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
