<template>
  <div id="wordcloud-container"></div>
</template>

<script lang="ts" setup>
// Taken from: https://github.com/Charles7c/charles7c.github.io
// License: MIT
import { onMounted, onBeforeUnmount } from 'vue';
import { WordCloud } from '@antv/g2plot';

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
})

let wordCloud;
onMounted(() => {
  wordCloud = new WordCloud("wordcloud-container", {
    data: props.dataList,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [14, 35],
      rotation: 0,
    },
    random: () => 0.5,
  });
  wordCloud.render();
});

onBeforeUnmount(() => {
  wordCloud.destroy();
});
</script>