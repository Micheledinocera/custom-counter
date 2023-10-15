export interface PlayersTemplate {
    players:Player[]
}

export const EMPTY_PLAYERS_TEMPLATE={
    players: [structuredClone(FIRST_EMPTY_PLAYER)]
} as PlayersTemplate

export const usePlayersTemplate = () => useState<PlayersTemplate>('playersTemplate',()=>structuredClone(EMPTY_PLAYERS_TEMPLATE))
export const useSelectedPlayerIndex = () => useState<number>('selectedPlayerIndex',()=>0)

export const usePlayersTemplateActions=()=>{
    const selectedPlayerIndex=useSelectedPlayerIndex();
    const playersTemplate=usePlayersTemplate();
    const {getRandomColor}=useColors();
    const {addValueToCounterItem}=useCounterItemActions();

    const selectedPlayer=computed(()=>playersTemplate.value.players[selectedPlayerIndex.value])

    const addCounterItem=()=>{
        var counterItemToAdd={
            name: "Counter " + (playersTemplate.value.players[selectedPlayerIndex.value].counterItems.length + 1),
            color: getRandomColor(),
            value: 0
        } as ValueCounterItem
        playersTemplate.value.players.forEach(player=>player.counterItems.push(structuredClone(counterItemToAdd)))
    }

    const removeCounterItem=(index:number)=>{
        playersTemplate.value.players.forEach(player=>player.counterItems.splice(index,1))
    }

    const editCounterItem=(counterItem:CounterItem,index:number)=>{
        playersTemplate.value.players.forEach(player=>{player.counterItems[index]=addValueToCounterItem(structuredClone(toRaw(counterItem)))})
    }

    const addNewPlayer=()=>{
        const counterItems=structuredClone(toRaw(playersTemplate.value.players[0].counterItems));
        var playerToAdd={
            name:"Player "+(playersTemplate.value.players.length+1),
            counterItems: counterItems.map(counterItem=>{
                counterItem.value=0;
                return counterItem
            })
        }
        playersTemplate.value.players.push(playerToAdd);
        setTimeout(()=>{selectedPlayerIndex.value=playersTemplate.value.players.length-1;},100)
    }

    const removePlayer=()=>{
        playersTemplate.value.players.splice(selectedPlayerIndex.value,1);
        selectedPlayerIndex.value=0;
    }

    const editPlayer=(player:Player)=>{
        playersTemplate.value.players[selectedPlayerIndex.value]=structuredClone(player)
    }

    return {addCounterItem,editCounterItem,editPlayer,addNewPlayer,removePlayer,removeCounterItem,selectedPlayer}
}