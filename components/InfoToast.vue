<template>
    <div :class="['toast', notification.type,{ 'show': notification.show }]" @click.stop="dismissToast">
        <div class="label">{{notification.info}}</div>
    </div>
</template>

<script setup lang="ts">

const notification=useNotification()
const timeout=ref()
const dismissToast=() =>{
  clearTimeout(timeout.value);
  notification.value.show = false;
}

watch(notification,(nextVal,prevVal)=>{
  if(nextVal.show)
    timeout.value=setTimeout(()=>{
      notification.value.show=false
    },2000)
})

</script>

<style scoped lang="sass">

.toast
  position: fixed
  top: -100px
  transition: all .7s ease-in-out
  left: 40px
  width: auto
  text-align: left
  box-shadow: 0 0 12px rgba(0,0,0,0.25)
  border-radius: 6px
  padding: 10px 12px
  background-color: $primary-color
  color: $background-color-light
  font-weight: 600
  z-index: 1
  display: flex
  cursor: pointer
  &.show 
    top: 20px
  .label
    width: 100%
  
</style>