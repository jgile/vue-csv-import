<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <div class="container">
            <div class="row">
                <div class="col-6 offset-3">
                    <form class="form">
                        <vue-csv-import v-model="csv" ref="importer" :map-fields="['date', 'name']"></vue-csv-import>
                    </form>
                    {{ csv }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import VueCsvImport from './components/VueCsvImport.vue';

  export default {
    name: 'app',
    components: {
      VueCsvImport
    },
    data() {
      return {
        csv: null,
      };
    }
  };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #app .container {
        text-align: left;
    }
</style>
