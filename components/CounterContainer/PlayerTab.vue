<template>
    <div class="player-tab">
        <div class="label" v-if="!isEdit" @click="clickPlayerName"> {{player.name}} </div>
        <input ref="input" v-else v-model="player.name" @focusout="()=>isEdit=false" @keydown.enter="()=>isEdit=false">
    </div>
</template>

<script setup lang="ts">
defineProps<{ player: Player }>()
const isEdit=ref(false)


const input = ref() as Ref<HTMLInputElement>

const clickPlayerName=()=>{
    isEdit.value=true;
    setTimeout(()=>{
        input.value.focus();
    },100)
}
</script>

<style scoped lang="sass">

</style>