<script setup>
  import { defineProps } from 'vue';
  import { bgColorMap, textColorMap } from '../composables/typeList';
  const props = defineProps({
      type: String
  });
</script>

<template>
  <span :class="`text-sm rounded-full px-2 py-1 my-1 ${textColorMap[props.type]} ${bgColorMap[props.type]}`">{{ props.type }}</span>
</template>