export const useDeleteMode = () => useState<boolean>('deleteMode', () => false)

export const useDeleteModeActions= ()=>{
    const isDeleteMode=useDeleteMode();
    const selectedItems=useSelectedItems();
    const disableDeleteMode=()=>{
        if(isDeleteMode){ 
            isDeleteMode.value=false;
            selectedItems.value=[];
        }
    }

    return {disableDeleteMode}
}