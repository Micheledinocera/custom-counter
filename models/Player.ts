export interface Player {
    name:string,
    counterItems:ValueCounterItem[]
}

export const FIRST_EMPTY_PLAYER ={
    name:"YOU",
    counterItems:[]
} as Player