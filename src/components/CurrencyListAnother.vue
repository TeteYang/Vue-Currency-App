<template>
    <v-col class="anotherCard__box">
      <v-row class="num-base">{{rates.num}} {{rates.base}} = </v-row>
      <v-row class="big-numFrom">
        {{(rates.numFrom*rates.num).toFixed(3)}} {{rates.to}}
      </v-row>
      <div class="mini">
        <v-row>
          {{currValue}} {{rates.to}}
          {{ Number(((1*100*1)/(100*(100*rates.numFrom))*100).toFixed(3)) }}
          {{rates.base}}
        </v-row>
        <v-row>
          {{currValue}} {{rates.base}}
          {{ rates.numFrom }}
          {{rates.to}}
        </v-row>
      </div>
    </v-col>
</template>

<script>
export default {
  name: "CurrencyListAnother",
  data: () => ({
    currValue: 1,
  }),
  props: {
    rates: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style scoped>
  .anotherCard__box{
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin: 0 auto;
    align-items: center;
  }
  .num-base {
    font-size: 2.4rem;
    padding-right: 5px;
    color: rgb(26,51,128);
  }
  .big-numFrom {
    font-size: 67px;
    color: rgb(26,51,128);
  }
  .mini {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: rgb(26,51,128);
  }
</style>
