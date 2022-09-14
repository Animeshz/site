<script setup>
import { ref, watch } from "vue";

const action_text = ref("");
const share_icons = ref();
const share_icon_toggle = ref(false);

const SHARE_BTNS = new Map([
  ['facebook', ''],
  ['twitter', ''],
  ['linkedin', ''],
  ['discord', ''],
  ['pinterest', ''],
  ['get-pocket', ''],
  ['reddit', ''],
  ['tumblr', ''],
]);
function height(e) {
  return (share_icon_toggle.value ? share_icons.value.scrollHeight : 0) + 'px';
}
function scroll_top() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div id="action-nav" class="custom-nv">
    <!-- Action Icons -->
    <a class="icon" href="#" aria-label="Top of Page" v-on:click.prevent="scroll_top"
      v-on:mouseover="action_text = 'Back to top'" v-on:mouseout="action_text = ''">
      <FontAwesomeIcon icon="fa-solid fa-chevron-up" aria-hidden="true" />
    </a>
    <div>
      <a class="icon" href="#" aria-label="Share" v-on:click.prevent="share_icon_toggle = !share_icon_toggle"
        v-on:mouseover="action_text = 'Share post'" v-on:mouseout="action_text = ''">
        <FontAwesomeIcon icon="fa-solid fa-share-alt" aria-hidden="true" />
      </a>
      <!-- Share Icons -->
      <ul id="share-icons" ref="share_icons" class="custom-share" :style="'max-height: ' + height($el)">
        <li>
          <a class="icon"
            href="mailto:?subject={#{{ page.title }}#}&body=Check out this article: {#{{ page.permalink }}#}"
            aria-label="Email">
            <FontAwesomeIcon icon="fa-solid fa-envelope" aria-hidden="true" />
          </a>
        </li>
        <li v-for="[target, url] in SHARE_BTNS">
          <a class="icon" :href="url" :aria-label="target">
            <FontAwesomeIcon :icon="'fa-brands fa-' + target" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
    <!-- Action Text -->
    <i style="font-size: 14px; text-align: right; flex-grow: 1;">{{ action_text }}</i>
  </div>
</template>

<style scoped>
.custom-nv {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  margin: 7px 0;
}

.custom-nv .icon {
  margin-left: 10px;
}

.custom-nv svg:hover {
  color: var(--vp-c-brand);
}

.custom-share {
  margin-top: 6px;
  transition-property: max-height;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  overflow: hidden;
  text-align: right;
}
</style>
