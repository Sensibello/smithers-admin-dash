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
      const barMaxWidth = 12;
      const barBorderRadius = [3, 3, 0, 0];

      let option = {
        // color: colors,
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

        grid: {
          bottom: 0,
          right: 0,
          left: "32px",
          top: "22px",
          show: false,
        },
        toolbox: {
          show: false,
        },
        legend: {
          show: false,
          data: ["Quarter to Date Actual", "Quarterly Budget"],
        },
        xAxis: [
          {
            show: false,
            type: "category",

            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
            },

            data: ["Jan", "Feb", "Mar"],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Sale",

            min: 0,
            max: 100000,
            show: false,
            showGrid: false,
            splitLine: {
              show: false,
            },
            position: "left",

            axisLabel: {
              formatter: "{value} $",
            },
          },
          {
            type: "value",
            name: "Lead",
            min: 0,
            max: 100000,
            show: false,
            position: "right",
            // offset: 80,
            axisLabel: {
              formatter: "{value} Win Ratio",
            },
          },
          {
            type: "value",
            name: "Unit",
            min: 0,
            max: 100000,

            position: "left",
            splitLine: {
              show: true,
              lineStyle: {
                color: variablesColors.variantsObj.theme1.mixed,
                type: "dashed",
              },
            },
            axisLine: {
              showGrid: false,
              lineStyle: {
                color: variablesColors.variantsObj.secondary["mixed"],
              },
            },
            axisLabel: {
              // formatter: '${value}',
              fontSize: 13,
              fontWeight: 500,
              color: variablesColors.variantsObj.secondary["mixed-1"],
            },
          },
        ],
        series: [
          {
            name: "Quarter to Date Actual",
            type: "bar",
            // for each month quarter to date  value
            data: this.ctsData.map((i) => i["Quarter to Date Actual"].value),
            barMaxWidth: barMaxWidth,
            itemStyle: {
              barBorderRadius: barBorderRadius,
              color: variablesColors.variantsObj.primary["base"],
            },

            barGap: "-40%",
            zlevel: 1,
          },
          {
            name: "Quarterly Budget",
            type: "bar",
            barMaxWidth: barMaxWidth,
            yAxisIndex: 1,
            // for each month quarterly budget value
            data: this.ctsData.map((i) => i["Quarterly Budget"].value),
            itemStyle: {
              barBorderRadius: barBorderRadius,
              color: variablesColors.variantsObj.theme1["mixed-1"],
            },
          },
          // {
          //   name: "Conversion Rate",
          //   type: "line",
          //   yAxisIndex: 2,
          //   data: [
          //     20, 22, 33, 45, 63, 102, 217, 234, 190, 125, 70, 90, 65, 55, 60,
          //     42, 50, 35, 36, 37, 18, 39,
          //   ],
          //   itemStyle: {
          //     color: variablesColors.variantsObj.theme1["mixed-1"],
          //   },
          // },
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
