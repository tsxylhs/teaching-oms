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

    .el-row(style="margin-top:20px") 学生姓名:
      el-input(style="width:250px")(v-model="input" placeholder="请输入内容")
    .el-row
      el-table(:data='tableData', style='width: 100%;margin-left:120px' ,:row-class-name="tableRowClassName")
        el-table-column(prop='date', label='日期', width='180')
        el-table-column(prop='name', label='姓名', width='180')
        el-table-column(prop='date', label='签到时间', width='180')
        el-table-column(prop='name', label='签退时间', width='180')
        el-table-column(prop='date', label='状态', width='180')
        el-table-column(prop='name', label='课程', width='180')
      el-pagination(style="margin-left:1000px")(layout='prev, pager, next', :total='1000')
</template>

<script>
  export default {
    data() {
      return {
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
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }

    },
    methods: {
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

