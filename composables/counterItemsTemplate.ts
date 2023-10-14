export const useCounterItemsTemplate = () => useState<CounterItemsTemplate>('counterItemsTemplate',()=>structuredClone(EMPTY_COUNTER_ITEMS_TEMPLATE))

export interface CounterItemsTemplate {
    name:string,
    counterItems:CounterItem[]
}

export const EMPTY_COUNTER_ITEMS_TEMPLATE={
    name:"",
    counterItems:[]
} as CounterItemsTemplate