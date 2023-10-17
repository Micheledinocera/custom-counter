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
  if(localStorage.getItem("templates") && JSON.parse(localStorage.getItem("templates") || "").length>0){
    templates.value=JSON.parse(localStorage.getItem("templates") || "") as CounterItemsTemplate[]
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