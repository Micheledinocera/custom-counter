<template>
    <div class="player-tab">
        {{player.name}}
    </div>
</template>

<script setup lang="ts">
defineProps<{ player: Player }>()
</script>