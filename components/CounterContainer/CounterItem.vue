<template>
    <template v-if="isDevice(DEVICES.desktop)">
        <div :class="['counter-item',{selected:isSelected && isDeleteMode}]" :style="{ backgroundColor: counterItem.color}" 
        @click.stop="clickCounterHandler" @pointerdown="()=>startTime= new Date().getTime()">
            <div class="title" v-if="!isEdit" @click.stop="clickCounterName"> {{ counterItem.name }} </div>
            <input ref="input" v-else @click.stop="()=>null" v-model="counterItem.name" @focusout="handleFocusOut" @keydown.enter="handleFocusOut">
            <div class="minus" @click.stop="counterItem.value--"> - </div>
            <div class="value" v-if="!isEditValue" @click.stop="clickCounterValue"> {{ counterItem.value }} </div>
            <input ref="inputValue" v-else type="number" class="value" @click.stop="" :value="counterItem.value" @input="handleInputValue" @focusout="()=>isEditValue=false" @keydown.enter="()=>isEditValue=false">
            <div class="add" @click.stop="counterItem.value++"> + </div>
        </div>
    </template>
    <template v-else>
        <div :class="['counter-item',{selected:isSelected && isDeleteMode}]" :style="{ backgroundColor: counterItem.color}" 
        @click.stop="clickCounterHandler" @pointerdown="()=>startTime= new Date().getTime()" v-touch:longtap="clickCounterHandler">
            <div class="title" v-if="!isEdit" @click.stop="clickCounterName"> {{ counterItem.name }} </div>
            <input ref="input" v-else @click.stop="" v-model="counterItem.name" @focusout="handleFocusOut" @keydown.enter="handleFocusOut">
            <div class="minus" @click.stop="counterItem.value--"> - </div>
            <div class="value" v-if="!isEditValue" @click.stop="clickCounterValue"> {{ counterItem.value }} </div>
            <input ref="inputValue" type="number" class="value" v-else @click.stop="" v-model="counterItem.value" @focusout="()=>isEditValue=false" @keydown.enter="()=>isEditValue=false">
            <div class="add" @click.stop="counterItem.value++"> + </div>
        </div>
    </template>
</template>

<script setup lang="ts">
const props=defineProps<{ 
    counterItem: ValueCounterItem,
    counterItemIndex: number 
}>()

const isDevice=useDevice();
const {getNextColor}=useColors();
const {editCounterItem}=usePlayersTemplateActions();
const selectedItems=useSelectedItems();
const isDeleteMode=useDeleteMode()
const { saveAsTemplate }=useCounterItemsActions();

const isEdit=ref(false);
const isEditValue=ref(false);
const startTime=ref(0);
const isSelected=computed(()=>selectedItems.value.includes(props.counterItemIndex))
const input = ref() as Ref<HTMLInputElement>
const inputValue = ref() as Ref<HTMLInputElement>

const clickCounterHandler=()=>{
    if(new Date().getTime()-startTime.value>500 && !isDeleteMode.value){
        isDeleteMode.value=true;
        selectedItems.value.push(props.counterItemIndex);
    } else if(isDeleteMode.value){
        if(!isSelected.value)
            selectedItems.value.push(props.counterItemIndex)
        else {
            const selectedIndex=selectedItems.value.indexOf(props.counterItemIndex)
            selectedItems.value.splice(selectedIndex,1)
            if(selectedItems.value.length==0)
                isDeleteMode.value=false;
        }
    } else {
        props.counterItem.color=getNextColor(props.counterItem.color);
        editCounterItem(props.counterItem,props.counterItemIndex);
        saveAsTemplate();
    }
}

const clickCounterName=()=>{
    isEdit.value=true;
    setTimeout(()=>{
        input.value.focus();
    },100)
}

const clickCounterValue=()=>{
    isEditValue.value=true;
    setTimeout(()=>{
        inputValue.value.focus();
    },100)
}

const handleFocusOut=()=>{
    isEdit.value=false;
    editCounterItem(props.counterItem,props.counterItemIndex);
}

const handleInputValue=(evt:Event)=>{
    props.counterItem.value=(evt.target as HTMLInputElement).valueAsNumber
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
    .value,.add,.minus
        cursor: pointer
        padding: 0 10px
    .value
        width: 20px
        text-align: center
    input.value
        width: 40px
    &.selected
        animation: shake infinite 1.5s
</style>