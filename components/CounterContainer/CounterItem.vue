<template>
    <div class="counter-item" :style="{ backgroundColor: counterItem.color}" @click="()=>{counterItem.color=getNextColor(counterItem.color)}">
        <div class="title" v-if="!isEdit" @click.stop="clickPlayerName"> {{ counterItem.name }} </div>
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

const isEdit=ref(false);
const input = ref() as Ref<HTMLInputElement>

const clickPlayerName=()=>{
    isEdit.value=true;
    setTimeout(()=>{
        input.value.focus();
    },100)
}

const hanfleFocusOut=()=>{
    isEdit.value=false;
    editCounterItem(props.counterItem,props.counterItemIndex)
}
</script>

<style scoped lang="sass">
.counter-item
    color: white
    display: flex
    padding: 10px 16px
    margin: 10px
    border-radius: 8px
    >div
        cursor: pointer
    .minus
        margin-left: auto
    .value,.add
        margin-left: 16px
    .value
        width: 20px
        text-align: center
</style>