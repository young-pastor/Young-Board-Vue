<template>
  <a-modal
    title="新增分组"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="分组名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入分组名称" v-decorator="['displayName', {rules: [{required: true, message: '请输入分组名称！'}]}]"/>
        </a-form-item>

        <a-form-item
          label="上级分组"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-tree-select
            v-decorator="['pid', {rules: [{ required: true, message: '请选择上级分组！' }]}]"
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
            :treeData="eventGroupTree"
            placeholder="请选择上级分组"
            treeDefaultExpandAll
          >
            <span slot="title" slot-scope="{ id }">{{ id }}
            </span>
          </a-tree-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { boardEventGroupAdd, boardEventGroupTree } from '@/api/modular/board/boardEventGroupManage'

export default {
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
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      eventGroupTree: []
    }
  },
  methods: {
    // 初始化方法
    add(record) {
      this.loadEventGroupTree()
      this.visible = true
    },

    loadEventGroupTree() {
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
          boardEventGroupAdd(values).then((res) => {
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
