<template>
  <wrapper-echarts
    ref="chartEl"
    style="min-height: 240px"
    height="500px"
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
    months: Array,
    stateNew: Array,
    stateLost: Array,
    stateExisting: Array,
    value: {
      type: String,
      default: "value",
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
    stateNet() {
      const existingValues = this.stateExisting.map(
        (i) => i["Quarter to Date Actual"][this.value]
      );
      let newValues = this.stateNew.map(
        (i) => i["Quarter to Date Actual"][this.value]
      );
      let sum = [];
      for (let i = 0; i < existingValues.length; i++) {
        sum.push(existingValues[i] + newValues[i]);
      }
      return sum;
    },

    stateTotal() {
      let sum = [];
      let lostValues = this.stateLost.map(
        (i) => i["Quarter to Date Actual"][this.value]
      );
      for (let i = 0; i < this.stateNet.length; i++) {
        sum.push(this.stateNet[i] - lostValues[i]);
      }
      return sum;
    },

    options() {
      const variablesColors = themeColors(this.$store.state.theme.skin);
      const barMaxWidth = "25%";
      const barBorderRadius = [3, 3, 0, 0];
      let option = {
        autoPlay: true,
        playInterval: 1000,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "#808080",
              opacity: 0.25,
            },
          },
          // formatter: function (params) {
          //   var tar;

          //   if (params[1].value !== "-") {
          //     tar = params[1];
          //   } else {
          //     tar = params[0];
          //   }

          //   return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          // },
        },
        toolbox: {
          show: false,
        },
        legend: {
          show: true,
          // this data array has to match the values from the series
          data: [
            "Ohio existing",
            "Ohio new",
            // "losses adjustment",
            "losses",
            "totals",
          ],
          itemGap: 20,
        },
        xAxis: [
          {
            show: true,
            type: "category",
            axisLine: {
              showGrid: true,
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
              fontSize: 14,
              fontWeight: 500,
              color: "#202020",
            },

            data: this.months,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "",
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
              formatter: this.value === "value" ? "${value}" : "{value}",
              fontSize: 10,
              fontWeight: 500,
              color: "#202020",
            },
          },
          { type: "value", show: false },
        ],
        series: [
          {
            name: "Ohio existing",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            data: this.stateExisting.map(
              (i) => i["Quarter to Date Actual"][this.value]
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
            data: this.stateNew.map(
              (i) => i["Quarter to Date Actual"][this.value]
            ),
            barMaxWidth: barMaxWidth,
            itemStyle: {
              normal: {
                barBorderWidth: 2,
                barBorderColor: "#0000ff",
                color: "#0000aa",
                label: {
                  show: true,
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
            data: this.stateTotal,
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
            data: this.stateLost.map(
              (i) => i["Quarter to Date Actual"][this.value]
            ),
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#ff5544",
                label: {
                  show: true,
                  position: "bottom",
                  color: "#202020",
                },
              },
            },
            stack: "losses",
          },

          {
            name: "totals",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            data: this.stateTotal,
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#00aa44",
                label: {
                  show: true,
                },
              },
            },
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
  border: 1px solid #202020;
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
