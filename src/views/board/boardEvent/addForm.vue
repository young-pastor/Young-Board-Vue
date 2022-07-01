<template>
  <a-modal
    title="新增元事件"
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
          label="事件名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件名称" v-decorator="['displayName', {rules: [{required: true, message: '请输入事件名称！'}]}]" />
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="事件分组"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-tree-select
            v-decorator="['eventGroupId', {rules: [{ required: true, message: '请输入事件分组！' }]}]"
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
            :treeData="eventGroupTree"
            placeholder="请输入事件分组"
          >
            <span slot="title" slot-scope="{ id }">{{ id }}
            </span>
          </a-tree-select>
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="数据库"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select show-search style="width: 100%" placeholder="请选择数据库" v-decorator="['dataBaseId', {rules: [{ required: true, message: '请选择数据库！' }]}]" >
            <a-select-option v-for="dataBaseItem in columnDropDown" :key="dataBaseItem.title" :value="dataBaseItem.id" >{{ dataBaseItem.title }}</a-select-option>
          </a-select>
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="数据表"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select show-search style="width: 100%" placeholder="请选择数据表" v-decorator="['tableId', {rules: [{ required: true, message: '请选择数据表！' }]}]" >
            <a-select-option v-for="tableItem in columnDropDown" :key="tableItem.title" :value="tableItem.id" >{{ tableItem.title }}</a-select-option>
          </a-select>
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="表字段"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
<!--          <a-tree-select-->
<!--            v-decorator="['tableColumnId', {rules: [{ required: true, message: '请选择表字段！' }]}]"-->
<!--            style="width: 100%"-->
<!--            :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"-->
<!--            :treeData="columnDropDown"-->
<!--            placeholder="请选择表字段"-->
<!--          >-->
<!--            <span slot="title" slot-scope="{ id }">{{ id }}-->
<!--            </span>-->
<!--          </a-tree-select>-->

          <a-select show-search style="width: 100%" placeholder="请选择表字段" v-decorator="['tableColumnId', {rules: [{ required: true, message: '请选择表字段！' }]}]" >
            <a-select-opt-group v-for="dataBaseItem in columnDropDown" :key="dataBaseItem.title" :label="dataBaseItem.title" >
              <a-select-opt-group v-for="tableItem in dataBaseItem.children" :key="tableItem.title" :label="tableItem.title" >
              <a-select-option v-for="columnItem in tableItem.children" :key="columnItem.title" :value="columnItem.id" >{{ columnItem.title }}</a-select-option>
            </a-select-opt-group>
            </a-select-opt-group>
          </a-select>
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="计算方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入计算方式" v-decorator="['measure', {rules: [{required: true, message: '请输入计算方式！'}]}]" />
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="事件值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件值" v-decorator="['value', {rules: [{required: true, message: '请输入事件值！'}]}]" />
        </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
        <a-form-item
          label="事件值类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入事件值类型" v-decorator="['valueType', {rules: [{required: true, message: '请输入事件值类型！'}]}]" />
        </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { boardEventAdd } from '@/api/modular/board/boardEventManage'
  import { boardEventGroupTree } from '@/api/modular/board/boardEventGroupManage'
  import { boardTableColumnTree } from '@/api/modular/board/boardTableColumnManage'
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
        eventGroupTree: [],
        dataSourceDropDown: [],
        tableDropDown: [],
        columnDropDown: []
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.loadDropDownData()
      },
      loadDropDownData() {
        boardEventGroupTree().then(res => {
          this.treeLoading = false
          if (!res.success) {
            return
          }
          this.eventGroupTree = [{
            'id': '-1',
            'parentId': '0',
            'title': '顶级',
            'value': '0',
            'pid': '0',
            'children': res.data
          }]
        })
        boardTableColumnTree().then(res => {
          if (!res.success) {
            return
          }
          this.columnDropDown = res.data
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
            boardEventAdd(values).then((res) => {
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
