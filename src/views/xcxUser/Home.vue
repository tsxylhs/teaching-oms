<template lang="pug">
  section.components-container
    .w-100.bg-white.p-3
      el-form(:inline='true', :model='filter', size='small')
        el-form-item
          el-input.w-300p(v-model='filter.k', placeholder='请输入查询内容')
        el-form-item
          el-button(type='primary' icon="el-icon-查询" @click='loadList' disabled=true) 查询
        router-link(to='/performance/form')
          el-button(type='primary' size="small"  icon="el-icon-plus")
        // 列表
      el-table.mt-3(:data='domains', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleView', stripe='')
        el-table-column(prop='title', label='小程序头像',sortable="custom",align='center', min-width="120")
          template(slot-scope="scope")
            img.pointer( :src='scope.row.avatarUrl', alt='无图片', style='width: 40px;height:40px')
        el-table-column(prop='studentId', label='学号',sortable="custom",align='center', min-width="120")
          template(slot-scope="scope")
            span(v-if="scope.row.studentId") {{scope.row.studentId}}
            span(v-else) 未绑定
        el-table-column(prop='nickName', label='小程序昵称',sortable="custom",align='center', min-width="120")
        el-table-column(prop='calssName', label='班级',sortable="custom" width='140', align='center ')
          template(slot-scope="scope")
            span(v-if="scope.row.calssName") {{scope.row.studentId}}
            span(v-else) 未绑定
        el-table-column(prop='userName', label='姓名',sortable="custom" width='140', align='center ')
          template(slot-scope="scope")
            span(v-if="scope.row.userName") {{scope.row.studentId}}
            span(v-else) 未绑定
        el-table-column(prop='mobile', label='联系电话',sortable="custom" width='140', align='center ')
          template(slot-scope="scope")
            span(v-if="scope.row.mobile") {{scope.row.studentId}}
            span(v-else) 未绑定

      .col-12.mt-3
        .row.justify-content-end
          el-pagination(@size-change='onPageSizeChanged', @current-change='onPageChanged', :current-page='filter.p', :page-sizes='[10, 20, 50]', :page-size='filter.ps', layout='total, sizes, prev, pager, next, jumper', :total='filter.count')

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
        API.wxUser.list(this.filter).then((res) => {
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
      }
    },
    mounted() {
      this.loadList()
    }
  }
</script>

<style scoped></style>
