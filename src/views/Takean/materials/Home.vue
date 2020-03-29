<template lang="pug">
    section.components-container
      .w-100.h-100.bg-white.p-4
        el-upload.upload-demo(drag='', action='http://127.0.0.1:8081/materials/add', multiple='')
          i.el-icon-upload
          .el-upload__text
            | 将文件拖到此处，或
            em 点击上传
          .el-upload__tip(slot='tip') 只能上传wrod文件，且不超过500kb
        el-table.mt-3(:data='domains', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleView', stripe='')
          el-table-column(prop='materialsDesc', label='文件名',sortable="custom",width='140', align='center ')
          el-table-column(prop='materialsUrl', label='文件地址',sortable="custom", align='center ')
          el-table-column(label='操作', width='140', align='center'  fixed="right")
            template(slot-scope='scope')
              el-button(size='mini', type='danger', @click='handleDelete(scope.row)' icon="el-icon-delete" circle)

</template>

<script>
  import API from '@/api/api'

export default {
    name: 'StorageInventory',
    data() {
      return {
        filter: {
          k: '',
          p: 1,
          ps: 10,
          count: 0,
          prop: '',
          order: '',
          type: ''
        },
        listLoading: false,
        domains: [],
        patients: []
      }
    },
    watch: {
      stage: function() {
        this.loadList()
      }
    },
    methods: {
      loadList: function() {
        API.marterials.list(this.filter).then((res) => {
          this.domains = res.data
        }).catch((err) => {
          this.$message.error('获取列表失败')
        })
      },
      onPageSizeChanged: function(val) {
        this.filter.ps = val
        this.filter.p = 1
        this.loadList()
      },
      onPageChanged: function(val) {
        this.filter.p = val
        this.loadList()
      },
      handleDelete: function(val) {
        API.marterials.delete(val.id).then((res) => {
          this.$message.success('删除成功！')
          this.loadList()
        }).catch((err) => {
          this.$message.error('删除失败！')

        })
      }
    },
    mounted() {
      this.$watch('$route.meta.type', function(newVal) {
        this.filter.type = newVal
        this.loadList()
      })
      this.loadList()
    }
  }
</script>

<style scoped></style>
