<template>
  <div class="dashboard">
    <!-- <b-row class="pt-0">
      <b-col md="12" lg="12">
        <h2>Heatmap Data</h2>
        <last-sale> </last-sale>
      </b-col>
    </b-row>


    <four-charts3> </four-charts3>

    
    <b-row class="pt-0">
      <b-col md="12" lg="12">
        <big-bar4> </big-bar4>
      </b-col>
    </b-row> -->

    <!-- <multiple-bottom-bar> </multiple-bottom-bar> -->

    <b-row class="pt-0">
      <!-- <b-col md="12" lg="12">
        <big-bar2
          :maxSerie="30"
          :colorList="[variables.primary]"
          bgClass="bg-theme1inv"
          subtitleClass="text-muted"
          titleClass="text-secondary"
          borderClass
          textClass="text-dark"
        >
        </big-bar2>
      </b-col> -->
    </b-row>
    <b-row class="pt-0">
      <!-- <b-col xs="12" lg="4" xl="4">
        <card-bar
          mainColorName="primary"
          style="min-height: 380px"
          title="New Orders"
          iconClass="la la-credit-card"
          iconBgClass="info"
          :randomSeed="2"
          percentClass="text-danger"
          type="line"
          :seedRandom="[false, 40, false, 3, 3, 10]"
        />
      </b-col> -->
      <!-- <b-col xs="12" lg="4" xl="4">
        <card-bar
          mainColorName="primary"
          style="min-height: 380px"
          title="New Sales"
          iconClass="la la-gift"
          iconBgClass="info"
          type="bar"
          percentClass="text-info"
          xAxisType2="value"
          yAxisType2="category"
          :randomSeed="3"
        />
      </b-col> -->
      <b-col xs="12" lg="4" xl="4">
        <CardTitle
          title="A to B"
          subTitle="Quarter to Date Actual Totals"
        ></CardTitle>
        <barCTSTotal
          mainColorName="primary"
          style="min-height: 380px"
          title="New Bar Chart"
          iconBgClass="info"
          type="bar"
          :randomSeed="1"
          :lineSmooth="true"
          :ctsData="ohio"
        />
      </b-col>
      <b-col xs="12" lg="4" xl="4">
        <CardTitle title="Wins" subTitle="new customers"></CardTitle>
        <barCTS
          mainColorName="primary"
          style="min-height: 380px"
          title="New Bar Chart"
          iconBgClass="info"
          type="bar"
          :randomSeed="1"
          :lineSmooth="true"
          :ctsData="ohioNew"
        />
      </b-col>
      <!-- <b-col xs="12" lg="4" xl="4">
        <CardTitle title="Losses" subTitle="lost customers"></CardTitle>
        <barCTS
          mainColorName="primary"
          style="min-height: 380px"
          title="New Bar Chart"
          iconBgClass="info"
          type="bar"
          :randomSeed="1"
          :lineSmooth="true"
          :ctsData="ohioLost"
        />
      </b-col> -->
      <b-col xs="12" lg="4" xl="4">
        <CardTitle title="Existing" subTitle=" "></CardTitle>
        <barCTS
          mainColorName="primary"
          style="min-height: 380px"
          title="New Bar Chart"
          iconBgClass="info"
          type="bar"
          :randomSeed="1"
          :lineSmooth="true"
          :ctsData="ohioExisting"
        />
      </b-col>
      <!-- <b-col xs="12" lg="4" xl="4">
        <pie
          mainColorName="primary"
          style="min-height: 380px"
          title="something else"
          iconBgClass="info"
          type="bar2"
          :randomSeed="1"
          :lineSmooth="true"
          :ctsData="ohio"
        />
      </b-col> -->
    </b-row>
    <!-- <four-charts3> </four-charts3> -->
    <!-- <page-footer> </page-footer> -->
  </div>
</template>
<script>
import themeColors from "@@/client/util/theme/themeColors.js";
// import LastSale from '@/components/Module/Sale/Widget/LastSale'
// import LastSale from "@/components/Module/Heatmap/LastSale";
import ActiveVisitors from "@/components/Module/Chat/Widget/ActiveVisitors";
// import BigBar2 from "@/components/Module/Chart/Echarts/Bar/Widget/BigBar2";
// import BigBar4 from "@/components/Module/Chart/Echarts/Bar/Widget/BigBar4";
import CardBar from "@/components/Module/Chart/Echarts/Bar/Widget/CardBar";
import MultipleBottomBar from "@/components/Module/Chart/Echarts/Bar/Widget/MultipleBottomBar";
import RadarCard from "@/components/Module/Chart/Apex/Radar/Widget/RadarCard";
import PageFooter from "@/components/Base/Page/PageFooter";
import Stock from "@/components/Module/Product/Widget/Stock";
import FourCharts3 from "@/components/Module/Dashboard/Widget/FourCharts3";
// import Pie from "@/components/Module/Chart/Echarts/Pie/Pie1";
import BarCTS from "@/components/Module/Chart/Echarts/Bar/BarCTS";
import BarCTSTotal from "@/components/Module/Chart/Echarts/Bar/BarCTSTotal";
import CardTitle from "@/components/Base/Card/CardTitle";

export default {
  layout: "admin",
  components: {
    // LastSale,
    ActiveVisitors,
    RadarCard,
    PageFooter,
    MultipleBottomBar,
    Stock,
    CardBar,
    FourCharts3,
    // BigBar2,
    // BigBar4,
    BarCTS,
    BarCTSTotal,
    // Pie,
    CardTitle,
  },
  data() {
    return {
      ohio: [
        {
          month: "Jan",
          new: {
            "Quarter to Date Actual": { number: 2, value: 7000 },
            "Quarterly Budget": { number: 2, value: 30720 },
          },
          lost: {
            "Quarter to Date Actual": { number: 3, value: 3500 },
            "Quarterly Budget": { number: 0, value: 0 },
          },
          existing: {
            "Quarter to Date Actual": { number: 2, value: 25000 },
            "Quarterly Budget": { number: 1, value: 64280 },
          },
          totals: "more",
        },
        {
          month: "Feb",
          new: {
            "Quarter to Date Actual": { number: 2, value: 43000 },
            "Quarterly Budget": { number: 2, value: 30720 },
          },
          lost: {
            "Quarter to Date Actual": { number: 3, value: 3500 },
            "Quarterly Budget": { number: 0, value: 0 },
          },
          existing: {
            "Quarter to Date Actual": { number: 2, value: 60000 },
            "Quarterly Budget": { number: 1, value: 64280 },
          },
          totals: "more",
        },
        {
          month: "March",
          new: {
            "Quarter to Date Actual": { number: 6, value: 195000 },
            "Quarterly Budget": { number: 2, value: 30720 },
          },
          lost: {
            "Quarter to Date Actual": { number: 3, value: 3500 },
            "Quarterly Budget": { number: 0, value: 0 },
          },
          existing: {
            "Quarter to Date Actual": { number: 2, value: 95000 },
            "Quarterly Budget": { number: 1, value: 64280 },
          },
          totals: "more",
        },
      ],
    };
  },
  computed: {
    variables() {
      return themeColors(this.$store.state.theme.skin);
    },
    ohioNew() {
      return this.ohio.map((mon) => mon.new);
    },
    ohioLost() {
      return this.ohio.map((mon) => mon.lost);
    },
    ohioExisting() {
      return this.ohio.map((mon) => mon.existing);
    },
  },
};
</script>
