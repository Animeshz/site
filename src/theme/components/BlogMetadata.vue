<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';
import { useData } from 'vitepress';

const props = defineProps({
  frontmatter: Object,
  wordCount: Number,
  showCategory: {
    type: Boolean,
    default: true,
  },
});

const { theme, page } = useData();
const data = reactive({
  date: new Date(props.frontmatter?.created ?? 0),
  tags: props.frontmatter?.tags ?? [],
});
const { date, tags } = toRefs(data);

</script>

<template>
  <p style="font-size: 18px;">
  {{ props.frontmatter.description }}
  </p>
  <div class="meta-wrapper">
    <div class="meta-item">
      <span class="meta-icon date">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
        </svg>
      </span>
      <span>{{ Math.ceil(props.wordCount / 250) }} minute read</span>
    </div>
    <div class="meta-item">
      <span class="meta-icon date">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path transform="scale(1.8)" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path>
        </svg>
      </span>
      <time class="meta-content" :datetime="date.toISOString()">{{ date.toLocaleString('en-IN') }}</time>
    </div>
    <div class="meta-item tag">
      <span class="meta-icon tag">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><title>标签列表</title><path d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8a8.03 8.03 0 0 0 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z m60.16 186.23a48 48 0 1 0 67.88-67.89 48 48 0 1 0-67.88 67.89zM889.7 539.8l-39.6-39.5a8.03 8.03 0 0 0-11.3 0l-362 361.3-237.6-237a8.03 8.03 0 0 0-11.3 0l-39.6 39.5a8.03 8.03 0 0 0 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z"></path></svg>
      </span>
      <span class="meta-content">
        <span v-for="(tag, index) in tags" :key="index">
          <!-- TODO: Make a tag filtering page? -->
          <!-- <a href="javascript:void(0);" target="_self" :title="tag">#{{ tag }}</a> -->
          <span>#{{ tag }}</span>
          <span v-if="index != tags.length - 1">, </span>
        </span>
      </span>
    </div>
  </div>
  <hr>
</template>

<style scoped>
.meta-wrapper {
  margin-top: 10px;
}

.meta-item {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 240px;
  color: var(--vp-c-text-2);
  cursor: default;
  font-size: 14px;
}
.meta-item:not(.tag) {
  margin-right: 1rem;
}
.meta-item.original {
  margin-right: 0.5rem;
  margin-top: -0.5px;
}
.meta-icon, meta-content {
  display: inline-block;
  margin-right: .375rem;
  vertical-align: middle;
}
.meta-icon {
  position: relative;
  bottom: 1.5px;
}
.meta-icon.author {
  bottom: 1.3px;
}
.meta-icon.date {
  bottom: 1.3px;
}
.meta-icon svg {
  fill: var(--vp-c-text-2);
  height: 16px;
  width: 16px;
}
.meta-content a {
  font-weight: 400;
  color: var(--vp-c-text-2);
}
.meta-content a:hover {
  color: var(--vp-c-brand);
}
</style>
