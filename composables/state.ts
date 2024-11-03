export const useShowPanel = () => useState<boolean>('showPanel', () => false)
export const useSelectedItems = () => useState<number[]>('selectedItems', () => [])
export const useShowModal = ()=>useState<boolean>('showModal',()=>false)
export const useNotification = () => useState<{show:boolean,info:string,type:'info'|'danger'}>('notification', () => ({
    type:"info",
    info:'info',
    show:false
}))