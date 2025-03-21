<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('')
</script>

<template>
    <f-editor style="height: 500px;" v-model="content" />
</template>