<template>
    <div class="footer" @click="disableDeleteMode">
        <div class="buttons-container"> 
            <div :class="['remove-player',{inactive:playersTemplate.players.length==1}]" @click="removePlayer"> Remove Player </div>
            <div class="add-player" @click="addNewPlayer"> Add Player </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const playersTemplate=usePlayersTemplate()
const {disableDeleteMode}=useDeleteModeActions();
const {addNewPlayer,removePlayer}=usePlayersTemplateActions()

</script>

<style scoped lang="sass">
.footer
    @include header-row
    display: flex
    background-color: $background-color
    color: $primary-color-light
    .buttons-container
        display: flex
        width: 100%
        height: 100%
        >div
            width: 50%
            cursor: pointer
            padding-top: 16px
            &.inactive
                opacity: 0.5
                pointer-events: none
            &.add-player
                background-color: $primary-color
                &:hover
                    background-color: $primary-color-dark
            &.remove-player
                background-color: $red
</style>
