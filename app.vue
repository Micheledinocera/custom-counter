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
const templates=useTemplates();
const {selectTemplate}=useCounterItemsActions()


onMounted(()=>{
  const localStorageTemplates=localStorage.getItem("templates")
  if(localStorageTemplates && JSON.parse(LZString.decompressFromEncodedURIComponent(localStorageTemplates || "")).length>0){
    templates.value=JSON.parse(LZString.decompressFromEncodedURIComponent(localStorageTemplates || "")) as CounterItemsTemplate[]
    selectTemplate(0);
  }
})
</script>

<style scoped lang="sass">
#layout-container
  &:deep(#layout-content)
    height: calc(100vh - 2*$base-height)
    background-color: $background-color-light
</style>