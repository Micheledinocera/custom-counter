<template>
  <div id="layout-container">
    <NuxtLayout>
      <NuxtScrollbar id="layout-content">  
        <NuxtPage/>
      </NuxtScrollbar >
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
usePreventReload()
</script>

<style scoped lang="sass">
#layout-container
  &:deep(#layout-content)
    height: calc(100vh - $base-height)
    background-color: $primary-color-light
</style>