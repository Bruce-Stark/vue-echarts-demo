<template>
  <div class="chart">
        <div id="avg_node_load1_chart" style="width: 2000px;height:600px;"></div>
  </div>
</template>

<script>

export default {
  name: 'chart',
  props: {
    refresh_interval: null
  },
  data () {
    return {
      avg_node_load1_option: {},
      avg_node_load1_data: {},
      timer: null
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    avg_node_load1 () {
      this.avg_node_load1_option = this.$echarts.init(document.getElementById('avg_node_load1_chart'))
      let localtime = Math.round(new Date().getTime() / 1000)
      let url = 'http://192.168.0.81:9090/api/v1/query_range?query=avg%28node_load1%7B%7D%29%0A%0A&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
      this.$ajax.get(url).then(response => {
        this.avg_node_load1_data = response.data.data.result[0].values
        this.avg_node_load1_data.forEach(function (el) {
          el[0] = new Date(el[0] * 1000)
        })
        let option = {
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.avg_node_load1_data,
            type: 'line',
            symbol: 'none',
            smooth: true
          }]
        }
        this.avg_node_load1_option.setOption(option)
        this.timer = setInterval(this.avg_node_load1, 100000)
      }).catch(function (error) {
        alert(error)
      })
    }
  },
  created: {

  },
  mounted: function () {
    this.avg_node_load1()
  },
  watch: {
  }
}
</script>

<style scoped>
  .chart{
    position: relative;
    margin-top: 10%;
    width: 100%;
    height: 100%;
    background-color: lavender;
  }
  .mapChart{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
  }
  .barChart{
    margin: 10px;
    width: 380px;
    height: 320px;
  }
  .barBox{
    position: absolute;
    width: 400px;
    top: 10%;
    left: 3%;
    z-index: 2;
  }
  .checker li{
    display: inline-block;
    margin-right: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #888;
  }
  .checker .set{
    color: lavender;
  }
  .newbarmap{
    position: fixed;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
  }
</style>
