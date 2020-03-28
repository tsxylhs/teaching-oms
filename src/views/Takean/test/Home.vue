<template lang="pug">
  section.components-container
    .w-100.bg-white.p-3
      el-form(:inline='true', :model='filter', size='small')
        el-form-item
          el-input.w-300p(v-model='filter.k', placeholder='请输入查询内容')
        el-form-item
          el-button(type='primary' icon="el-icon-查询" disabled=true) 查询
          el-button(type='primary' size="small" @click="toadd"  icon="el-icon-plus")
      .el-row
        .el-col-6(style="margin-left:12px", v-for="item in domains")
          el-card.box-card
            .clearfix(slot='header')
              span {{item.name}}
              el-button(style='float: right; padding: 3px 0', type='text') 考试时间：{{item.time}}
            .text 考试安排
              | {{item.desc}}
            el-button(style='float: right; padding: 3px 0', @click="fixtest(item)" type='text') 编辑
            el-button(@click="deleteItem(item)" style='float: left; padding: 3px 0;color:red', type='text') 删除
    div(style="margin-left:200px")
      el-popover( width='600px', v-model='visible')
        p(style="text-center") 增加修改考试安排
        el-form(:model='domain', :rules='rule', ref='form', label-width='150px')
          el-form-item(label='考试编号:', prop='name')
            el-input.w-60(v-model='domain.id',  placeholder="请输入考试编号")
          el-form-item(label='课程:', prop='name')
            el-input.w-60(v-model='domain.name',  placeholder="请输入课程名称")
          el-form-item(label='时间:', prop='name')
            el-date-picker(v-model='domain.time', type='date', placeholder='选择日期时间')
          el-form-item(label='内容:', prop='name')
            el-input.w-60(v-model='domain.desc',  placeholder="请输入内容")
        div(style="margin-left:200px")
          el-button(size='mini', type='text', @click='visible = false') 取消
          el-button(type='primary', size='mini', @click="submit") 确定


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
        domain: {},
        visible: false,
        domains: [{
          id: '1',
          name: '高等数学',
          time: '2020-4-17',
          desc: '高等数学前三章内容'
        }, {
          id: '2',
          name: '大学英语',
          time: '2020-4-18',
          desc: '大学英语前三章内容'
        }, {
          id: '3',
          name: '数据结构',
          time: '2020-4-19',
          desc: '数据结构前三章内容'
        }],
        listLoading: false,

        patients: []
      }
    },
    watch: {},
    methods: {
      dateFormat(fmt, date) {
        let ret
        const opt = {
          'Y+': date.getFullYear().toString(),        // 年
          'm+': (date.getMonth() + 1).toString(),     // 月
          'd+': date.getDate().toString(),            // 日
          'H+': date.getHours().toString(),           // 时
          'M+': date.getMinutes().toString(),         // 分
          'S+': date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
          }

        }

        return fmt
      },
      fixtest(val) {

        this.domain = val
        this.visible = true
      },
      toadd() {
        this.visible = true
      },
      deleteItem(val) {
        var items = []
        this.domains.forEach((rs) => {
          if (val.id === rs.id) {
          } else {
            items.push(rs)
          }
        })
        this.domains = items
      },
      submit() {
        this.domain.time=this.dateFormat("YYYY-mm-dd HH:MM", this.domain.time)
        this.domains.push(this.domain)
        this.domain = {}
        this.visible = false
      }
    },
    mounted() {

    }
  }
</script>

<style scoped></style>
