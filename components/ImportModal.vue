<template>
    <div :class="['modal', { 'show': showModal }]">
      <div class="close" @click.stop="dismissModal"></div>
      <textarea class="label" v-model="importString" placeholder="Paste Here!"/>
      <div v-if="importString!=''" class="import"> 
        <div class="button" @click="previewTemplates"> Preview </div>
      </div>
      <div class="preview" v-if="importedTemplates.length>0">
        <div class="template" v-for="(template,index) in importedTemplates">
          <input type="checkbox" :id="'checkbox_'+index" :value="template" v-model="selectedTemplates">
          <label class="name" :for="'checkbox_'+index">{{ template.name }}</label>
          <div class="values-container">
            <div class="value" v-for="value in template.counterItems" :style="{backgroundColor:value.color}">
              {{value.name}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTemplates.length>0" class="add"> 
        <div class="button" @click="addTemplates"> Add Selected To Templates </div>
      </div>
    </div>
</template>

<script setup lang="ts">

const importString=ref<string>("")
const importedTemplates=ref<CounterItemsTemplate[]>([])
const selectedTemplates=ref<CounterItemsTemplate[]>([])
const showModal=useShowModal()
const templates=useTemplates()
const {importTemplates,saveAsTemplate}=useCounterItemsActions()

const dismissModal=() =>{
  showModal.value = false;
  importedTemplates.value=[];
  importString.value="";
  selectedTemplates.value=[];
}

const previewTemplates=()=>{
  importedTemplates.value=importTemplates(importString.value);
}

const addTemplates=()=>{
  console.log(selectedTemplates.value);
  templates.value=[...templates.value,...selectedTemplates.value];
  saveAsTemplate();
  dismissModal();
}

</script>

<style scoped lang="sass">

.modal
  width: calc(100% - 400px)
  position: fixed
  top: -140px
  transition: all .7s ease-in-out
  left: 20px
  text-align: left
  box-shadow: 0 0 12px rgba(0,0,0,0.25)
  border-radius: 6px
  padding: 10px 12px
  background-color: $background-color-light
  color: white
  font-weight: 600
  z-index: 1
  opacity: 0
  textarea
    width: calc(100% - 40px)
    height: 100px
  .import,.add
    display: flex
    margin: 10px 0
    .button
      cursor: pointer
      margin: auto
      background-color: green
      padding: 2px 6px
      border-radius: 8px
  &.show 
    top: 20px
    opacity: 1
  .close
    cursor: pointer
    width: 24px
    height: 24px
    position: absolute
    display: block
    right: 10px
    background-image: url(~/assets/imgs/close_white.svg)
  .template
    margin-bottom: 10px
    input,.name
      cursor: pointer
    .values-container
      display: flex
      flex-wrap: wrap
      .value
        margin: 6px
        padding: 4px 16px
        border-radius: 8px
  @media (max-width: $breakpoint-tablet)
    width: calc(100% - 60px)
</style>