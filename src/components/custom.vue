<template>
  <div class="serviceInfo">
    <el-card class="chartCard" style="height:100px">
      <h4>
        Prometheus
      </h4>
    </el-card>
    <el-row>
      <el-col :span="12">
        <el-card style="width: 600px;height: 360px">
          <div id="node_load1_chart" style="width: 560px;height:300px;" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 600px;height: 360px">
          <div id="avg_node_load1_chart" style="width: 560px;height:300px;" />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card style="width: 600px;height: 360px">
          <div id="process_cpu_seconds_total_chart" style="width: 560px;height:300px;" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 600px;height: 360px">
          <div id="avg_process_cpu_seconds_total_chart" style="width: 560px;height:300px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Chart',
  props: {
    refresh_interval: null
  },
  data() {
    return {
      avg_node_load1_data: {},
      node_load1_data: {},
      process_cpu_seconds_total_data: {},
      avg_process_cpu_seconds_total_data: {},
      timer: null,
      interval: 1000
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created: function() {

  },
  mounted: function() {
    this.avg_node_load1()
    this.node_load1()
    this.process_cpu_seconds_total()
    this.avg_process_cpu_seconds_total()
  },
  methods: {
    avg_node_load1() {
      const myChart = this.$echarts.init(document.getElementById('avg_node_load1_chart'))
      let localtime = Math.round(new Date().getTime() / 1000)
      let url = 'http://192.168.131.100:9090/api/v1/query_range?query=avg%28node_load1%7B%7D%29%0A%0A&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
      this.$ajax.get(url).then(response => {
        this.avg_node_load1_data = response.data.data.result[0].values
        this.avg_node_load1_data.forEach(function(el) {
          el[0] = new Date(el[0] * 1000)
        })
        const option = {
          title: {
            text: '服务器内存平均负载情况'
          },
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value',
            scale: true
          },
          series: [{
            data: this.avg_node_load1_data,
            type: 'line',
            symbol: 'none',
            smooth: true
          }]
        }
        myChart.setOption(option)
      }).catch(function(error) {
        alert(error)
      })
      this.timer = setInterval(() => {
        localtime = Math.round(new Date().getTime() / 1000)
        url = 'http://192.168.131.100:9090/api/v1/query_range?query=avg%28node_load1%7B%7D%29%0A%0A&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
        this.$ajax.get(url).then(response => {
          this.avg_node_load1_data = response.data.data.result[0].values
          this.avg_node_load1_data.forEach(function(el) {
            el[0] = new Date(el[0] * 1000)
          })
          const option = {
            title: {
              text: '服务器内存平均负载情况'
            },
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: [{
              data: this.avg_node_load1_data,
              type: 'line',
              symbol: 'none',
              smooth: true
            }]
          }
          myChart.setOption(option)
        }).catch(function(error) {
          alert(error)
        })
      }, this.interval)
    },
    node_load1() {
      const myChart = this.$echarts.init(document.getElementById('node_load1_chart'))
      let localtime = Math.round(new Date().getTime() / 1000)
      let url = 'http://192.168.131.100:9090/api/v1/query_range?query=node_load1%7B%7D&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
      this.$ajax.get(url).then(response => {
        this.node_load1_data = response.data.data.result
        const series = []
        this.node_load1_data.forEach(function(el) {
          el.values.forEach(function(temp) {
            temp[0] = new Date(temp[0] * 1000)
          })
          series.push({
            data: el.values,
            type: 'line',
            symbol: 'none',
            smooth: true
          })
        })
        const option = {
          title: {
            text: '服务器内存所有负载情况'
          },
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value',
            scale: true
          },
          series: series
        }
        myChart.setOption(option)
      }).catch(function(error) {
        alert(error)
      })
      this.timer = setInterval(() => {
        localtime = Math.round(new Date().getTime() / 1000)
        url = 'http://192.168.131.100:9090/api/v1/query_range?query=node_load1%7B%7D&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
        this.$ajax.get(url).then(response => {
          this.node_load1_data = response.data.data.result
          const series = []
          this.node_load1_data.forEach(function(el) {
            el.values.forEach(function(temp) {
              temp[0] = new Date(temp[0] * 1000)
            })
            series.push({
              data: el.values,
              type: 'line',
              symbol: 'none',
              smooth: true
            })
          })
          const option = {
            title: {
              text: '服务器内存所有负载情况'
            },
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: series
          }
          myChart.setOption(option)
        }).catch(function(error) {
          alert(error)
        })
      }, this.interval)
    },
    process_cpu_seconds_total() {
      const myChart = this.$echarts.init(document.getElementById('process_cpu_seconds_total_chart'))
      let localtime = Math.round(new Date().getTime() / 1000)
      let url = 'http://192.168.131.100:9090/api/v1/query_range?query=%281+-+avg%28rate%28node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D%29%29+by+%28instance%29%29*100&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
      this.$ajax.get(url).then(response => {
        this.process_cpu_seconds_total_data = response.data.data.result
        const series = []
        this.process_cpu_seconds_total_data.forEach(function(el) {
          el.values.forEach(function(temp) {
            temp[0] = new Date(temp[0] * 1000)
          })
          series.push({
            data: el.values,
            type: 'line',
            symbol: 'none',
            smooth: true
          })
        })
        const option = {
          title: {
            text: '服务器CPU所有负载情况'
          },
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value',
            scale: true
          },
          series: series
        }
        myChart.setOption(option)
      }).catch(function(error) {
        alert(error)
      })
      this.timer = setInterval(() => {
        localtime = Math.round(new Date().getTime() / 1000)
        url = 'http://192.168.131.100:9090/api/v1/query_range?query=%281+-+avg%28rate%28node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D%29%29+by+%28instance%29%29*100&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
        this.$ajax.get(url).then(response => {
          this.process_cpu_seconds_total_data = response.data.data.result
          const series = []
          this.process_cpu_seconds_total_data.forEach(function(el) {
            el.values.forEach(function(temp) {
              temp[0] = new Date(temp[0] * 1000)
            })
            series.push({
              data: el.values,
              type: 'line',
              symbol: 'none',
              smooth: true
            })
          })
          const option = {
            title: {
              text: '服务器CPU所有负载情况'
            },
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: series
          }
          myChart.setOption(option)
        }).catch(function(error) {
          alert(error)
        })
      }, this.interval)
    },
    avg_process_cpu_seconds_total() {
      const myChart = this.$echarts.init(document.getElementById('avg_process_cpu_seconds_total_chart'))
      let localtime = Math.round(new Date().getTime() / 1000)
      let url = 'http://192.168.131.100:9090/api/v1/query_range?query=avg%281+-+avg%28rate%28node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D%29%29+by+%28instance%29%29+*+100%0A&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
      this.$ajax.get(url).then(response => {
        this.avg_process_cpu_seconds_total_data = response.data.data.result
        const series = []
        this.avg_process_cpu_seconds_total_data.forEach(function(el) {
          el.values.forEach(function(temp) {
            temp[0] = new Date(temp[0] * 1000)
          })
          series.push({
            data: el.values,
            type: 'line',
            symbol: 'none',
            smooth: true
          })
        })
        const option = {
          title: {
            text: '服务器CPU平均负载情况'
          },
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value',
            scale: true
          },
          series: series
        }
        myChart.setOption(option)
      }).catch(function(error) {
        alert(error)
      })
      this.timer = setInterval(() => {
        localtime = Math.round(new Date().getTime() / 1000)
        url = 'http://192.168.131.100:9090/api/v1/query_range?query=avg%281+-+avg%28rate%28node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D%29%29+by+%28instance%29%29+*+100%0A&start=' + (localtime - 3600).toString() + '&end=' + localtime + '&step=14'
        this.$ajax.get(url).then(response => {
          this.avg_process_cpu_seconds_total_data = response.data.data.result
          const series = []
          this.avg_process_cpu_seconds_total_data.forEach(function(el) {
            el.values.forEach(function(temp) {
              temp[0] = new Date(temp[0] * 1000)
            })
            series.push({
              data: el.values,
              type: 'line',
              symbol: 'none',
              smooth: true
            })
          })
          const option = {
            title: {
              text: '服务器CPU平均负载情况'
            },
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: series
          }
          myChart.setOption(option)
        }).catch(function(error) {
          alert(error)
        })
      }, this.interval)
    }
  }
}

</script>

<style scoped>

</style>
