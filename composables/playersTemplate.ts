export interface PlayersTemplate {
    players:Player[]
}

export const EMPTY_PLAYERS_TEMPLATE={
    players: [structuredClone(FIRST_EMPTY_PLAYER)]
} as PlayersTemplate

export const usePlayersTemplate = () => useState<PlayersTemplate>('playersTemplate',()=>structuredClone(EMPTY_PLAYERS_TEMPLATE))
// export const useSelectedPlayer = () => useState<Player>('selectedPlayer',()=>structuredClone(usePlayersTemplate().value.players[0]))
export const useSelectedPlayerIndex = () => useState<number>('selectedPlayerIndex',()=>0)

export const usePlayersTemplateActions=()=>{
    const selectedPlayerIndex=useSelectedPlayerIndex();
    const playersTemplate=usePlayersTemplate();
    const getRandomColor=useColors();

    const selectedPlayer=computed(()=>playersTemplate.value.players[selectedPlayerIndex.value])
    const addCounterItemToSelectedPlayer=()=>{
        var counterItemToAdd={
            name:"Counter "+(playersTemplate.value.players[selectedPlayerIndex.value].counterItems.length+1),
            color: getRandomColor()
        }
        playersTemplate.value.players[selectedPlayerIndex.value].counterItems.push(counterItemToAdd)
    }

    const addEmptyPlayer=()=>{
        var playerToAdd={
            name:"Player "+(playersTemplate.value.players.length+1),
            counterItems: []
        }
        playersTemplate.value.players.push(playerToAdd)
    }

    return {addCounterItemToSelectedPlayer,addEmptyPlayer,selectedPlayer}
}