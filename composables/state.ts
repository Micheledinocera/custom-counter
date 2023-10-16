export const useShowPanel = () => useState<boolean>('showPanel', () => false)
export const useSelectedItems = () => useState<number[]>('selectedItems', () => [])