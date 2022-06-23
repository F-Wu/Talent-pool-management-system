<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import axios from 'axios'
import { getusers } from '@/api/home-page'
const lineChartData = {
  newVisitis: {
    expectedData: [],
    // expectedData: this.value,
    actualData: [],
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data () {
    return {
      lineChartData: lineChartData.newVisitis,
      users: null,
      dates: [],
      values: [],
    }
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    },
    GETusers () {
      getusers().then((res) => {
        if (res.status == 0) {
          this.users = res.data
          for (var i = 0; i < res.data.length; i++) {
            this.dates.push(res.data[i].date)
            this.values.push(res.data[i].value)
            lineChartData.newVisitis.actualData = Object.values(this.dates)
            lineChartData.newVisitis.expectedData = Object.values(this.values)
          }
          // console.log(this.values)
        } else {
          alert(res.msg)
        }
      })
    },
  },
  mounted () {
    this.GETusers()
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
