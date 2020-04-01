<template lang="pug">
    .w-100.h-100.bg-white.p-4
        .pf-title.pb-3 {{title}}
        el-form(:model='domain', :rules='rule', ref='form', label-width='150px')
            el-form-item(label='标题:', prop='name')
                el-input.w-60(v-model='domain.title',  placeholder="请输入标题名称")
            el-form-item(label='班级:', prop='name')
                el-input.w-60(v-model='domain.className',  placeholder="请输入班级地址")
            el-form-item(label='教师:', prop='name')
                el-input.w-60(v-model='domain.teachName',  placeholder="请输入教师姓名")
            el-form-item(label='课程:', prop='brief')
                el-input.w-60(v-model='domain.courseName', placeholder="请输入课程")
            el-form-item(label='内容:', prop='priority')
              el-input.w-60(v-model='domain.content',  placeholder="内容")
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
        title: '添加新的作业',
        id: '',
        previewVisible: false,
        rule: {}

      }
    },
    methods: {
      loadSuppers() {
        this.title="修改作业"
        API.homework.get(this.id).then((res) => {
          this.domain = res.data

        }).catch((err) => {
          console.log(err)
        })
      },
      handleSave() {
        debugger

        var api = this.domain.id ? API.homework.update : API.homework.create
        api(this.domain).then((res) => {
          this.$router.push('/homework')
        }).catch((err) => {

        })
      },
      handleCancel() {
        this.$router.push('/homework')
      }
    },
    mounted() {
      debugger
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        if (this.id !== '') {
          this.loadSuppers()
        }
      }
    }

  }
</script>

<style scoped>

</style>
