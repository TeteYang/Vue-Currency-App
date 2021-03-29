<template>
<v-app id="inspire">
  <v-container>
    <v-card class="card" v-if="newData">
      <v-col class="card-currency">
        <v-row class="
        container-variables
        mb-4
        d-flex
        justify-center
        " v-if="switch1">
         {{currValue}} {{correctlyCurr}}
        </v-row>
        <v-row class="
        container-variables
        mb-4
        d-flex
        justify-center" v-else>
         {{correctlyCurr}}
        </v-row>
        <v-col class="btns-active d-flex flex-md-column">
        <!-- <v-date-picker v-model="picker"></v-date-picker> -->
        <v-row class="justify-center">
          <v-btn
            class="mr-4"
            color="warning"
            small
          >
            Add
          </v-btn>
          <v-btn
          color="error"
          small>
            Remove
          </v-btn>
        </v-row>
        <v-row>
          <v-btn
            class="mr-4 mt-md-2"
            color="primary"
            small
          >
          Calendar
          </v-btn>
        </v-row>
        <v-row class="
        justify-center
        align-center">
          <v-switch
            v-model="switch1"
          ></v-switch>
        </v-row>
        </v-col>
      </v-col>
      <v-col class="container-current">
      <v-row class="container-current__rows" v-for="(current, index) in dataList" :key="index">
        <v-col class="index">{{index}}</v-col>
        <v-col class="values" v-if="switch1">{{current}}</v-col>
        <v-col class="values" v-else>
          {{ Number(((1*100*1)/(100*(100*current))*100).toFixed(3)) }}
        </v-col>
      </v-row>
      </v-col>
      </v-card>
      <v-card class="anotherCard" v-else>
        <CurrencyListAnother :rates="rates" />
      </v-card>
  </v-container>
</v-app>
</template>

<script>
import CurrencyListAnother from "@/components/CurrencyListAnother.vue";

export default {
  name: "CurrencyList",
  components: {
    CurrencyListAnother,
  },
  data: () => ({
    currency: {},
    nameCur: "RUB",
    currValue: 1,
    switch1: true,
    picker: new Date().toISOString().substr(0, 10),
  }),
  props: {
    list: {
      type: Object,
      default: () => ({})
    },
    rates: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    dataList() {
      const {USD, EUR, GBP, INR, CAD} = this.list;
      const obj = {
        USD,
        EUR,
        GBP,
        INR,
        CAD,
      }
      return this.$set(this.currency, Object.keys(this.list).length, obj);
    },
    newData() {
      return Object.keys(this.rates).length == 0;
    },
    correctlyCurr() {
      return this.rates.base || this.nameCur;
    },
  }
}
</script>

<style scoped>
  .card{
    display: flex;
  }
  .card-currency {
    border-right: outset;
    max-width: 30vw;
  }
  .container-variables {
    font-size: 23px;
    font-weight: 700;
    color: rgb(26,51,128);
  }
  .index {
    font-size: 23px;
    font-weight: 700;
    color: rgb(26,51,128);
  }
  .values {
    font-size: 18px;
    font-weight: 500;
    color: rgb(26,51,128);
  }
  .btns-active{
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .container-current{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .container-current__rows {
    flex-direction: column;
  }
  .anotherCard {
    height: 35vh;
  }
</style>