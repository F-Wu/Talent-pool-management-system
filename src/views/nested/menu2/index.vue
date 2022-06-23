<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves
                 class="filter-item"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              style="width: 100%;"
              fit
              highlight-current-row>
      <el-table-column align="center"
                       label="用户名">
        <template slot-scope="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="密码">
        <template slot-scope="{ row }">
          {{ row.password }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col"
                       label="状态"
                       width="110"
                       align="center">
        <template slot-scope="{ row }">
          <el-tag type="success"
                  v-if="row.disable == 0"
                  effect="dark">
            正常
          </el-tag>
          <el-tag type="danger"
                  v-else
                  effect="dark">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.disable != 0"
                     size="mini"
                     type="success">
            正常
          </el-button>
          <!-- <el-button v-if="row.disable != 1"
                     size="mini">
            禁用
          </el-button> -->
          <el-button v-if="row.deleted != 1"
                     size="mini"
                     type="danger"
                     @click="handleDelete(row, $index)">
            删除
          </el-button>
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
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="temp.username"
                    prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="temp.password"
                    prefix-icon="el-icon-view"
                    type="password"
                    show-password />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="temp.disable">
            <el-radio v-for="(item, index) in statusOptions"
                      :label="index"
                      :key="index">
              {{ item }}
            </el-radio>
          </el-radio-group>
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
import { admin, adminModify, adminRemove, Search, adminAdd } from '@/api/user'
import waves from '@/directive/waves'
export default {
  directives: { waves },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    },
  },
  data () {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      statusOptions: ['正常', '禁用', '删除'],
      temp: {
        username: '',
        password: '',
        disable: '',
      },
      textMap: {
        update: '编辑',
        create: '添加',
      },
      listQuery: {
        id: undefined,
        name: undefined,
      },
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // console.log(1)
      admin().then((res) => {
        this.list = res.data
        console.log(this.list)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp () {
      this.temp = {
        username: '',
        password: '',
        disable: '',
      }
    },
    // 搜索后的数据
    handleFilter () {
      Search(this.listQuery).then((res) => {
        this.$notify({
          title: 'Success',
          message: '搜索成功',
          type: 'success',
          duration: 2000,
        })
        this.list = res.data
      })
    },
    // 获取完整数据
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
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
          adminModify(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
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
    handleDelete (row, index) {
      adminRemove(row.id).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000,
        })
      })
    },
    // 添加
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          adminAdd(this.temp).then(() => {
            this.list.unshift(this.temp)
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
}
</script>
