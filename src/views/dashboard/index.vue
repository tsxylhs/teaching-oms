<template lang="pug">
  .app-container
    .el-row
      el-carousel(:interval='4000', type='card', height='200px')
        el-carousel-item(v-for='item in images', :key='item.id')
          img(:src='item.url')
    .el-row(style="margin-top:20px")
      .el-col-10
        .el-row(style="font-size: 16pt" ) 课程签到统计
        .el-row
          ve-ring(:data='chartData', :settings='chartSettings')
      .el-col-10
        .el-row(style="font-size: 16pt" ) 日历
        .el-row
          el-calendar(v-model='value')
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        chartSettings: {},
        value: new Date(),
        chartData: {
          columns: ['课程', '签到数量'],
          rows: [
            { '课程': '高等数学', '签到数量': 1393 },
            { '课程': '大学英语', '签到数量': 3530 },
            { '课程': '软件工程', '签到数量': 2923 },
            { '课程': '离散数学', '签到数量': 1723 },
            { '课程': '高等数学', '签到数量': 3792 },
            { '课程': '数据结构', '签到数量': 4593 }
          ]
        },
        images: [{
          id: '1',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585200737808&di=3ef325a9694238d11e8a975667326989&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201602%2F17%2F20160217210133_jaKtz.png'
        }, {
          id: '2',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585200737808&di=b0db13068dbd5b4856da5f1490f4a7ad&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F07%2F20151107215345_5UwjH.thumb.700_0.png'
        }, {
          id: '3',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585200871547&di=a73f473f5cc82ba91b68f0d08a94d52b&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de772e405f96eef01f3a297969.jpg'
        }, {
          id: '4',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585200737808&di=b0db13068dbd5b4856da5f1490f4a7ad&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F07%2F20151107215345_5UwjH.thumb.700_0.png'
        }, {
          id: '5',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585200871547&di=a73f473f5cc82ba91b68f0d08a94d52b&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de772e405f96eef01f3a297969.jpg'
        }]
      }
    },
    mounted() {
      this.chartSettings = {
        roseType: 'radius'
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
