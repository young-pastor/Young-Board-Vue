<template>
  <a-modal
    title="新增字段关联配置"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="数据表"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select
            style="width: 100%"
            placeholder="请选择表"
            v-decorator="['tableId', {rules: [{required: true, message: '请选择表！'}]}]"
            @change="selectTableChange">
            <a-select-option v-for="(item,index) in tableList" :key="index" :value="item.id">
              {{ item.displayName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="表字段"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select
            style="width: 100%"
            placeholder="请选择字段"
            v-decorator="['columnId', {rules: [{required: true, message: '请选择字段！'}]}]">
            <a-select-option v-for="(item,index) in tableColumnList" :key="index" :value="item.id">
              {{ item.displayName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="关联表"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select
            style="width: 100%"
            placeholder="请选择关联表"
            v-decorator="['connectTableId', {rules: [{required: true, message: '请选择关联表！'}]}]"
            @change="selectConnectTableChange">
            <a-select-option v-for="(item,index) in connectTableList" :key="index" :value="item.id">
              {{ item.displayName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="关联字段"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select
            style="width: 100%"
            placeholder="请选择关联字段"
            v-decorator="['connectColumnId', {rules: [{required: true, message: '请选择关联字段！'}]}]" >
            <a-select-option v-for="(item,index) in connectTableColumnList" :key="index" :value="item.id">
              {{ item.displayName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="关联类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select style="width: 100%" placeholder="请输入关联类型" v-decorator="['connectType', {rules: [{ required: true, message: '请输入关联类型！' }]}]" >
            <a-select-option v-for="(item,index) in connectTypeDictTypeDropDown" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { boardTableConnectAdd } from '@/api/modular/board/boardTableConnect/boardTableConnectManage'
  import { boardTableList } from '@/api/modular/board/boardTable/boardTableManage'
  import { boardTableColumnList } from '@/api/modular/board/boardTableColumn/boardTableColumnManage'
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
        tableList: [],
        columnList: [],
        tableColumnList: [],
        connectTableList: [],
        connectTableColumnList: [],
        connectTypeDictTypeDropDown: []
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.loadDropDownData()
      },
      loadDropDownData() {
        boardTableList().then(res => {
          if (res.success) {
            this.tableList = res.data
          }
        })
        boardTableColumnList().then(res => {
          if (res.success) {
            this.columnList = res.data
          }
        })
        this.connectTypeDictTypeDropDown = this.$options.filters['dictData']('board_connect_type')
      },
      selectTableChange(e) {
        this.tableColumnList = this.columnList.filter(item => item.tableId == e );

        var dsId = this.tableList.find(function(item, index) {
          return item.id === e;
        });
        dsId = dsId.dataSourceId;
        this.connectTableList = this.tableList.filter(item => item.dataSourceId == dsId && item.id != e );

      },
      selectConnectTableChange(e) {
        this.connectTableColumnList = this.columnList.filter(item => item.tableId == e  );
      },
      /**
       * 提交表单
       */
      handleSubmit() {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            for (const key in values) {
              if (typeof (values[key]) === 'object' && values[key] != null) {
                values[key] = JSON.stringify(values[key])
              }
            }
            boardTableConnectAdd(values).then((res) => {
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
