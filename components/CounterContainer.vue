<template>
    <div class="counter-container">
        <div class="player-selector">
            <Carousel ref="myCarousel" :itemsToShow="1" :wrapAround="false" :transition="500" v-model="selectedPlayerIndex">
                <Slide v-for="(player,index) in playersTemplate.players" :key="'slide_player_'+index">
                    <div class="players-container">
                        <div class="prev" @click="prevClick"> {{selectedPlayerIndex>0?"<":""}} </div>
                        <PlayerTab :player="player" :key="'player_'+index"/>
                        <div class="next" @click="nextClick"> {{selectedPlayerIndex<playersTemplate.players.length-1?">":""}} </div>
                    </div>
                </Slide>
            </Carousel>
        </div>
        <div class="counter-items-container">
            <CounterItem :counterItem="counterItem" v-for="(counterItem,index) in selectedPlayer.counterItems" :key="'counterItem_'+index" :counterItemIndex="index"/>
        </div>
        <div class="add-counter" @click="addCounterItem"> Aggiungi Counter</div>
        <div class="add-counter" @click="addNewPlayer"> Aggiungi Player </div>
        <div class="add-counter" @click="removePlayer" v-if="playersTemplate.players.length>1"> Remove Player </div>
    </div>
</template>

<script setup lang="ts">
const playersTemplate=usePlayersTemplate()
const selectedPlayerIndex=useSelectedPlayerIndex()
const {addCounterItem,addNewPlayer,removePlayer,selectedPlayer}=usePlayersTemplateActions()

const prevClick=()=>{
    if(selectedPlayerIndex.value>0)
        selectedPlayerIndex.value--
}

const nextClick=()=>{
    if(selectedPlayerIndex.value<playersTemplate.value.players.length-1)
        selectedPlayerIndex.value++
}
</script>

<style scoped lang="sass">
.players-container
    width: 100%
    display: flex
    >div
        margin: auto
        cursor: pointer
        &.next,&.prev
            width: 30px
            font-weight: 600
            font-size: 30px
        &.prev
            margin-left: 10px
        &.next
            margin-right: 10px

</style>