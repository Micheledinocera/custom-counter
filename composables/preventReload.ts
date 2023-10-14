export const usePreventReload=()=>{
    onMounted(()=>{
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            event.returnValue = "";
        })
    })
}