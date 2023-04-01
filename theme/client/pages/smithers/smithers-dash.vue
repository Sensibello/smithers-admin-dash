<template>
  <div class="dashboard">
    <b-row class="pt-0">
      <b-col md="12" lg="12">
        <h2 class="mt-2 pb-5 text-center">Heatmap Data</h2>
        <win-table> </win-table>
      </b-col>
    </b-row>

    <four-charts3> </four-charts3>

    <b-row class="pt-0">
      <b-col md="12" lg="12">
        <big-bar4> </big-bar4>
      </b-col>
    </b-row>

    <b-row class="pt-0">
      <b-col md="12" lg="12">
        <capacity-revenue-table> </capacity-revenue-table>
      </b-col>
    </b-row>

    <!-- <multiple-bottom-bar> </multiple-bottom-bar> -->

    <b-row class="m-auto d-block pt-0">
      <b-col md="12" lg="12">
        <Card title="A to B" subTitle="Quarter to Date Actual Totals">
          <barCTSTotal
            mainColorName="primary"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="ohio"
            height="500px"
            :months="monthRange"
            :stateNew="stateNew"
            :stateLost="stateLost"
            :stateExisting="stateExisting"
          />
        </Card>
      </b-col>
      <b-col md="12" lg="12">
        <Card
          title="A to B"
          subTitle="Quarter to Date Actual Totals in Numbers"
        >
          <barCTSTotal
            mainColorName="primary"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="ohio"
            height="500px"
            :months="monthRange"
            :stateNew="stateNew"
            :stateLost="stateLost"
            :stateExisting="stateExisting"
            value="number"
          />
        </Card>
      </b-col>
      <b-col md="12" lg="12">
        <Card title="Projected" subTitle="QTD Revenues">
          <barCTS
            mainColorName="primary"
            style="min-height: 380px"
            title="projected qtd"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="stateProjected"
            :months="monthRange"
          />
        </Card>
      </b-col>
      <FourCharts>
        <Card class="col-md-6 col-sm-6" title="Wins" subTitle="new customers">
          <barCTS
            mainColorName="primary"
            style="min-height: 380px"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="stateNew"
            :months="monthRange"
          />
        </Card>
        <Card
          class="col-md-6 col-sm-6"
          title="Wins"
          subTitle="new customers in numbers"
        >
          <barCTS
            mainColorName="primary"
            style="min-height: 380px"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="stateNew"
            :months="monthRange"
            value="number"
          />
        </Card>
        <Card
          class="col-md-6 col-sm-6"
          title="Existing"
          subTitle="existing customers in value"
        >
          <barCTS
            mainColorName="primary"
            style="min-height: 380px"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="stateExisting"
            :months="monthRange"
          />
        </Card>
        <Card
          class="col-md-6 col-sm-6"
          title="Existing"
          subTitle="existing customers in numbers"
        >
          <barCTS
            mainColorName="primary"
            style="min-height: 380px"
            title="New Bar Chart"
            iconBgClass="info"
            type="bar"
            :lineSmooth="true"
            :ctsData="stateExisting"
            :months="monthRange"
            value="number"
          />
        </Card>
      </FourCharts>
    </b-row>
    <!-- <four-charts3> </four-charts3> -->
    <!-- <page-footer> </page-footer> -->
  </div>
</template>
<script>
import themeColors from "@@/client/util/theme/themeColors.js";
// import LastSale from '@/components/Module/Sale/Widget/LastSale'
import WinTable from "@/components/Module/Heatmap/WinTable";
import CapacityRevenueTable from "@/components/Module/Heatmap/CapacityRevenueTable";
import ActiveVisitors from "@/components/Module/Chat/Widget/ActiveVisitors";
// import BigBar2 from "@/components/Module/Chart/Echarts/Bar/Widget/BigBar2";
import BigBar4 from "@/components/Module/Chart/Echarts/Bar/Widget/BigBar4";
import CardBar from "@/components/Module/Chart/Echarts/Bar/Widget/CardBar";
import MultipleBottomBar from "@/components/Module/Chart/Echarts/Bar/Widget/MultipleBottomBar";
import RadarCard from "@/components/Module/Chart/Apex/Radar/Widget/RadarCard";
import PageFooter from "@/components/Base/Page/PageFooter";
import Stock from "@/components/Module/Product/Widget/Stock";
import FourCharts3 from "@/components/Module/Dashboard/Widget/FourCharts3";
// import Pie from "@/components/Module/Chart/Echarts/Pie/Pie1";

// jd's modules
import FourCharts from "@/components/Module/Heatmap/FourCharts";
import BarCTS from "@/components/Module/Heatmap/BarCTS";
import BarCTSTotal from "@/components/Module/Heatmap/BarCTSTotal";
import Card from "@/components/Module/Heatmap/Card";
import CardTitle from "@/components/Base/Card/CardTitle";

export default {
  layout: "admin",
  components: {
    WinTable,
    ActiveVisitors,
    CapacityRevenueTable,
    RadarCard,
    PageFooter,
    MultipleBottomBar,
    Stock,
    CardBar,
    FourCharts3,
    // BigBar2,
    BigBar4,
    // Pie,
    FourCharts,
    BarCTS,
    BarCTSTotal,
    Card,
    CardTitle,
  },
  data() {
    return {
      ohio: [
        {
          month: "Jan",
          data: {
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
            projected: {
              "Quarter to Date Actual": {
                value: 99500,
              },
              "Quarterly Budget": { value: 99500 },
            },
          },
          totals: "more",
        },
        {
          month: "Feb",
          data: {
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
            projected: {
              "Quarter to Date Actual": {
                value: 99500,
              },
              "Quarterly Budget": { value: 99500 },
            },
          },
          totals: "more",
        },
        {
          month: "Mar",
          data: {
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
            projected: {
              "Quarter to Date Actual": { value: 286500 },
              "Quarterly Budget": { value: 99500 },
            },
          },
          totals: "more",
        },
        // {
        //   month: "Apr",
        //   data: {
        //     projected: {
        //       "Quarter to Date Actual": 114000,
        //       "Quarterly Budget": 208000,
        //     },
        //   },
        // },
        // {
        //   month: "May",
        //   data: {
        //     projected: {
        //       "Quarter to Date Actual": 358000,
        //       "Quarterly Budget": 208000,
        //     },
        //   },
        // },
        // {
        //   month: "Jun",
        //   data: {
        //     projected: {
        //       "Quarter to Date Actual": 575000,
        //       "Quarterly Budget": 208000,
        //     },
        //   },
        // },
      ],
    };
  },
  computed: {
    variables() {
      return themeColors(this.$store.state.theme.skin);
    },
    stateNew() {
      return this.ohio.map((mon) => mon.data.new);
    },
    stateLost() {
      return this.ohio.map((mon) => mon.data.lost);
    },
    stateExisting() {
      return this.ohio.map((mon) => mon.data.existing);
    },
    stateProjected() {
      return this.ohio.map((mon) => mon.data.projected);
    },
    monthRange() {
      return this.ohio.map((mon) => mon.month);
    },
  },
};
</script>
