<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    html, body {
        height: 100%;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 14px;
        background-color: @app-bg-color;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
