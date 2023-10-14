<template>
    <!-- {{runtimeConfig.public.BASE_URL}} -->
    <!-- {{ isDevice(DEVICES.desktop)?'desktop':'capocchia' }} -->
    <div class="content">
        <CounterContainer />
        <!-- <Footer /> -->
    </div>
</template>

<script setup lang="ts">
useHead({
    title:'Custom Counter'
})

</script>

<style scoped labg="sass"> </style>