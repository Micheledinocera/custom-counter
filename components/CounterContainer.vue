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
        <template v-if="playersTemplate.players.length>1">
            <div :class="['winner',{you:selectedPlayerIndex==maxScoreIndex}]"> 
                <slot v-if="selectedPlayerIndex==maxScoreIndex"> Sei il vincitore </slot>
                <slot v-else> Il vincitore è <b>{{ totalScores[maxScoreIndex].playerName }}</b> col punteggio di <b>{{ totalScores[maxScoreIndex].total }}</b> </slot>
            </div>
            <div class="score"> 
                <div class="row header">
                    <div class="column"> Player </div>
                    <div class="column"> Score </div>
                </div>
                <div :class="['row',{'winner':index==0}]" v-for="(playerScore,index) in orderedTotalScores">
                    <div class="column"> {{playerScore.playerName}}</div>
                    <div class="column"> {{playerScore.total}}</div>
                </div>
            </div>
        </template>
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

const totalScores=computed(()=>
    playersTemplate.value.players.map(player=>
        ({
            playerName:player.name,
            total:getPlayerTotal(player)
        })
    )
)

const orderedTotalScores=computed(()=>totalScores.value.sort((a,b)=>b.total-a.total))

const maxScoreIndex=computed(()=>totalScores.value.reduce((iMax, x, i, arr) => x.total > arr[iMax].total ? i : iMax, 0))

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
    .score
        width: 300px
        margin: 30px auto
        .row
            display: flex
            justify-content: space-between
            border-bottom: solid 1px white
            margin-bottom: 6px
            &.header
                font-weight: 600
                margin-bottom: 16px
            &.winner
                font-weight: 600
                color: $primary-color
</style>