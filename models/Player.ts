export interface Player {
    name:string,
    counterItems:ValueCounterItem[]
}

export const FIRST_EMPTY_PLAYER ={
    name:"Player 1",
    counterItems:[]
} as Player