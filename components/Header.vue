<template>
    <div class="header">
        <div class="title"> Custom Counter </div>
        <div class="list icon" @click="showPanel=!showPanel"> </div>
    </div>
</template>

<script setup lang="ts">
const showPanel=useShowPanel()
</script>

<style scoped lang="sass">
.header
    @include header-row
    display: flex
    .list
        @include background-standard
        background-image: url('~/assets/imgs/list.svg')
        width: 20px
        height: 20px
        position: absolute
        right: 20px
        cursor: pointer
</style>
