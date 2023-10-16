<template>
    <div :class="['counter-item',{selected:isSelected && isDeleteMode}]" :style="{ backgroundColor: counterItem.color}" 
    @click.stop="clickCounterHandler" @pointerdown="pointerdownHandler" @pointerup="pointerupHandler">
        <div class="title" v-if="!isEdit" @click.stop="clickCounterName"> {{ counterItem.name }} </div>
        <input ref="input" v-else v-model="counterItem.name" @focusout="hanfleFocusOut" @keydown.enter="hanfleFocusOut">
        <div class="minus" @click.stop="counterItem.value--"> - </div>
        <div class="value"> {{ counterItem.value }} </div>
        <div class="add" @click.stop="counterItem.value++"> + </div>
    </div>
</template>

<script setup lang="ts">
const props=defineProps<{ 
    counterItem: ValueCounterItem,
    counterItemIndex: number 
}>()
const {getNextColor}=useColors();
const {editCounterItem}=usePlayersTemplateActions();
const selectedItems=useSelectedItems();
const isDeleteMode=useDeleteMode()

const isEdit=ref(false);
const startTime=ref(0);
const isSelected=computed(()=>selectedItems.value.includes(props.counterItemIndex))
const input = ref() as Ref<HTMLInputElement>

const clickCounterHandler=()=>{
    if(isDeleteMode.value){
        if(!isSelected.value)
            selectedItems.value.push(props.counterItemIndex)
        else {
            const selectedIndex=selectedItems.value.indexOf(props.counterItemIndex)
            selectedItems.value.splice(selectedIndex,1)
            if(selectedItems.value.length==0)
                isDeleteMode.value=false;
        }
    } else
        props.counterItem.color=getNextColor(props.counterItem.color);
}

const pointerdownHandler=()=>{
    startTime.value = new Date().getTime()
}

const pointerupHandler=()=>{
    if(new Date().getTime()-startTime.value>500){
        longTapHandler()
    }
}

const clickCounterName=()=>{
    isEdit.value=true;
    setTimeout(()=>{
        input.value.focus();
    },100)
}

const hanfleFocusOut=()=>{
    isEdit.value=false;
    editCounterItem(props.counterItem,props.counterItemIndex);
}

const longTapHandler=()=>{
    if(!isDeleteMode.value){
        isDeleteMode.value=true;
        selectedItems.value.push(props.counterItemIndex)
    }
}
</script>

<style scoped lang="sass">
.counter-item
    color: $primary-color-light
    display: flex
    padding: 10px 16px
    margin: 10px
    border-radius: 8px
    width: 42%
    @media (max-width: $breakpoint-tablet)
        width: 100%
    .minus
        margin-left: auto
        cursor: pointer
    .add
        cursor: pointer
    .value,.add
        margin-left: 16px
    .value
        width: 20px
        text-align: center
    &.selected
        animation: shake infinite 1.5s
</style>