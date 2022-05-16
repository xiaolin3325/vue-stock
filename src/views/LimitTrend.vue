<template>
  <div class="Echarts">
    <div id="main" style="width: 100%; min-height: 800px"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      xAxis: [],
      ztdata: [],
      dtdata: [],
      myChart: {},
      option: {},
      oldata: {
        //status: 1,
        //type: "data",
        //x: [1612792000, 1612793802, 1612795599, 1612797399, 1612799199],
        //y: [120, 240, 280, 50, 100],
      }, //贾克斯返回的数据
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("main"));
    clearTimeout(this.timer); //清除延迟执行
    this.timer = setTimeout(() => {
      //设置延迟执行
      this.updateEcharts();
    }, 100);
  },
  methods: {
    getData() {
      axios.get("/stock/getzdtdata").then((res) => {
        this.xAxis = res.data.data.xAxis;
        this.ztdata = res.data.data.ztdata;
        this.dtdata = res.data.data.dtdata;
      });
    },
    updateEcharts() {
      // 指定图表的配置项和数据
      this.option = {
        title: {
          text: "涨跌停对比",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxis,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "涨停",
            type: "line",
            color: "#FF0000",
            data: this.ztdata,
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "跌停",
            type: "line",
            color: "#00C957",
            data: this.dtdata,
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [
                { type: "average", name: "Avg" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style></style>
