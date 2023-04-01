<template>
  <wrapper-echarts
    ref="chartEl"
    style="min-height: 240px"
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
    options() {
      const variablesColors = themeColors(this.$store.state.theme.skin);
      const barMaxWidth = "30%";
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
              color: "#808080",
              // shadowColor: "#ffffff",
              opacity: 0.25,
            },
          },
        },

        toolbox: {
          show: false,
        },
        legend: {
          show: true,
          data: ["Quarter to Date Actual", "Quarterly Budget"],
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "#808080",
              },
            },
          },
          { type: "value", show: false },
        ],
        series: [
          {
            name: "Quarter to Date Actual",
            type: "bar",
            data: this.ctsData.map(
              (i) => i["Quarter to Date Actual"][this.value]
            ),
            barMaxWidth: barMaxWidth,
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#0000aa",
                backgroundColor: "#ff0000",
                label: {
                  show: true,
                  position: "top",
                },
              },
            },
            barGap: "10%",
            zlevel: 1,
          },
          {
            name: "Quarterly Budget",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            data: this.ctsData.map((i) => i["Quarterly Budget"][this.value]),
            // data: [30720, 30720, 30720],
            itemStyle: {
              barBorderRadius: barBorderRadius,
              normal: {
                color: "#00aa44",
                label: {
                  show: true,
                  position: "top",
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
