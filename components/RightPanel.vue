<template>
    <div :class="['panel-overlay',{show:showPanel}]" @click="()=>showPanel=false">
        <div class="panel-container" @click.stop="">
            <div class="actions">
                <div class="save-template" @click="saveAsTemplate"> Save as Template </div>
                <div class="new-template" @click="newTemplate"> New Template </div>
            </div>
            <div class="templates-container">
                <div :class="['template-item',{selected:index==templateIndex}]" v-for="(template,index) in templates" @click="()=>selectTemplate(index)">
                    <div class="name-container">
                        <div class="name"> {{template.name}} </div>
                        <div class="remove" @click.stop="()=>{removeTemplate(templateIndex)}"> X </div>
                    </div>
                    <div class="counters"> {{template.counterItems.length}} Counters </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const showPanel=useShowPanel()
const templates=useTemplates()
const templateIndex=useTemplateIndex()
const {saveAsTemplate,newTemplate,selectTemplate,removeTemplate}=useCounterItemsActions()
</script>

<style scoped lang="sass">
$panel-width:300px
$animation-time:0.5s
.panel-overlay
    position: fixed
    top: 0
    left: 0vw
    width: 100vw
    height: 100vh
    animation: panel-leave $animation-time
    z-index: -1
    background-color: rgba(0,0,0,0)
    cursor: pointer
    transition: background-color $animation-time ease-in-out
    &.show
        background-color: rgba(0,0,0,0.25)
        animation: panel-enter $animation-time
        z-index: 1
        .panel-container
            left: calc(100vw - $panel-width)
    .panel-container
        position: absolute
        background-color: white
        width: $panel-width
        left: 100vw
        left: 100vw
        z-index: 1
        height: 100vh
        cursor: auto
        transition: left $animation-time ease-in-out
        .actions
            >div
                cursor: pointer
        .template-item
            cursor: pointer
            &.selected
                font-weight: 700
</style>