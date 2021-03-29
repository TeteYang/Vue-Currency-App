<template>
  <div>
  <v-app id="inspire">
  <form>
    <v-container class="container">
    <v-row>
    <v-col>
    <v-text-field
      v-model="name"
      dark
      :error-messages="nameErrors"
      :counter="5"
      label="Indicate the quantity"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    </v-col>
    <v-col>
    <v-select
      v-model="selectFrom"
      dark
      :items="nameCurrency"
      :error-messages="selectErrors"
      key="1"
      label="From"
      required
      @change="$v.selectFrom.$touch()"
      @blur="$v.selectFrom.$touch()"
    ></v-select>
    </v-col>
    <v-col>
    <v-select
      v-model="selectTo"
      dark
      :items="nameCurrency"
      :error-messages="selectErrors"
      key="2"
      label="To"
      required
      @change="$v.selectTo.$touch()"
      @blur="$v.selectTo.$touch()"
    ></v-select>
    </v-col>
    </v-row>
    <v-row>
    <v-col>
    <v-btn
      class="mr-4"
      @click="submit"
      color="success"
    >
      submit
    </v-btn>
    <v-btn
    @click="clear"
    color="error">
      clear
    </v-btn>
    </v-col>
    </v-row>
    </v-container>
  </form>
</v-app>
    <v-snackbar v-model="snackbar"
      :timeout="-1"
      absolute
      right
      rounded="pill"
      top
    >
      {{submitStatus}}
      <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        X
      </v-btn>
    </template>
    </v-snackbar>
  </div>
</template>

<script>
import { required, maxLength, numeric } from 'vuelidate/lib/validators';

export default {
  name: "SearchPanel",
  props: {
    nameCurrency: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    name: '',
    selectFrom: null,
    selectTo: null,
    submitStatus: null,
    snackbar: false,
  }),
  validations: {
  name: { required, maxLength: maxLength(5), numeric },
  selectFrom: { required },
  selectTo: { required },
},
  methods: {
  submit () {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR. Please fill out the form correctly';
      this.snackbar = true;
    } else {
      const dataSelect = {
        name: this.name,
        from: this.selectFrom,
        to: this.selectTo,
    };
    this.$emit('getDataSelectSearch', dataSelect);
    this.submitStatus = 'Thanks you. The form is filled out correctly';
    this.snackbar = true;
    this.$v.$reset();
    this.name = '';
    this.selectFrom = null;
    this.selectTo = null;
    }
  },
  clear () {
    this.$v.$reset();
    this.name = '';
    this.selectFrom = null;
    this.selectTo = null;
  },
},
computed: {
  selectErrors () {
    const errors = []
    if (!this.$v.selectFrom.$dirty && !this.$v.selectTo.$dirty) return errors
    !this.$v.selectFrom.required && !this.$v.selectTo.required && errors.push('Item is required');
    return errors;
  },
  nameErrors () {
    const errors = []
    if (!this.$v.name.$dirty) return errors
    !this.$v.name.maxLength && errors.push('Name must be at most 5 characters long');
    !this.$v.name.required && errors.push('Name is required.');
    !this.$v.name.numeric && errors.push("Only numbers");
    return errors;
  },
}
}
</script>

<style scoped>
  #inspire{
    max-height: 35vh;
    background-image: url("../assets/images/exchange.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 45px 0 0 0;
  }
  .container {
    background-color: rgb(16,54,129, 0.9);
    border-radius: 20px;
    padding: 20px;
  }
</style>