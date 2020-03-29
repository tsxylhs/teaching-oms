<template lang="pug">
    .w-100.h-100.bg-white.p-4
      el-upload.upload-demo(drag='', action='https://jsonplaceholder.typicode.com/posts/', multiple='')
        i.el-icon-upload
        .el-upload__text
          | 将文件拖到此处，或
          em 点击上传
        .el-upload__tip(slot='tip') 只能上传wrod文件，且不超过500kb

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
          this.$router.push('/grades')
        }).catch((err) => {

        })
      },
      handleCancel() {
        this.$router.push('/grades')
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
