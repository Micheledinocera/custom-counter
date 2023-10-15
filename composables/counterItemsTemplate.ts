export interface CounterItemsTemplate {
    name:string,
    counterItems:CounterItem[]
}

export const EMPTY_COUNTER_ITEMS_TEMPLATE={
    name:"",
    counterItems:[]
} as CounterItemsTemplate

export const useCounterItemsTemplate = () => useState<CounterItemsTemplate>('counterItemsTemplate',()=>structuredClone(EMPTY_COUNTER_ITEMS_TEMPLATE))
export const useTemplateIndex = () => useState<number>('templateIndex',()=>-1)
export const useTemplates = () => useState<CounterItemsTemplate[]>('templates', () => [])

export const useCounterItemsActions = () =>{
    const playersTemplate=usePlayersTemplate();
    const counterItemsTemplate= useCounterItemsTemplate();
    const templateIndex= useTemplateIndex();
    const templates=useTemplates();
    const {addValueToCounterItem,removeValueFromValueCounterItem}=useCounterItemActions();

    const selectedTemplate=computed(()=>templates.value[templateIndex.value])

    const saveAsTemplate=()=>{
        const counterItems=structuredClone(toRaw(playersTemplate.value.players[0].counterItems));
        var valueCounterItems=counterItems.map(item=>removeValueFromValueCounterItem(item))
        counterItemsTemplate.value.counterItems=valueCounterItems;
        if(templateIndex.value==-1){
            counterItemsTemplate.value.name="Template "+(templates.value.length+1)
            templates.value.push(counterItemsTemplate.value);
            templateIndex.value=templates.value.length-1;
        } else
            templates.value[templateIndex.value]=counterItemsTemplate.value;
        localStorage.setItem("templates",JSON.stringify(templates.value))
    }

    const editTemplate=()=>{
        selectTemplate(templateIndex.value);
        saveAsTemplate();
    }

    const removeTemplate=(localTemplateIndex:number)=>{
        templates.value.splice(localTemplateIndex,1);
        if(templates.value.length>0){
            templateIndex.value=0;
            selectTemplate(templateIndex.value);
        } else 
            newTemplate();
        localStorage.setItem("templates",JSON.stringify(templates.value))
    }

    const newTemplate=()=>{
        counterItemsTemplate.value=structuredClone(EMPTY_COUNTER_ITEMS_TEMPLATE)
        templateIndex.value=-1
        playersTemplate.value.players.forEach(player=>{
            player.counterItems=[]
        })
    }

    const selectTemplate=(index:number)=>{
        templateIndex.value=index;
        counterItemsTemplate.value=structuredClone(toRaw(selectedTemplate.value));
        playersTemplate.value.players.forEach(player=>{
            var valueCounterItems=structuredClone(toRaw(counterItemsTemplate.value.counterItems))
            var counterItems=valueCounterItems.map(item=>addValueToCounterItem(item))
            player.counterItems=counterItems
        })
    }

    return {saveAsTemplate,newTemplate,selectTemplate,editTemplate,removeTemplate,selectedTemplate}
}