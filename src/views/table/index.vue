<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="身份证号"
                type="title"
                v-model="listQuery.id"
                @change="handleFilter(listQuery)"
                style="width: 200px;"
                class="filter-item" />
      <el-input placeholder="姓名"
                style="width: 200px;"
                v-model="listQuery.name"
                @change="handleFilter(listQuery)"
                type="title"
                class="filter-item" />
      <el-button v-waves
                 class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter(listQuery)">
        搜索
      </el-button>
    </div>
    <div v-if="!searchBiom">
      <el-table v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                style="width: 100%;"
                fit
                highlight-current-row>
        <el-table-column align="center"
                         label="身份证号"
                         width="180">
          <template slot-scope="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="姓名"
                         width="95">
          <template slot-scope="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="年龄"
                         width="95">
          <template slot-scope="{ row }">
            {{ row.age }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="性别"
                         width="95">
          <template slot-scope="{ row }">
            <el-tag type=""
                    v-if="row.gender == 1">
              男
            </el-tag>
            <el-tag type="success"
                    v-if="row.gender == 0">
              女
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="婚姻状况"
                         width="95">
          <template slot-scope="{ row }">
            <el-tag type="danger"
                    v-if="row.marriage == 1">
              已婚
            </el-tag>
            <el-tag type="warning"
                    v-if="row.marriage == 0">
              未婚
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="职业"
                         width="200"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.work }}
          </template>
        </el-table-column>
        <el-table-column label="工作经验"
                         width="110"
                         align="center">
          <template slot-scope="{ row }">
            <el-tag type=""
                    v-if="row.identity == 0"
                    effect="dark">
              在校
            </el-tag>
            <el-tag type="success"
                    v-if="row.identity == 1"
                    effect="dark">
              校招
            </el-tag>
            <el-tag type="warning"
                    v-if="row.identity == 2"
                    effect="dark">
              {{ row.expect }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="毕业院校"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.education_name }}
          </template>
        </el-table-column>
        <el-table-column label="联系方式"
                         width="180"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.contact }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col"
                         label="Status"
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
        <el-table-column align="center"
                         prop="created_at"
                         label="收藏数"
                         width="150">
          <template slot-scope="{ row }">
            <i class="el-icon-star-on"
               style="color:#E6A23C;font-size:24px" />
            <span>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="270"
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
            <el-button v-if="row.disable != 1"
                       size="mini">
              禁用
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(row, $index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 搜索后 -->
    <div v-if="searchBiom">
      <el-table v-loading="listLoading"
                :data="listSearch"
                element-loading-text="Loading"
                border
                style="width: 100%;"
                fit
                highlight-current-row>
        <el-table-column align="center"
                         label="身份证号"
                         width="180">
          <template slot-scope="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="姓名"
                         width="95">
          <template slot-scope="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="年龄"
                         width="95">
          <template slot-scope="{ row }">
            {{ row.age }}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="性别"
                         width="95">
          <template slot-scope="{ row }">
            <el-tag type=""
                    v-if="row.gender == 1">
              男
            </el-tag>
            <el-tag type="success"
                    v-if="row.gender == 0">
              女
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="婚姻状况"
                         width="95">
          <template slot-scope="{ row }">
            <el-tag type="danger"
                    v-if="row.marriage == 1">
              已婚
            </el-tag>
            <el-tag type="warning"
                    v-if="row.marriage == 0">
              未婚
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="职业"
                         width="200"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.work }}
          </template>
        </el-table-column>
        <el-table-column label="工作经验"
                         width="110"
                         align="center">
          <template slot-scope="{ row }">
            <el-tag type=""
                    v-if="row.identity == 0"
                    effect="dark">
              在校
            </el-tag>
            <el-tag type="success"
                    v-if="row.identity == 1"
                    effect="dark">
              校招
            </el-tag>
            <el-tag type="warning"
                    v-if="row.identity == 2"
                    effect="dark">
              {{ row.expect }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="毕业院校"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.education_name }}
          </template>
        </el-table-column>
        <el-table-column label="联系方式"
                         width="180"
                         align="center">
          <template slot-scope="{ row }">
            {{ row.contact }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col"
                         label="Status"
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
        <el-table-column align="center"
                         prop="created_at"
                         label="收藏数"
                         width="150">
          <template slot-scope="{ row }">
            <i class="el-icon-star-on" />
            <span>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="270"
                         class-name="small-padding fixed-width">
          <template slot-scope="{ row, $index }">
            <el-button type="primary"
                       size="mini"
                       @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.disable != 0"
                       size="mini"
                       disabled
                       type="success">
              正常
            </el-button>
            <el-button v-if="row.disable != 1"
                       disabled
                       size="mini">
              禁用
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(row, $index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="temp"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left: 50px;">
        <el-form-item label="身份证号"
                      prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="temp.name"
                    prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="年龄"
                      prop="age">
          <el-input-number v-model="temp.age" />
        </el-form-item>
        <el-form-item label="性别"
                      prop="gender">
          <el-radio-group v-model="temp.gender">
            <el-radio v-for="(item, index) in genderOptions"
                      :label="index"
                      :key="index">
              {{ item }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式"
                      prop="contact">
          <el-input v-model="temp.contact"
                    prefix-icon="el-icon-phone" />
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
        <el-form-item label="毕业院校"
                      prop="education_name">
          <el-input v-model="temp.education_name" />
        </el-form-item>
        <el-form-item label="职业"
                      prop="work">
          <el-input v-model="temp.work" />
        </el-form-item>
        <el-form-item label="工作状态"
                      prop="identity">
          <el-radio-group v-model="temp.identity">
            <el-radio v-for="(item, index) in identityOptions"
                      :label="index"
                      :key="index">
              {{ item }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="婚姻"
                      prop="marriage">
          <el-radio-group v-model="temp.marriage">
            <el-radio v-for="(item, index) in marriageOptions"
                      :label="index"
                      :key="index">
              {{ item }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作经验"
                      prop="expect">
          <el-input v-model="temp.expect" />
        </el-form-item>
        <el-form-item label="收藏数"
                      prop="number">
          <el-input-number v-model="temp.number" />
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
import { getList, Modify, Remove, Search } from '@/api/table'
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
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      statusOptions: ['正常', '禁用', '删除'],
      identityOptions: ['在校', '校招', '社招'],
      genderOptions: ['女', '男'],
      marriageOptions: ['未婚', '已婚'],
      temp: {
        id: '',
        identity: '',
        expect: '',
        contact: '',
        work: '',
        name: '',
        age: '',
        gender: '',
        education_name: '',
        education: '',
        number: '',
      },
      textMap: {
        update: '编辑',
        create: '添加',
      },
      listQuery: {
        id: undefined,
        name: undefined,
      },
      searchBiom: false,
      listSearch: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      getList().then((res) => {
        this.list = res.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp () {
      this.temp = {
        id: '',
        identity: '',
        expect: '',
        contact: '',
        work: '',
        name: '',
        age: '',
        gender: '',
        education_name: '',
        education: '',
        number: '',
      }
    },
    // 搜索后的数据
    handleFilter () {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      Search(this.listQuery).then((res) => {

        this.$notify({
          title: 'Success',
          message: '搜索成功',
          type: 'success',
          duration: 2000,
        })
        this.listSearch = res.data
        this.searchBiom = true
        console.log(this.listSearch)
      })
    },
    // 获取完整数据
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj 拷贝
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑
    updateData () {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          Modify(tempData).then(() => {
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
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      // console.log(row)
      Remove(row.id).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000,
        })
      })

    },

  },
}
</script>
