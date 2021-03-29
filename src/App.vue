<template>
  <div id="app">
    <SearchPanel
    @getDataSelectSearch="onSelectSearch"
    :nameCurrency="currencyList.rates"/>
    <CurrencyList
    :list="currencyList"
    :rates="twoCurrencies"/>
    <HistoricalDataTable />
  </div>
</template>

<script>
import CurrencyList from "@/components/CurrencyList.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import HistoricalDataTable from "@/components/HistoricalDataTable.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    CurrencyList,
    SearchPanel,
    HistoricalDataTable,
  },
  data: () => ({
  }),
  mounted() {
    this.getCurrency();
  },
  computed: {
    ...mapGetters('currency', ["currencyList", "twoCurrencies"]),
  },
  methods: {
    ...mapActions("currency", ["getCurrency", "getRateTwoCurrencies", "getHistoricalCurrancyRates"]),
    onSelectSearch(values) {
      this.getRateTwoCurrencies(values);
      this.getHistoricalCurrancyRates(values);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
