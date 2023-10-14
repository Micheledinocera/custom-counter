<template>
    {{runtimeConfig.public.BASE_URL}}
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

useHead({
    title:'Custom Counter'
})
</script>