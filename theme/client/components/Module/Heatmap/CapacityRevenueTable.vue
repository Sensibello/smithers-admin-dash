
<template>
<b-card no-body
    class="mb-0">
    <b-card-header>
        <card-title title="PDS"
            subTitle="Capacity, Revenue, EBIT"> </card-title>
    </b-card-header>
    <b-card-body>
        <div class="card-table  table-responsive mb-0">
            <table class="table table-sm table-hover align-middle h-100">
                 <thead class="thead-light">
                      <tr>
                          <th class="text-center">Location</th>
                          <th class="text-center">Capacity</th>
                          <th class="text-center">Break-even revenue</th>
                          <th class="text-center">On Time Delivery</th>
                          <th class="text-center">Projected Revenue (current)</th>
                          <th class="text-center">Projected EBIT (current)</th>
                          <th class="text-center">Projected Revenue (+1 month)</th>
                          <th class="text-center">Projected EBIT (+1 month)</th>
                         <th class="text-center">Projected Revenue (+2 month)</th>
                          <th class="text-center">Projected EBIT (+2 month)</th>
                          
                      </tr>
                  </thead>
                  <thead class="thead-light">
                      <tr>
                          <th class="text-center"></th>
                          <th class="tiny-text text-center">Monthly; Sufficient but not excessive to cover next 3mth Revenues</th>
                          <th class=" tiny-text text-center"> less than 80% of capacity</th>
                          <th class="tiny-text  text-center">at least 90%</th>
                          <th class="text-center"></th>
                          <th class="text-center"></th>
                          <th class="text-center"></th>
                          <th class="text-center"></th>
                         <th class="text-center"></th>
                          <th class="text-center"></th>
                          
                      </tr>
                  </thead>
                <tbody class>
                    <tr v-for="sale in sales"
                        :key="sale.id">
                    
                        <td class="align-middle  text-center font-weight-bold d-none d-sm-table-cell">
                            {{sale.name}}
                        </td>
                        <td class="text-center d-none align-middle">
                            <b-badge :variant="sale.variantState"
                                class="ig-badge inverse">{{sale.textState}}</b-badge>
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.breakeven}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.capacity}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.otd}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.curProjRev}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.curProjEbit}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.projRev1}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.projEbit1}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.projRev2}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.projEbit2}}
                        </td>
                      
                    </tr>

                </tbody>
                <!-- <tfoot>
                    <tr>
                        <th>Customer</th>
                        <th class="d-none d-sm-table-cell">Email</th>
                        <th class="text-center">Status</th>

                        <th class="text-right  d-none d-sm-table-cell">Total</th>
                    </tr>
                </tfoot> -->
            </table>
        </div>

    </b-card-body>
    <b-card-footer class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">
        <!-- <div class="flex-grow-1">
            <card-pagination class="justify-content-center justify-content-sm-start"> </card-pagination>

        </div> -->
        <b-button-group class="my-2 justify-content-center justify-content-sm-start">
            <b-button @click="currentIdx=0"
                :variant="currentIdx == 0 ? 'theme1' : 'link'"
                :class="currentIdx == 0 ? 'inverse' : ''">SAFE</b-button>
            <b-button @click="currentIdx=1"
                :variant="currentIdx == 1 ? 'theme1' : 'link'"
                :class="currentIdx == 1 ? 'inverse' : ''">CLOSE</b-button>
            <b-button @click="currentIdx=2"
                :variant="currentIdx == 2 ? 'theme1' : 'link'"
                :class="currentIdx == 2 ? 'inverse' : ''">PROBLEM </b-button>
        </b-button-group>
    </b-card-footer>

</b-card>
</template>
<script>
// import faker from 'faker'
import CardTitle from '@/components/Base/Card/CardTitle'
import CardPagination from '@/components/Base/Card/CardPagination'

/*
Show last created oders
*/
export default {
  components: {
    CardTitle,
    CardPagination
  },

  data () {
    return {
      sales: [
        {
          name: "GBG Sample Analysis",
          capacity: "$1,086,434",
          breakeven: "$840,000",
          otd: "43.0%",
          curProjRev: "$840,000",
          curProjEbit: "0",
          projRev1: "$860,000",
          projEbit1: "$20,000",
          projRev2: "$880,000",
          projEbit2: "$40,000",
          variantState: "",
          textState: "",
          
        },
        {
          name: "GBG MD",
          capacity: "$200,000",
          breakeven: "$196,000",
          otd: "71.4%",
          curProjRev: "$200,000",
          curProjEbit: "$4,000",
          projRev1: "$200,000",
          projEbit1: "$4,000",
          projRev2: "$200,000",
          projEbit2: "$4,000",
          variantState: "",
          textState: "",
          
        },
        {
          name: "GBG Total",
          capacity: "$1,286,434",
          breakeven: "$1,036,000",
          otd: "48.6%",
          curProjRev: "$1,040,000",
          curProjEbit: "$4,000",
          projRev1: "$1,060,000",
          projEbit1: "$24,000",
          projRev2: "$1,080,000",
          projEbit2: "$44,000",
          variantState: "",
          textState: "",
          
        },
        {
          name: "Ewing, NJ",
          capacity: "$360,000",
          breakeven: "$422,000",
          otd: "100.0%",
          curProjRev: "$255,000",
          curProjEbit: "-$167,000",
          projRev1: "$330,000",
          projEbit1: "-$92,000",
          projRev2: "$330,000",
          projEbit2: "-$92,000",
          variantState: "",
          textState: "",
        },
        {
          name: "Region Total",
          capacity: "$1,646,434",
          breakeven: "$1,458,000",
          otd: "-",
          curProjRev: "$1,295,000",
          curProjEbit: "-$163,000",
          projRev1: "$1,390,000",
          projEbit1: "-$68,000",
          projRev2: "$1,410,000",
          projEbit2: "-$48,000",
          variantState: "",
          textState: "",
          
        },

      ],
      currentIdx: 0,
      checked: true
    }
  },

  // created () {
  //   faker.seed(6)
  //   const arrVariants = ['primary', 'primary', 'success', 'danger', 'danger']
  //   const arrTexts = ['Finished', 'Finished', 'Paid', 'Canceled', 'Canceled']

  //   for (let i of [0, 1, 2, 3, 4]) {
  //     const firstName = faker.name.firstName()
  //     this.sales.push({
  //       id: i,
  //       name: firstName + ' ' + faker.name.lastName(),
  //       email: firstName.toLowerCase() + '@company.com',
  //       jobTitle: faker.commerce.department(),
  //       created: faker.date.recent(),
  //       total: faker.random.number({
  //         min: 60,
  //         max: 400
  //       }),
  //       variantState: arrVariants[i],
  //       textState: arrTexts[i]
  //     })
  //   }
  // }

}

</script>


<style lang="scss" scoped>

.tiny-text {
  font-size: 8px;
}
.round i {
  height: 50px;
  width: 50px;
  font-size: 25px;
}

.table {
  margin-bottom: 0rem !important;

  th {
    border-color: transparent !important;
  }

  th:first-child {
    border-radius: 4px 0;
  }
  th:last-child {
    border-radius: 0 4px 0;
  }
}

tfoot th {
  color: var(--theme1-mixed-1);
}

</style>


