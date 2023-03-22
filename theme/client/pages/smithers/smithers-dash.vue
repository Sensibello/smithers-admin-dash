
<template>
<div class="dashboard">
 <b-row class="pt-0">
        <b-col md="12"
            lg="12">
           <h2> Heatmap Data </h2>
            <last-sale> </last-sale>
        </b-col>
    </b-row>


    <four-charts3> </four-charts3>

    
    <b-row class="pt-0">
        <b-col md="12"
            lg="12">
            <big-bar4> </big-bar4>
        </b-col>
    </b-row>

    <multiple-bottom-bar> </multiple-bottom-bar>

    <b-row class="pt-0">
        <b-col md="12"
            lg="12">
             <big-bar2 :maxSerie="30"
                :colorList="[variables.primary]"
                bgClass="bg-theme1inv"
                subtitleClass="text-muted"
                titleClass="text-secondary"
                borderClass
                textClass="text-dark"> </big-bar2>
        </b-col>
    </b-row>
   <b-row class="pt-0">
        <b-col xs="12"
            lg="4"
            xl="4">
            <card-bar mainColorName="primary"
                style="min-height: 380px"
                title="New Orders"
                iconClass="la la-credit-card"
                iconBgClass="info"
                :randomSeed="2"
                percentClass="text-danger"
                type="line"
                :seedRandom="[false, 40, false, 3, 3, 10]" />

        </b-col>
        <b-col xs="12"
            lg="4"
            xl="4">

            <card-bar mainColorName="primary"
                style="min-height: 380px"
                title="New Sales"
                iconClass="la la-gift"
                iconBgClass="info"
                type="bar"
                percentClass="text-info"
                xAxisType2="value"
                yAxisType2="category"
                :randomSeed="3" />

        </b-col>
        <b-col xs="12"
            lg="4"
            xl="4">
            <card-bar mainColorName="primary"
                style="min-height: 380px"
                iconBgClass="info"
                type="line"
                :randomSeed="1"
                :lineSmooth="true" />

        </b-col>

    </b-row>
    
    <!-- <page-footer> </page-footer> -->

</div>
</template>
<script>
import themeColors from '@@/client/util/theme/themeColors.js'
// import LastSale from '@/components/Module/Sale/Widget/LastSale'
import LastSale from '@/components/Module/Heatmap/LastSale'
import ActiveVisitors from '@/components/Module/Chat/Widget/ActiveVisitors'
import BigBar2 from '@/components/Module/Chart/Echarts/Bar/Widget/BigBar2'
import BigBar4 from '@/components/Module/Chart/Echarts/Bar/Widget/BigBar4'
import CardBar from '@/components/Module/Chart/Echarts/Bar/Widget/CardBar'
import MultipleBottomBar from '@/components/Module/Chart/Echarts/Bar/Widget/MultipleBottomBar'
import RadarCard from '@/components/Module/Chart/Apex/Radar/Widget/RadarCard'
import PageFooter from '@/components/Base/Page/PageFooter'
import Stock from '@/components/Module/Product/Widget/Stock'
import FourCharts3 from '@/components/Module/Dashboard/Widget/FourCharts3'

export default {
  layout: 'admin',
  components: {
    LastSale,
    ActiveVisitors,
    RadarCard,
    PageFooter,
    MultipleBottomBar,
    Stock,
    CardBar,
    FourCharts3,
    BigBar2,
    BigBar4
  },
  computed: {
    variables () {
      return themeColors(this.$store.state.theme.skin)
    }

  }
}

</script>



