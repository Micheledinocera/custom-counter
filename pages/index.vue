<template>
    <div class="content">
        <CounterContainer @click="disableDeleteMode"/>
    </div>
</template>

<script setup lang="ts">
useHead({
    title:'Custom Counter'
})

const {disableDeleteMode}=useDeleteModeActions();
</script>