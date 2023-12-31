<template>
    <div class="counter-container">
        <div class="player-selector">
            <Carousel :itemsToShow="1" :wrapAround="false" :transition="500" v-model="selectedPlayerIndex">
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
        <div :class="['add-counter',{delete:isDeleteMode}]" @click="()=>{isDeleteMode?deleteCounterItems():addCounterItem()}"> </div>
        <div class="total"> Totale: {{ getPlayerTotal(selectedPlayer) }}</div>
        <div :class="['winner',{you:selectedPlayerIndex==maxIndex}]" v-if="playersTemplate.players.length>1"> 
            <slot v-if="selectedPlayerIndex==maxIndex"> Sei il vincitore </slot>
            <slot v-else> Il vincitore è <b>{{ maxPlayer }}</b> col punteggio di <b>{{ maxPoints }}</b> </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const playersTemplate=usePlayersTemplate()
const selectedPlayerIndex=useSelectedPlayerIndex()
const isDeleteMode=useDeleteMode()
const {addCounterItem,selectedPlayer,deleteCounterItems}=usePlayersTemplateActions()

const prevClick=()=>{
    if(selectedPlayerIndex.value>0)
        selectedPlayerIndex.value--
}

const nextClick=()=>{
    if(selectedPlayerIndex.value<playersTemplate.value.players.length-1)
        selectedPlayerIndex.value++
}

const getPlayerTotal=(player:Player)=>player.counterItems.map(counterItem=>counterItem.value).reduce( (x,y) => x+y, 0)

const totals=computed(()=>playersTemplate.value.players.map(player=>getPlayerTotal(player)))

const maxIndex=computed(()=>totals.value.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0))

const maxPlayer=computed(()=> playersTemplate.value.players[maxIndex.value].name )

const maxPoints=computed(()=> totals.value[maxIndex.value] )

</script>

<style scoped lang="sass">
.counter-container
    .players-container
        width: 100%
        display: flex
        >div
            margin: auto
            cursor: pointer
            color: $primary-color
            &.next,&.prev
                width: 30px
                font-weight: 600
                font-size: 30px
            &.prev
                margin-left: 10px
            &.next
                margin-right: 10px
    .counter-items-container
        display: flex
        flex-wrap: wrap
        justify-content: space-evenly
    .add-counter
        color: $primary-color
        border: dashed 2px $primary-color
        cursor: pointer
        border-radius: 8px
        text-align: center
        height: 30px
        width: calc(100% - 20px)
        margin: 10px
        font-size: 20px
        font-weight: 600
        @include background-standard
        background-image: url('~/assets/imgs/add.svg')
        &.delete
            border-color: $red
            color: $red
            background-image: url('~/assets/imgs/delete.svg')
    .total
        text-align: center
        font-size: 22px
    .winner
        text-align: center
        font-size: 20px
        margin-top: 10px
        b
            color: $primary-color-light
        &.you
            color: $primary-color
</style>