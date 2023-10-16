<template>
    <div class="header" @click="disableDeleteMode">
        <div class="title">
            <template v-if="selectedTemplate?.name">
                <span v-if="!isEdit" @click="clickTemplateName"> {{ selectedTemplate?.name }} </span> 
                <input ref="input" v-else v-model="selectedTemplate.name" @focusout="handleFocusOut" @keydown.enter="handleFocusOut">
            </template>
            <span v-else> New Template </span>
        </div>
        <div class="list icon" @click="showPanel=!showPanel"> </div>
    </div>
</template>

<script setup lang="ts">
const showPanel=useShowPanel();
const isEdit=ref(false);
const {selectedTemplate,editTemplate}=useCounterItemsActions();
const {disableDeleteMode}=useDeleteModeActions();
const input = ref() as Ref<HTMLInputElement>

const clickTemplateName=()=>{
    isEdit.value=true;
    setTimeout(()=>{
        input.value.focus();
    },100)
}

const handleFocusOut=()=>{
    isEdit.value=false;
    editTemplate();
}

</script>

<style scoped lang="sass">
.header
    @include header-row
    display: flex
    background-color: $background-color
    color: $primary-color-light
    .title
        margin-left: 10px
    .list
        @include background-standard
        background-image: url('~/assets/imgs/list.svg')
        width: 20px
        height: 20px
        position: absolute
        right: 20px
        cursor: pointer
</style>
