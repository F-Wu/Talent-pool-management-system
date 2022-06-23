<template>
  <div class="createPost-container">
    <el-form ref="postForm"
             :model="{postForm}"
             class="form-container">
      <sticky :z-index="10"
              :class-name="'sub-navbar ' + Status.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" /> -->

        <el-button v-loading="loading"
                   type="success"
                   class="button"
                   v-if="isEdit"
                   @click="submitForm">
          保存
        </el-button>
        <el-button v-loading="loading"
                   type="success"
                   class="button"
                   v-if="!isEdit"
                   @click="addForm">
          添加
        </el-button>
      </sticky>
    </el-form>
    <!-- 基本信息 -->
    <div class="createPost-main-container">
      <el-form ref="postForm"
               :model="{postForm}"
               :rules="rules"
               class="form-container">
        <el-row>
          <header class="section-header">
            <span class="section-title-l"></span>
            <h2 class="section-title">基础信息</h2>
            <span class="section-title-r"></span>
          </header>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;"
                          prop="id">
              <MDinput v-model="postForm.id"
                       :maxlength="100"
                       name="name"
                       required>
                身份证号
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="60px"
                                label="姓名:"
                                class="postInfo-container-item">
                    <el-input v-model="postForm.name"
                              prefix-icon="el-icon-user" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="年龄"
                                prop="age">
                    <el-input-number v-model="postForm.age" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="工作经验:"
                                prop="expect"
                                label-width="80px">
                    <el-input v-model="postForm.expect"
                              prefix-icon="el-icon-suitcase-1"
                              style="width: 200px;" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="性别"
                                prop="gender">
                    <el-radio-group v-model="postForm.gender">
                      <el-radio v-for="(item, index) in genderOptions"
                                :label="index"
                                :key="index">
                        {{ item }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="80px"
                                label="联系方式:"
                                class="postInfo-container-item">
                    <el-input v-model="postForm.contact"
                              prefix-icon="el-icon-phone" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="工作状态"
                                prop="identity">
                    <el-radio-group v-model="postForm.identity">
                      <el-radio v-for="(item, index) in identityOptions"
                                :label="index"
                                :key="index">
                        {{ item }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="简历收藏:"
                                prop="number">
                    <el-input-number v-model="postForm.number" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="婚姻状况"
                                prop="gender">
                    <el-radio-group v-model="postForm.marriage">
                      <el-radio v-for="(item, index) in marriageOptions"
                                :label="index"
                                :key="index">
                        {{ item }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item style="margin-bottom: 40px;"
                                label-width="80px"
                                label="现任职业:">
                    <el-input v-model="postForm.work"
                              :rows="1"
                              type="textarea"
                              class="article-textarea"
                              autosize />
                  </el-form-item>
                  <!-- work -->
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item prop="img"
                      style="margin-bottom: 30px;"
                      label="头像">
          <Upload v-model="postForm.img"
                  @input="postFormImg" />
        </el-form-item>
        <el-row>

        </el-row>
      </el-form>
    </div>
    <!-- 学历 -->
    <div class="createPost-main-container">
      <header class="section-header">
        <span class="section-title-l"></span>
        <h2 class="section-title">学历信息</h2>
        <span class="section-title-r"></span>
      </header>
      <el-form ref="postForm"
               :model="{education}"
               :rules="rules"
               class="form-container">
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="毕业院校:"
                          prop="project_name">
              <el-input v-model="education.project_name"
                        :rows="1"
                        type="textarea"
                        class="article-textarea"
                        autosize
                        placeholder="Please enter the content" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历"
                          prop="role">
              <el-radio-group v-model="education.role">
                <el-radio v-for="item in educationOptions"
                          :label="item"
                          :key="item">
                  {{ item }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="在校时间:"
                          prop="date">
              <el-date-picker :editable="false"
                              v-model="education.data"
                              type="daterange"
                              unlink-panels
                              @change="change"
                              class="datePickers"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业:"
                          prop="describe"
                          label-width="80px">
              <el-input v-model="education.describe" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="在校经历:"
                          prop="education"
                          label-width="80px">
              <el-input v-model="education.education"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--工作期望  -->
    <div class="createPost-main-container">
      <header class="section-header">
        <span class="section-title-l"></span>
        <h2 class="section-title">工作期望</h2>
        <span class="section-title-r"></span>
      </header>
      <el-form ref="postForm"
               :model="{expect}"
               :rules="rules"
               class="form-container">
        <el-row>
          <el-col :span="8">
            <el-form-item label="工作城市"
                          prop="city">
              <el-cascader :options="options"
                           v-model="expect.city"
                           filterable
                           style="200px"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="职业:">
              <el-cascader :options="category"
                           :props="{label:'name',value:'id',children:'children' }"
                           v-model="expect.occupation"
                           :show-all-levels="false"
                           filterable
                           style="200px"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪资:"
                          prop="describe"
                          label-width="80px">
              <el-input v-model="expect.salary" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 项目经历 -->
    <div class="createPost-main-container">
      <header class="section-header">
        <span class="section-title-l"></span>
        <h2 class="section-title">项目经历</h2>
        <span class="section-title-r"></span>
      </header>
      <el-form ref="project"
               :model="{project}"
               :rules="rules"
               class="form-container">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称"
                          prop="project_name"
                          label-width="80px">
              <el-input v-model="project.project_name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="角色:"
                          prop="role">
              <el-input v-model="project.role" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="时间:"
                          prop="data">
              <el-date-picker :editable="false"
                              v-model="project.data"
                              type="daterange"
                              unlink-panels
                              class="datePickers"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目描述:"
                          prop="describet"
                          label-width="80px">
              <el-input v-model="project.describet"
                        type="textarea"
                        style="width:400px"
                        :rows="3"
                        placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 工作经历 -->
    <div class="createPost-main-container">
      <header class="section-header">
        <span class="section-title-l"></span>
        <h2 class="section-title">工作经历</h2>
        <span class="section-title-r"></span>
      </header>
      <el-form ref="work"
               :model="{work}"
               :rules="rules"
               class="form-container">
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司名称"
                          prop="company"
                          label-width="80px">
              <el-input v-model="work.company" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="职位:"
                          prop="position">
              <el-input v-model="work.position" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="时间:"
                          prop="data">
              <el-date-picker :editable="false"
                              v-model="work.data"
                              type="daterange"
                              unlink-panels
                              class="datePickers"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工作内容:"
                          prop="job_content"
                          label-width="80px">
              <el-input v-model="work.job_content"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;"
                          label-width="80px"
                          label="成就:"
                          prop="achievement">
              <el-input v-model="work.achievement" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item prop="work_img"
                          style="margin-bottom: 30px; "
                          label="图片展示">
              <el-form-item label-width="0px"
                            style="margin-bottom: 0px"
                            prop="source_uri">
                <el-input v-model="work.work_img"
                          :rows="3"
                          placeholder="请填入图片地址">
                  <template slot="prepend">
                    IMG
                  </template>
                </el-input>
              </el-form-item>
              <div class="image-preview image-app-preview">
                <div v-show="work.work_img"
                     class="image-preview-wrapper">
                  <img :src="work.work_img" />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="video"
                          style="margin-bottom: 30px; margin-Left: 30px;"
                          label="视频展示">
              <el-form-item label-width="0px"
                            style="margin-bottom: 0px"
                            prop="source_uri">
                <el-input v-model="work.video"
                          :rows="3"
                          placeholder="请填入视频地址">
                  <template slot="prepend">
                    VIDEO
                  </template>
                </el-input>
              </el-form-item>
              <div class="image-preview image-app-preview">
                <div v-show="work.video"
                     class="image-preview-wrapper">
                  <video :src="work.video"
                         autoplay
                         controls="true"
                         webkit-playsinline="true"
                         playsinline="true" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL, validId, validPhone } from '@/utils/validate'
import { provinceAndCityData, TextToCode, CodeToText } from 'element-china-area-data'
import { fetchArticle, ModifyInformation, occupationID, educationModify, expectModify, projectModify, workModify } from '@/api/article'
import { GEToccupation } from '@/api/occupation'
import Warning from './Warning'
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown,
} from './Dropdown'
import { createInformation, createEducation, createExpect, createProject, createWork } from '@/api/create'
const defaultForm = {
  id: '',
  identity: '',
  expect: '',
  contact: '',
  work: '',
  name: '',
  img: '', // 头像
  age: '',
  gender: '',
  education_name: '',
  education: '',
  number: '',
  marriage: '',
}
const educationTemp = {
  id: '',
  project_name: '',
  role: '',
  data: [],
  describe: '',
  education: '', //在校经历
}
// 工作期望
const expectTemp = {
  id: '',
  city: [],
  occupation: [],
  salary: '',
}
// 项目经历
const projectTemp = {
  id: '',
  project_name: '',
  role: '',
  describet: '',
  data: [],
}
// 工作经历
const work_experienceTemp = {
  id: '',
  company: '',
  job_content: '',
  work_img: '',
  video: '',
  data: [],
  achievement: '',
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    // 校验
    const validateRequireID = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.filed + '为必传项',
          type: 'error',
        })
        callback(new Error(rule.filed + '为必传项'))
      } else if (validId(value)) {
        this.$message({
          message: '身份证格式错误',
          type: 'error',
        })
        callback(new Error('身份证格式错误'))
      } else {
        callback()
      }
    }
    // 手机号检验
    const validateRequirePhone = (rule, value, callback) => {
      if (value) {
        this.$message({
          message: '联系方式必传项',
          type: 'error',
        })
        callback(new Error('联系方式必传项'))
        if (validPhone(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error',
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    // 非空检验
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '必传项未填！ 请重新检查',
          type: 'error',
        })
        callback(new Error('该项为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      education: Object.assign({}, educationTemp),
      expect: Object.assign({}, expectTemp),
      project: Object.assign({}, projectTemp),
      work: Object.assign({}, work_experienceTemp),
      Status: { status: 'draft' },
      identityOptions: ['在校', '校招', '社招'],
      genderOptions: ['女', '男'],
      marriageOptions: ['未婚', '已婚'],
      educationOptions: ['本科', '专科', '硕士', '博士'],
      loading: false,
      category: null,
      userListOptions: [],
      categoryName: '',
      rules: {
        img: [{ validator: validateRequire }],
        id: [{ validator: validateRequireID }],
        contact: [{ validator: validateRequirePhone }],
        gender: [{ validator: validateRequire }],
        project_name: [{ validator: validateRequire }],
        city: [{ validator: validateRequire }],
        occupation: [{ validator: validateRequire }],
        age: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        name: [{ validator: validateRequire }],
      },
      tempRoute: {},
      options: provinceAndCityData,
    }
  },
  created () {
    // 从编辑页面进入
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
    this.tree()
    defaultForm.id = educationTemp.id = expectTemp.id = projectTemp.id = work_experienceTemp.id
    educationTemp.project_name = defaultForm.education_name
    educationTemp.role = defaultForm.education
  },
  methods: {
    tree () {
      GEToccupation().then((res) => {
        this.category = res.data
      })
    },
    postFormImg (payload) {
      defaultForm.img = payload
    },
    // workImg (payload) {
    //   work_experienceTemp.work_img = payload
    // },
    // 数据获取
    fetchData (id) {
      fetchArticle(id)
        .then((response) => {
          this.education = Object.assign({}, response.education[0]) // copy obj 拷贝

          let educationObj = this.education.data.split(',')
          this.$set(this.education, 'data', [educationObj[0], educationObj[1]])
          this.postForm = Object.assign({}, response.information[0])
          this.expect = Object.assign({}, response.expect[0])
          this.project = Object.assign({}, response.project[0])
          let projectObj = this.project.data.split(',')
          this.$set(this.project, 'data', [projectObj[0], projectObj[1]])
          this.work = Object.assign({}, response.work_experience[0])
          let workObj = this.work.data.split(',')
          this.$set(this.work, 'data', [workObj[0], workObj[1]])
          // this.education.project_name = this.postForm.education_name
          // this.education.role = this.postForm.education
          //-------------- 数据回显 

          // 将省市传过来，通过TextToCode转成code，这样才会回显省市
          let codeObj = this.expect.city.replace(/\s*/g, "").split('/')
          this.$set(this.expect, 'city', [TextToCode[codeObj[0]].code, TextToCode[codeObj[0]][codeObj[1]].code])
          // name 转为id
          occupationID(this.expect.occupation, null).then((res) => {
            this.$set(this.expect, 'occupation', [res.data.pid, res.data.id])
          })
        })
        .catch((err) => {
          console.log(err)
        })

    },
    // 修改
    submitForm () {
      defaultForm.id = educationTemp.id = expectTemp.id = projectTemp.id = work_experienceTemp.id
      this.postForm.education_name = this.education.project_name
      this.postForm.education = this.education.role
      occupationID(null, this.expect.occupation[1]).then((res) => {
        // this.expect.occupation = res.data.name
        this.$set(this.expect, 'occupation', res.data.name)
        // console.log(this.expect.occupation)
        // 基本信息
        this.$refs['postForm'].validate((valid) => {
          if (valid) {
            this.education.data = this.education.data.toString()
            this.work.data = this.work.data.toString()
            this.project.data = this.project.data.toString()
            // id转为文字 城市
            let cityValue = []
            cityValue.push(CodeToText[this.expect.city[0]], CodeToText[this.expect.city[1]])
            this.expect.city = cityValue[0] + " /" + " " + cityValue[1]
            ModifyInformation(this.postForm).then(() => {

            })
            // 工作期望
            expectModify(this.expect).then((response) => {
              let codeObj = this.expect.city.replace(/\s*/g, "").split('/')
              this.expect.city = []
              this.expect.city.push(TextToCode[codeObj[0]].code, TextToCode[codeObj[0]][codeObj[1]].code)
              occupationID(this.expect.occupation, null).then((res) => {
                this.$set(this.expect, 'occupation', [res.data.pid, res.data.id])
              })
            })
            // 学历信息
            educationModify(this.education).then(() => {
              let educationObj = this.education.data.split(',')
              this.education.data = []
              this.education.data.push(educationObj[0], educationObj[1])
            })
            // 经历信息
            workModify(this.work).then(() => {
              let workObj = this.work.data.split(',')
              this.work.data = []
              this.work.data.push(workObj[0], workObj[1])
            })
            // 项目
            projectModify(this.project).then(() => {
              let projectObj = this.project.data.split(',')
              this.project.data = []
              this.project.data.push(projectObj[0], projectObj[1])
            })

          } else {
            return false
          }

        })
      })
      this.loading = true
      this.$notify({
        title: '成功',
        message: '基本信息修改成功',
        type: 'success',
        duration: 2000,
      })
      this.Status.status = 'published'
      this.loading = false
    },
    change () {
      console.log(this.education.data)
    },
    // 添加
    addForm () {
      this.$set(this.education, 'id', this.postForm.id)
      this.$set(this.expect, 'id', this.postForm.id)
      this.$set(this.project, 'id', this.postForm.id)
      this.$set(this.work, 'id', this.postForm.id)
      this.postForm.education_name = this.education.project_name
      this.postForm.education = this.education.role
      occupationID(null, this.expect.occupation[1]).then((res) => {
        // this.expect.occupation = res.data.name
        this.$set(this.expect, 'occupation', res.data.name)
        this.$refs['postForm'].validate((valid) => {
          if (valid) {
            this.education.data = this.education.data.toString()
            this.work.data = this.work.data.toString()
            this.project.data = this.project.data.toString()
            // id转为文字 城市·
            let cityValue = []
            cityValue.push(CodeToText[this.expect.city[0]], CodeToText[this.expect.city[1]])
            this.expect.city = cityValue[0] + " /" + " " + cityValue[1]
            createInformation(this.postForm).then(() => {
            })

            // 工作期望
            createExpect(this.expect).then(() => {
              let codeObj = this.expect.city.replace(/\s*/g, "").split('/')
              this.expect.city = []
              this.expect.city.push(TextToCode[codeObj[0]].code, TextToCode[codeObj[0]][codeObj[1]].code)
              occupationID(this.expect.occupation, null).then((res) => {
                this.$set(this.expect, 'occupation', [res.data.pid, res.data.id])
              })
            })
            // 学历信息
            createEducation(this.education).then(() => {
              let educationObj = this.education.data.split(',')
              this.education.data = []
              this.education.data.push(educationObj[0], educationObj[1])
            })
            // 经历信息
            createWork(this.work).then(() => {
              let workObj = this.work.data.split(',')
              this.work.data = []
              this.work.data.push(workObj[0], workObj[1])
            })
            // 项目
            createProject(this.project).then(() => {
              let projectObj = this.project.data.split(',')
              this.project.data = []
              this.project.data.push(projectObj[0], projectObj[1])
            })
          }
        })
      })

      this.loading = true
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success',
        duration: 2000,
      })
      this.Status.status = 'published'
      this.loading = false
      // this.$router.push({ path: 'detailed' })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.image-preview {
  width: 400px;
  height: 400px;
  position: relative;
  border: 1px dashed #d9d9d9;
  float: left;
  margin-left: 50px;
  margin-top: 20px;
  .image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 400px;
      height: 400px;
    }
    video {
      width: 400px;
      height: 400px;
    }
  }
  .image-preview-action {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    cursor: pointer;
    text-align: center;
    line-height: 200px;
    .el-icon-delete {
      font-size: 36px;
    }
  }
  &:hover {
    .image-preview-action {
      opacity: 1;
    }
  }
}

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.section-header {
  position: relative;
  margin-top: 20px;
  margin-bottom: 100px;
}
.section-header .section-title-l,
.section-header .section-title-r {
  display: inline-block;
  position: absolute;
  top: 50%;
  width: 35%;
  height: 0;
  border-top: 1px solid #ededed;
  vertical-align: middle;
}
.section-header .section-title-l:hover,
.section-header .section-title-r:hover {
  background-color: #ddd;
}
.section-header .section-title-l {
  left: 0;
}
.section-header .section-title-r {
  right: 0;
}
.section-header .section-title {
  position: relative;
  z-index: 1;
  width: 24%;
  min-width: 100px;
  margin: 0 auto;
  padding: 4px 10px;
  border-radius: 32px;
  font-weight: 500;
  text-align: center;
  background-color: #f5f5f5;
}
.section-header .section-title:hover {
  background-color: #ddd;
}
</style>
 