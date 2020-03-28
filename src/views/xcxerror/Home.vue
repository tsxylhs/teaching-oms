<template lang="pug">
    section.components-container
        .w-100.bg-white.p-3
            el-form(:inline='true', :model='filter', size='small')
                el-form-item
                    el-input.w-300p(v-model='filter.k', placeholder='请输入查询内容')
                el-form-item
                    el-button(type='primary' icon="el-icon-查询" @click='loadList' disabled=true) 查询
                // 列表
            el-table.mt-3(:data='domains', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleView', stripe='')
                el-table-column(prop='createdAt', label='上报时间',sortable="custom",align='center', min-width="120")
                el-table-column(prop='content', label='错误内容',sortable="custom",align='center')
                el-table-column(label='操作', width='140', align='center' fixed="right")
                    template(slot-scope='scope')
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
        API.wxError.list(this.filter).then((res) => {
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
        API.wxError.delete(val.id).then((res) => {
          this.$message.success('删除成功！')
          this.loadList()
        }).catch((err) => {
          this.$message.error('删除失败！')

        })
      }
    },
    mounted() {
      this.loadList()
    }
  }
</script>

<style scoped></style>
