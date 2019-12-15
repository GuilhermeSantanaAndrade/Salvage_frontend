<script>
  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    extends: Line,
    mixins: [reactiveProp],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }],
        xAxes: [ {
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    },
    mounted () {
      this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
    }
  }
</script>

<style>
</style>
