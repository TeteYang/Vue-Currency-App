import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializedResponse(rub) {
  console.log(rub);
  const currency = {
    Data: rub.date,
    EUR: Number(rub.rates.EUR.toFixed(3)),
    USD: Number(rub.rates.USD.toFixed(3)),
    GBP: Number(rub.rates.GBP.toFixed(3)),
    INR: Number(rub.rates.INR.toFixed(3)),
    CAD: Number(rub.rates.CAD.toFixed(3)),
    rates: Object.keys(rub.rates),
  }
  return currency;
}

function serializedResponseBase({data}, to, num) {
  const {rates, base} = data;
  const item = Object.keys(rates).filter(item => item === to);
  const obj = {
    numFrom: Number(rates[item]).toFixed(5),
    base: base,
    num: num,
    to: to,
  };
  return obj;
}

const { CURRENCY_LIST, TWO_CURRENCY, HISTORY_CURRENCY } = mutations;

const storeCurrency = {
  namespaced: true,
  state: {
    list: {},
    currencies: {},
    historicalData: {},
  },
  getters: {
    currencyList: ({ list }) => list,
    twoCurrencies: ({currencies}) => currencies,
    historicalList: ({historicalData}) => historicalData,
  },
  mutations: {
    [CURRENCY_LIST](state, value) {
      state.list = value;
    },
    [TWO_CURRENCY](state, item) {
      state.currencies = item;
    },
    [HISTORY_CURRENCY](state, story) {
      state.historicalData = story;
    }
  },
  actions: {
    async getCurrency({commit}) {
      try {
        const requestRUB = axios.get("latest?base=RUB");
        const responseRUB= await requestRUB.then(post=> {
          const {data} = post;
          return data;
        });
        const currency = serializedResponse(responseRUB);
        commit(CURRENCY_LIST, currency);
      } catch (err) {
        console.log(err);
      }
    },
    async getRateTwoCurrencies({commit}, {from, to, name}) {
      try {
        const requestBase = axios.get(`latest?base=${from}`);
        const responseBase = await requestBase.then(post => post);
        const basedCurrencyResult = serializedResponseBase(responseBase, to, name);
        commit(TWO_CURRENCY, basedCurrencyResult);
        // dispatch("getCurrency");
      } catch(err) {
        console.log(err);
      }
    },
    async getHistoricalCurrancyRates({commit}, value) {
      try{
        const request = axios.get("history?start_at=2018-01-01&end_at=2018-09-01&symbols=ILS,JPY");
        const response = await request.then(post => post);
        console.log(response);
        commit(HISTORY_CURRENCY, value);
      } catch(err) {
        console.log(err);
      }
    }
  }
};

export default storeCurrency;
