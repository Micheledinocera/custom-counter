<template>
    <div v-if="isIos" :class="['toast', { 'show': show }, 'isIos']">
        <div class="label">
            Installa l'applicazione sul tuo dispositivo facendo prima tap su
            <span class="share"> </span> e poi su "Aggiungi alla schermata Home"
            <span class="add"> </span>
        </div>
        <div class="close" @click.stop="dismissToast"><div class="icon"></div></div>
    </div>
    <div v-else :class="['toast', { 'show': show }]" @click="promptInstallPrompt">
    <!-- <div v-else-if="showInstallation" :class="['toast', { 'show': show }]" @click="promptInstallPrompt"> -->
        <div class="label">Clicca qui per installare l'app</div>
        <div class="close" @click.stop="dismissToast"><div class="icon"></div></div>
    </div>
</template>

<script setup lang="ts">
const show=ref(true)
const isIos=ref(false)
const isInStandaloneMode=ref(false)
const showInstallation=ref(false)
const installPromptEvent= ref(new Event("beforeinstallprompt")) as Ref<Event & {prompt:Promise<void>}>

onMounted(()=>{
    const userAgent = window.navigator.userAgent.toLowerCase();
    isIos.value=(/iphone|ipad|ipod/ as RegExp).test(userAgent);
    isInStandaloneMode.value=window.matchMedia('(display-mode: standalone)').matches || location.search.includes('standalone=true');
    showInstallation.value=isIos.value && !isInStandaloneMode.value;   
    console.log(installPromptEvent.value);
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        installPromptEvent.value = e as Event & {prompt:Promise<void>};
        console.log(installPromptEvent.value);
    });
})


const promptInstallPrompt=() => {
    console.log(installPromptEvent.value);
    (installPromptEvent.value as any).prompt();
    show.value = false;
}

const dismissToast=() =>{
    show.value = false;
}

</script>

<style scoped lang="sass">

.toast
  position: fixed
  bottom: -100px
  transition: all .7s ease-in-out
  left: 18px
  width: 160px
  text-align: left
  box-shadow: 0 0 12px rgba(0,0,0,0.25)
  border-radius: 6px
  padding: 10px 12px
  background-color: $background-color
  color: white
  font-weight: 600
  z-index: 1
  display: flex
  cursor: pointer
  &.show 
    bottom: 40px
  .label
    width: 100%
  .close
    margin: auto
    width: 24px
    .icon
      margin: auto
      width: 30px
      height: 30px
      background-image: url(~/assets/imgs/close_white.svg)
      background-size: contain
      background-position: center
  &.isIos
    background-color: #F1FAFF
    color: black
    width: 100vw
    left: 0
    padding: 10px 0
    font-size: 14px
    &:not(.show)
        bottom: -300px
    .label
      width: calc(100% - 50px)
      padding-left: 14px
      >span
        width: 20px
        height: 20px
        display: inline-flex
        @include background-standard
        &.share
            background-image: url(~/assets/imgs/safari_share_icon.jpg)
        &.add
            background-image: url(~/assets/imgs/safari_Add_to_home_screen_icon.png)
    .close
      .icon
        background-image: url(~/assets/imgs/close_black.svg)
</style>