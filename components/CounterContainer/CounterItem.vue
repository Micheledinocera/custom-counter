<template>
    <div class="counter-item">
        {{ counterItem.name }} - {{ counterItem.color }}
    </div>
</template>

<script setup lang="ts">
defineProps<{ counterItem: CounterItem }>()
</script>