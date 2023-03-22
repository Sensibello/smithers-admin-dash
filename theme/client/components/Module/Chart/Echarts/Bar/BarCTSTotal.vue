<template>
  <wrapper-echarts
    ref="chartEl"
    style="min-height: 240px"
    height="400px"
    :options="options"
    @finished="handleRendered"
  >
  </wrapper-echarts>
</template>
<script>
import themeColors from "@@/client/util/theme/themeColors.js";
import WrapperEcharts from "@/components/Module/Chart/Echarts/WrapperEcharts";
import defaultPropsMixin from "@@/client/util/chart/defaultPropsMixin";

/*
Example of component for rendering the bar chart of the echarts library
*/
export default {
  components: {
    WrapperEcharts,
  },
  mixins: [defaultPropsMixin],
  props: {
    ctsData: {
      type: Array,
      default: [2, 4, 6],
    },
  },
  data() {
    return { timer: null, dataIndex: 0, isAnimated: false };
  },

  methods: {
    handleRendered(params) {
      // Receive event finalized from echarts instance
      const isAnimatedNow = window.innerWidth > 576;

      // Init animation
      if (isAnimatedNow && !this.isAnimated) {
        this.initAnimation();
      }
      // Stop animation on low resolution
      if (!isAnimatedNow && this.isAnimated) {
        if (this.timer != null) {
          clearInterval(this.timer);
        }
        this.timer = null;
        this.$refs.chartEl.dispatchAction({
          type: "hideTip",
        });
      }
    },
    initAnimation() {
      this.isAnimated = true;
      this.$nextTick(() => {
        this.$refs.chartEl.dispatchAction({
          type: "showTip",
          seriesIndex: 1,
          dataIndex: 0,
        });
      });

      // let dataLen = this.$refs.chartEl.options.series[0].data.length
      this.timer = setInterval(() => {
        if (!this.$refs.chartEl) return;

        this.dataIndex = this.dataIndex + 1;

        this.$refs.chartEl.dispatchAction({
          type: "hideTip",
        });

        this.$refs.chartEl.dispatchAction({
          type: "showTip",
          seriesIndex: 1,
          dataIndex: this.dataIndex % 20,
        });
      }, 5000);
    },
  },

  computed: {
    ohioNew() {
      // this.ctsData
      return this.ctsData.map((mon) => mon.new);
    },
    ohioLost() {
      return this.ctsData.map((mon) => mon.lost);
    },
    ohioExisting() {
      return this.ctsData.map((mon) => mon.existing);
    },
    ohioNet() {
      // sum ohioNew & ohioExisting
      const existingValues = this.ohioExisting.map(
        (i) => i["Quarter to Date Actual"].value
      );
      let newValues = this.ohioNew.map(
        (i) => i["Quarter to Date Actual"].value
      );
      let sum = [];
      for (let i = 0; i < existingValues.length; i++) {
        sum.push(existingValues[i] + newValues[i]);
      }
      return sum;
    },

    ohioTotal() {
      // subtract ohioLost from ohioNet
      let sum = [];
      let lostValues = this.ohioLost.map(
        (i) => i["Quarter to Date Actual"].value
      );
      for (let i = 0; i < this.ohioNet.length; i++) {
        sum.push(this.ohioNet[i] - lostValues[i]);
      }
      return sum;
    },

    options() {
      const variablesColors = themeColors(this.$store.state.theme.skin);
      const barMaxWidth = "25%";
      const barBorderRadius = [3, 3, 0, 0];
      let option = {
        // color: colors,
        // orient: "vertical",
        autoPlay: true,
        // currentIndex: 2,
        playInterval: 1000,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: variablesColors.variantsObj.secondary["mixed"],
              shadowColor: variablesColors.variantsObj.secondary["mixed"],
              opacity: 0.5,
            },
          },
        },
        toolbox: {
          show: false,
        },
        legend: {
          show: true,
          data: ["Wins", "Losses", "Totals"],
        },
        xAxis: [
          {
            show: true,
            type: "category",
            axisLine: {
              showGrid: false,
              lineStyle: {
                color: "#808080",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              // formatter: '${value}',
              fontSize: 14,
              fontWeight: 500,
              color: "#202020",
            },

            data: ["Jan", "Feb", "Mar"],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Lead",
            boundaryGap: [0, 0],
            show: false,
            position: "right",
            // offset: 80,
            axisLabel: {
              formatter: "{value} Win Ratio",
            },
          },
          {
            type: "value",
            // name: "Unit",
            position: "left",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#808080",
              },
            },
            axisLine: {
              showGrid: false,
              lineStyle: {
                color: "#808080",
              },
            },
            axisLabel: {
              formatter: "${value}",
              fontSize: 10,
              fontWeight: 500,
              color: "#202020",
            },
          },
        ],
        series: [
          {
            name: "Ohio existing",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            // data: [2, 3, 4],
            data: this.ohioExisting.map(
              (i) => i["Quarter to Date Actual"].value
            ),
            itemStyle: {
              normal: {
                color: "#aa00aa",
                label: {
                  show: true,
                },
              },
            },
            stack: "sum",
          },
          {
            name: "Ohio new",
            type: "bar",
            // for each month quarter to date  value ohioNew
            // data: [2, 2, 3],
            data: this.ohioNew.map((i) => i["Quarter to Date Actual"].value),
            barMaxWidth: barMaxWidth,
            itemStyle: {
              normal: {
                barBorderWidth: 2,
                barBorderColor: "#0000ff",
                color: "#0000aa",
                label: {
                  show: true,
                  // fontSize: 16,
                },
              },
            },

            barGap: "10%",
            zlevel: 1,
            stack: "sum",
          },

          {
            // this is an invisible value to show the losses in line with the top of the sum
            name: "losses adjustment",
            type: "bar",
            barMaxWidth: "50%",
            yAxisIndex: 1,
            data: this.ohioTotal,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                color: "#00000000",
              },
            },
            stack: "losses",
          },
          {
            name: "losses",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            // value is losses value
            // data: [1, 1, 1],
            data: this.ohioLost.map((i) => i["Quarter to Date Actual"].value),
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#ff5544",
                label: {
                  show: true,
                  position: "bottom",
                  color: "#202020",
                  // formatter: "- {value}",
                },
                // type: value,
              },
            },
            stack: "losses",
          },

          {
            name: "totals",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            // for each month quarterly budget value
            data: this.ohioTotal,
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#00aa44",
                label: {
                  show: true,
                  // fontSize: 16,
                },
              },
            },
            // stack: "sum",
          },
        ],
      };

      return option;
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  flex: 20 20 20em;
  padding: 10px;
  // div {
  border: 1px solid #000000;
  // }
}
.list-group {
  flex: 1 1 10em;
}
.list-group-item {
  background-color: #15194052;
  border-top: 1px solid #384478;
  border-radius: 0;
  color: #fff;
}
.border-none,
.border-none.list-group-item {
  border-radius: 0;
}
.item-legend {
  margin: 5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  .label {
    font-size: 20px;
  }
  .text {
    font-size: 12px;
  }
  &.active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
}
</style>
