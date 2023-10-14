<template>
    <div class="counter-container">
        <div class="player-selector">
            <Carousel ref="myCarousel" :itemsToShow="1" :wrapAround="true" :transition="500" @slide-end="updateSelectedPlayerIndex">
                <Slide v-for="player in playersTemplate.players" :key="player.name+'_'">
                    <div class="counter-items-container">
                        <PlayerTab :player="player" :key="'player_'+player.name"/>
                    </div>
                </Slide>
            </Carousel>
        </div>
        <div class="counter-items-container">
            <CounterItem :counterItem="counterItem" v-for="(counterItem,index) in selectedPlayer.counterItems" :key="counterItem.name+'_'+index"/>
        </div>
        <div class="add-counter" @click="addCounterItemToSelectedPlayer"> Aggiungi Counter</div>
        <div class="add-counter" @click="addEmptyPlayer"> Aggiungi Player </div>
    </div>
</template>

<script setup lang="ts">
const playersTemplate=usePlayersTemplate()
const selectedPlayerIndex=useSelectedPlayerIndex()
const {addCounterItemToSelectedPlayer,addEmptyPlayer,selectedPlayer}=usePlayersTemplateActions()

const updateSelectedPlayerIndex=(evt: { currentSlideIndex: number; })=>{
    selectedPlayerIndex.value=evt.currentSlideIndex;
}
</script>

<style scoped lang="sass"></style>