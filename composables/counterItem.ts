export interface CounterItem {
    name:string,
    color: keyof typeof COLORS
}

export interface ValueCounterItem extends CounterItem {
    value:number
}

export const useCounterItemActions=()=>{
    const addValueToCounterItem=(counterItem:CounterItem)=>{
        var counterItemAsValueCounterItem=(counterItem as ValueCounterItem);
        counterItemAsValueCounterItem.value=counterItemAsValueCounterItem.value?counterItemAsValueCounterItem.value:0;
        return counterItemAsValueCounterItem;
    }

    const removeValueFromValueCounterItem=(valueCounterItem:ValueCounterItem)=>({
        name:valueCounterItem.name,
        color:valueCounterItem.color
    }) as CounterItem
    
    return {addValueToCounterItem,removeValueFromValueCounterItem}
}