<!-- Alot inspired by: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDocFooter.vue -->

<script setup>
import { useData, withBase } from 'vitepress';
import { ref, computed, watchEffect, markRaw } from 'vue'
import blogs from '../cache/blogs.json'

const { frontmatter } = useData()
const current_blog_idx = ref()
const prev = ref()
const next = ref()

let page_title = computed(() => frontmatter.value.title)
watchEffect(() => {
    current_blog_idx.value = blogs.findIndex(e => e.title == page_title.value)
    prev.value = blogs[current_blog_idx.value - 1]
    next.value = blogs[current_blog_idx.value + 1]
})
</script>

<template>
    <div v-if="current_blog_idx != -1" class="prev-next">
        <div class="pager">
            <a v-if="prev" class="pager-link prev" :href="withBase(prev.regular_path)">
                <span class="desc">Previous page</span>
                <span class="title">{{ prev.title }} </span>
            </a>
        </div>
        <div class="pager" :class="{ 'has-prev': prev }">
            <a v-if="next" class="pager-link next" :href="withBase(next.regular_path)">
                <span class="desc">Next page</span>
                <span class="title">{{ next.title }}</span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.prev-next {
    border-top: 1px solid var(--vp-c-divider-light);
    padding-top: 24px;
}

@media (min-width: 640px) {
    .prev-next {
        display: flex;
    }
}

.pager.has-prev {
    padding-top: 8px;
}

@media (min-width: 640px) {
    .pager {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: 50%;
    }

    .pager.has-prev {
        padding-top: 0;
        padding-left: 16px;
    }
}

.pager-link {
    display: block;
    border: 1px solid var(--vp-c-divider-light);
    border-radius: 8px;
    padding: 11px 16px 13px;
    width: 100%;
    height: 100%;
    transition: border-color 0.25s;
}

.pager-link:hover {
    border-color: var(--vp-c-brand);
}

.pager-link:hover .title {
    color: var(--vp-c-brand-dark);
}

.pager-link.next {
    margin-left: auto;
    text-align: right;
}

.desc {
    display: block;
    line-height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.title {
    display: block;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand);
    transition: color 0.25s;
}
</style>