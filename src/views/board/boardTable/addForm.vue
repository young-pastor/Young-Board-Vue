<template>
  <a-modal
    title="新增数据表"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item
              label="数据源ID"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择数据源"
                        v-decorator="['dataSourceId', {rules: [{required: true, message: '请输入数据源ID！'}]}]">
                <a-select-option v-for="(item,index) in dataSourceList" :key="index" :value="item.id">
                  {{ item.displayName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="表名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入表名称"
                       v-decorator="['tableName', {rules: [{required: true, message: '请输入表名称！'}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="展示名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入展示名称"
                       v-decorator="['displayName', {rules: [{required: true, message: '请输入展示名称！'}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="刷新方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入刷新方式"
                       v-decorator="['refreshType', {rules: [{required: true, message: '请输入刷新方式！'}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="备注"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入备注" v-decorator="['remark', {rules: [{required: true, message: '请输入备注！'}]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {boardTableAdd} from '@/api/modular/board/boardTableManage'
import {boardDataSourceList} from "@/api/modular/board/boardDataSourceManage";

export default {
  data() {
    return {
      labelCol: {
        xs: {span: 24},
        sm: {span: 5}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 15}
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      dataSourceList: []
    }
  },
  methods: {
    // 初始化方法
    add(record) {
      this.visible = true
      this.getDataSourceList()
    },
    getDataSourceList() {
      boardDataSourceList().then(res => {
        if (res.success) {
          this.dataSourceList = res.data
        }
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const {form: {validateFields}} = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof (values[key]) === 'object' && values[key] != null) {
              values[key] = JSON.stringify(values[key])
            }
          }
          boardTableAdd(values).then((res) => {
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
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
