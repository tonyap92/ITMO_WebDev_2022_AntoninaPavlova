<script setup>
import { useRoute } from 'vue-router';
import { useTodosStore } from '@/stores/todos';

const todoStore = useTodosStore();
const { findTodoByIndex } = todoStore;

const currentTodoTitle = findTodoByIndex(useRoute().params.id)?.title;
</script>
<template>
  <div>
    <h2>This is an todo id page</h2>
    <div>Title {{ currentTodoTitle || 'NOT FOUND' }}</div>
  </div>
</template>
<style></style>
