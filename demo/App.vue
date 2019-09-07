<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png"/>
        <div class="container">
            <div class="row mt-5 text-center">
                <div class="col-6 offset-3">
                    <a href="./csv-sample.csv" target="_blank">Example CSV</a>
                </div>
            </div>
            <section class="py-5">
                <div class="row mt-5">
                    <div class="col-8 offset-2">
                        <h4>Source:</h4>
                        <pre><code>&lt;vue-csv-import v-model="csv" :map-fields="['name', 'age']"&gt;&lt;/vue-csv-import&gt;</code></pre>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-8 offset-2">
                        <h4 class="mb-4">Result:</h4>
                        <vue-csv-import v-model="csv" :map-fields="['name', 'age']"></vue-csv-import>
                        <div class="mt-2">
                            {{ csv }}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                csv: null,
            };
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .container {
        text-align: left;
    }

    pre code {
        background-color: #eee;
        border: 1px solid #999;
        display: block;
        padding: 20px;
    }

    #app .form {
        text-align: left;
    }
</style>
