export interface CounterItem {
    name:string,
    color: keyof typeof COLORS
}

export interface ValueCounterItem extends CounterItem {
    value:number
}

export const useCounterItemActions=()=>{
    const addValueToCounterItem=(counterItem:CounterItem)=>{
        (counterItem as ValueCounterItem).value=0;
        return counterItem as ValueCounterItem;
    }

    const removeValueFromValueCounterItem=(valueCounterItem:ValueCounterItem)=>({
        name:valueCounterItem.name,
        color:valueCounterItem.color
    }) as CounterItem
    
    return {addValueToCounterItem,removeValueFromValueCounterItem}
}