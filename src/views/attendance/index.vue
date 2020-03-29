<template lang="pug">
  .app-container
    .el-row 时间范围：
      el-radio(label='2') 今天
      el-radio(label='2') 昨天
      el-radio(label='2') 本周
      el-radio(label='2') 上周
      el-radio(label='2') 本月
      el-radio(label='2') 上月
      el-date-picker(v-model='dataTime', type='daterange', range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期')
    .el-row(style="margin-top:20px") 状态：
      el-radio(label='2') 正常
      el-radio(label='2') 异常
    .el-row(style="margin-top:20px") 课程：
      el-select(v-model='value', placeholder='请选择')
        el-option(v-for='item in options', :key='item.value', :label='item.label', :value='item.value')
    .el-row
      el-table(:data='domains', style='width: 100%;margin-left:120px' ,:row-class-name="tableRowClassName")
        el-table-column(prop='studentId', label='学号', width='180')
        el-table-column(prop='startSignin', label='签到时间', width='180')
        el-table-column(prop='endSignin', label='签退时间', width='180')
        el-table-column(prop='teachName', label='老师姓名', width='180')
        el-table-column(prop='crouseName', label='课程', width='180')
      el-pagination(style="margin-left:1000px")(layout='prev, pager, next', :total='1000')
</template>

<script>
  import API from '@/api/api'
  export default {
    data() {
      return {
        domains:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        dataTime: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        options: [{
          value: '高等数学',
          label: '高等数学'
        }],
        value: ''
      }

    },
    methods: {
      loadList: function() {
        API.signin.list(this.filter).then((res) => {
          this.domains = res.data
        }).catch((err) => {
          this.$message.error('获取列表失败')
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    },
    mounted() {
      this.loadList()
    }
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .line {
    text-align: center;
  }
</style>

