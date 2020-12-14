<template>
    <div id="app">
        <img alt="Vue logo" src="assets/logo.png"/>
        <div class="container">
            <div class="row mt-5 text-center">
                <div class="col-6 offset-3">
                    <a href="assets/csv-sample.csv" target="_blank">Example CSV</a>
                </div>
            </div>
            <section class="py-5">
                <div class="row mt-5">
                    <div class="col-8 offset-2">
                        <h4>Example:</h4>
                        <pre><code class="html">&lt;vue-csv-import
    v-model="csv"
    :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
&gt;
    &lt;vue-csv-toggle-headers&gt;&lt;/vue-csv-toggle-headers&gt;
    &lt;vue-csv-errors&gt;&lt;/vue-csv-errors&gt;
    &lt;vue-csv-input&gt;&lt;/vue-csv-input&gt;
    &lt;vue-csv-map :auto-match="false"&gt;&lt;/vue-csv-map&gt;
&lt;/vue-csv-import&gt;</code></pre>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-8 offset-2">
                        <h4 class="mb-4">Result:</h4>
                        <vue-csv-import
                            v-slot="{file}"
                            v-model="csv"
                            :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
                        >
                            <vue-csv-errors></vue-csv-errors>
                            <vue-csv-toggle-headers></vue-csv-toggle-headers>
                            <vue-csv-input></vue-csv-input>
                            <vue-csv-map :auto-match="false"></vue-csv-map>
                            <vue-csv-submit url="/"></vue-csv-submit>
                        </vue-csv-import>
                        <pre class="mt-15" v-if="csv"><code>{{ csv }}</code></pre>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';

    function hljsDefineVue(hljs) {
        return {
            subLanguage: "xml",
            contains: [
                hljs.COMMENT("<!--", "-->", {
                    relevance: 10,
                }),
                {
                    begin: /^(\s*)(<script>)/gm,
                    end: /^(\s*)(<\/script>)/gm,
                    subLanguage: "javascript",
                    excludeBegin: true,
                    excludeEnd: true,
                },
                {
                    begin: /^(\s*)(<script lang=["']ts["']>)/gm,
                    end: /^(\s*)(<\/script>)/gm,
                    subLanguage: "typescript",
                    excludeBegin: true,
                    excludeEnd: true,
                },
                {
                    begin: /^(\s*)(<style(\sscoped)?>)/gm,
                    end: /^(\s*)(<\/style>)/gm,
                    subLanguage: "css",
                    excludeBegin: true,
                    excludeEnd: true,
                },
                {
                    begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
                    end: /^(\s*)(<\/style>)/gm,
                    subLanguage: "scss",
                    excludeBegin: true,
                    excludeEnd: true,
                },
                {
                    begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
                    end: /^(\s*)(<\/style>)/gm,
                    subLanguage: "stylus",
                    excludeBegin: true,
                    excludeEnd: true,
                },
            ],
        };
    }

    hljsDefineVue(hljs);

    export default {
        name: "App",
        data() {
            return {
                csv: null,
            };
        },
        mounted() {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
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

code {
    background-color: #eee;
    border: 1px solid #999;
    display: block;
    padding: 20px;
}

#app .form {
    text-align: left;
}
</style>
