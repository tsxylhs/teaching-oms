<template lang="pug">
    section.components-container
        .w-100.bg-white.p-3
            el-form(:inline='true', :model='filter', size='small')
                el-form-item
                    el-input.w-300p(v-model='filter.k', placeholder='请输入查询内容')
                el-form-item
                    el-button(type='primary' icon="el-icon-查询" @click='loadList' disabled=true) 查询
                router-link(to='/homework/form')
                    el-button(type='primary' size="small"  icon="el-icon-plus") 新增作业
                // 列表
            el-table.mt-3(:data='domains', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleView', stripe='')
                el-table-column(prop='userName', label='姓名',sortable="custom",align='center', min-width="120")
                el-table-column(prop='className', label='班级',sortable="custom",align='center', min-width="120")
                el-table-column(prop='homeworkUrl', label='作业位置',sortable="custom" width='140', align='center ')
                el-table-column(label='操作', width='140', align='center' fixed="right")
                    template(slot-scope='scope')
                        el-button(size='small', @click='handleView(scope.row)', type='primary', icon='el-icon-edit', plain, circle)
                        el-button(size='mini', type='danger', @click='handleDelete(scope.row)' icon="el-icon-delete" circle)
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
        API.myhomework.list(this.filter).then((res) => {
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
        API.myhomework.delete(val.id).then((res) => {
          this.$message.success('删除成功！')
          this.loadList()
        }).catch((err) => {
          this.$message.error('删除失败！')

        })
      },
      handleView: function(val) {
        debugger
        this.$router.push({
          path: '/homework/form/' + val.id
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
