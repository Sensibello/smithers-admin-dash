
<template>
<b-card no-body
    class="mb-0">
    <b-card-header>
        <card-title title="PDS"
            subTitle="Wins, hit rate, backlog"> </card-title>
    </b-card-header>
    <b-card-body>
        <div class="card-table  table-responsive mb-0">
            <table class="table table-sm table-hover align-middle h-100">
                 <thead class="thead-light">
                      <tr>
                          <th class="text-center">Location</th>
                          <th class="text-center">Wins YTD</th>
                          <th class="text-center">Hit rate </th>
                          <th class="text-center">A&B Funnel</th>
                          <th class="text-center">Total Unrestricted Backlog</th>
                          <th class="text-center">Unrestricted non-FTE Backlog</th>
                          <th class="text-center">Unrestricted FTE Backlog</th>
                          <th class="text-center">Restricted non-FTE Backlog</th>
                          <th class="text-center">Restricted FTE Backlog</th>
                          <th class="text-center">Total Backlog</th>
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
                            ${{sale.winsYtd}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            {{sale.hitRate}}%
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.abFunnel}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.totalUnrestricted}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.unrestrictedNonFte}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.unrestrictedFte}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.restrictedNonFteBacklog}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.restrictedFteBacklog}}
                        </td>
                        <td class="align-middle text-center d-none d-sm-table-cell">
                            ${{sale.totalRestrictedBacklog}}
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
          winsYtd: "19,562,000",
          hitRate: "100.0",
          abFunnel: "27,552,000",
          totalUnrestricted: "1,465,000",
          unrestrictedNonFte: "1,111,000",
          unrestrictedFte: "354,000",
          restrictedNonFteBacklog: "70,541,000",
          restrictedFteBacklog: "1,062,000",
          totalRestrictedBacklog: "71,603,000",
          variantState: "1",
          textState: "Safe",
          
        },
        {
          name: "GBG MD",
          winsYtd: "2,373,000",
          hitRate: "100.0",
          abFunnel: "789,000",
          totalUnrestricted: "420,000",
          unrestrictedNonFte: "420,000",
          unrestrictedFte: "0",
          restrictedNonFteBacklog: "100,000",
          restrictedFteBacklog: "0",
          totalRestrictedBacklog: "100,000",
          variantState: "1",
          textState: "Safe",
          
        },
        {
          name: "GBG Total",
          winsYtd: "21,935,000",
          hitRate: "100.0",
          abFunnel: "28,341,000",
          totalUnrestricted: "1,885,000",
          unrestrictedNonFte: "1,531,000",
          unrestrictedFte: "354,000",
          restrictedNonFteBacklog: "70,641,000",
          restrictedFteBacklog: "1,062,000",
          totalRestrictedBacklog: "71,703,000",
          variantState: "1",
          textState: "Safe",
          
        },
        {
          name: "Ewing, NJ",
          winsYtd: "5,810,000",
          hitRate: "100.0",
          abFunnel: "2,694,000",
          totalUnrestricted: "250,000",
          unrestrictedNonFte: "199,400",
          unrestrictedFte: "50,600",
          restrictedNonFteBacklog: "2,348,218",
          restrictedFteBacklog: "151,800",
          totalRestrictedBacklog: "2,500,018",
          variantState: "2",
          textState: "Close",
          
        },
        {
          name: "Region Total",
          winsYtd: "27,748,000",
          hitRate: "100.0",
          abFunnel: "31,037,000",
          totalUnrestricted: "2,385,000",
          unrestrictedNonFte: "2,129,000",
          unrestrictedFte: "404,600",
          restrictedNonFteBacklog: "72,989,218",
          restrictedFteBacklog: "1,213,800",
          totalRestrictedBacklog: "74,203,018",
          variantState: "2",
          textState: "Safe",
          
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


