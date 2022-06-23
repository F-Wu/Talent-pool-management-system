<template>
  <div class="app-container">
    <el-table :data="category"
              highlight-current-row
              style="width: 100%; margin-bottom: 20px;"
              row-key="id"
              border
              lazy>
      <el-table-column prop="id"
                       label="ID"
                       sortable
                       width="180" />
      <el-table-column prop="create_date"
                       label="日期"
                       sortable
                       width="180" />
      <el-table-column prop="name"
                       label="行业"
                       sortable />
      <el-table-column label="操作"
                       width="300"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-lx-add"
                     v-show="scope.row.pid == '0' || scope.row.pid == '1'"
                     @click="handleAdd(scope.$index, scope.row)">添加子区域</el-button>
          <el-button type="text"
                     icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     icon="el-icon-delete"
                     class="red"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="temp"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left: 50px;">
        <el-form-item label="行业类型"
                      prop="pid">
          <!-- <el-input v-model="temp.pid" /> -->
          <el-select v-model="temp.pid"
                     placeholder="Select">
            <el-option v-for="item in categorylist"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
                       :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业名称"
                      prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus === 'create' ? createData() : updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GEToccupation, occupationModify, occupationRemove, occupationAdd, occupation } from '@/api/occupation'

export default {
  data () {
    return {
      category: [],
      categorylist: [],
      textMap: {
        update: '编辑',
        create: '添加',
      },
      temp: {
        id: '',
        name: '',
        pid: '',
        type: '',
        disable: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
    }
  },
  mounted () { },
  methods: {
    resetTemp () {
      this.temp = {
        id: '',
        name: '',
        pid: '',
        type: '',
        disable: '',
      }
    },
    Getlist () {
      occupation().then((res) => {
        this.categorylist = res.first
      })
    },
    GETdata () {
      GEToccupation().then((res) => {
        this.category = res.data
      })
    },
    // 获取完整数据
    handleEdit (index, row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          occupationModify(tempData).then(() => {
            const index = this.category.findIndex((v) => v.id === this.temp.id)
            this.GETdata(),
              this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000,
            })
          })
        }
      })
    },
    // 删除
    handleDelete (index, row) {
      occupationRemove(row.id).then(() => {
        this.GETdata(),
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          })
      })
    },
    // 添加
    handleAdd (row, index) {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp.pid = index.id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          occupationAdd(this.temp).then(() => {
            // this.category.unshift(this.temp)
            this.GETdata(),
              this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000,
            })
          })
        }
      })
    },
  },
  created () {
    this.GETdata(),
      this.Getlist()
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-table__row--level-0 {
  background-color: aqua !important;
}
</style>
