<template lang="pug">
    .w-100.h-100.bg-white.p-4
        .pf-title.pb-3.text-center {{title}}
        el-form(:model='domain', :rules='rule', ref='form', label-width='150px')
            el-form-item(label='学号:', prop='name')
                el-input.w-60(v-model='domain.studentId',  placeholder="请输入标题名称")
            el-form-item(label='班级:', prop='name')
                el-input.w-60(v-model='domain.className',  placeholder="请输入班级地址")
            el-form-item(label='课程:', prop='name')
                el-input.w-60(v-model='domain.courseName',  placeholder="请输入教师姓名")
            el-form-item(label='教师姓名:', prop='brief')
                el-input.w-60(v-model='domain.teachName', placeholder="请输入课程")
            el-form-item(label='课程考试成绩:', prop='priority')
              el-input.w-60(v-model='domain.testScores',  placeholder="内容")
            el-form-item(label='课堂表现成绩:', prop='priority')
              el-input.w-60(v-model='domain.showGrades',  placeholder="内容")
            el-form-item(label='签到成绩:', prop='priority')
                el-input.w-60(v-model='domain.signin',  placeholder="内容")
            el-form-item(label='总成绩:', prop='priority')
              el-input.w-60(v-model='domain.grades',  placeholder="内容")
        .col-12.mb-4.text-center
              el-button(type='primary', @click='handleSave') 保存
              el-button(size='middle', @click='handleCancel') 取消
</template>

<script>
  import API from '@/api/api'

  export default {
    name: 'Form',
    data() {
      return {
        previewImage: '',
        domain: {},
        title: '添加成绩',
        id: '',
        previewVisible: false,
        rule: {}

      }
    },
    methods: {
      loadSuppers() {
        this.title="修改成绩"
        API.grade.get(this.id).then((res) => {
          this.domain = res.data

        }).catch((err) => {
          console.log(err)
        })
      },
      handleSave() {
        var api = this.domain.id ? API.grade.update : API.grade.create
        api(this.domain).then((res) => {
          this.domain = res.data
          this.$router.push('/Takean/grades')
        }).catch((err) => {
          this.$router.push('/Takean/grades')

        })
      },
      handleCancel() {
        this.$router.push('/Takean/grades')
      }
    },
    mounted() {
      debugger
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        if (this.id !== '') {
          this.loadSuppers()
        }
      }
    }

  }
</script>

<style scoped>

</style>
