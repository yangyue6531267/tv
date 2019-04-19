<template>
    <div >
        <img src="../../../static/images/loading.png" alt="加载" style="-webkit-animation:video_loading 3s infinite linear;"/>
    </div>
</template>

<script>
export default {
  name: 'LoadingAnim'
}
</script>

<style scoped>
    @import "../../../static/css/player.css";
    /* @keyframes loading {
        0% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loading {
        0% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
    }

    #loading {
        text-align: center;
        transform-origin: center center;
        -webkit-transform-origin: center center;
        animation: loading 2s infinite linear;
        -webkit-animation: loading 2s infinite linear;
    } */
</style>
