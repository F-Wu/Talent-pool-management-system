<template>
  <div class="app-container">
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
             style="color:#E6A23C;font-size:20px" />
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="270"
                       class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <router-link :to="'/example/personnel/edit/' + row.id"
                       class="link-type">
            <el-button type="primary"
                       size="mini">
              查看更多
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, createArticle } from '@/api/table'
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
      // textMap: {
      //   update: '编辑',
      //   create: '添加',
      // },
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
      getList().then((res) => {
        this.list = res.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
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
