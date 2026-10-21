<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref } from "vue";
import CaseFigure from "./CaseFigure.vue";
import CompareSlider from "./CompareSlider.vue";
import ImageLightbox from "./ImageLightbox.vue";

const props = defineProps({ study: { type: Object, required: true } });

const lightbox = ref(null);
const root = ref(null);
const activeId = ref(props.study.sections[0]?.id);
const activeSub = ref("");
let scroller;
let frame = 0;

function subsOf(section) {
  return section.blocks
    .map((block, i) => (block.type === "sub" ? { id: `${section.id}-sub-${i}`, title: block.title } : null))
    .filter(Boolean);
}

// Active item = the last heading that has scrolled past the sticky header.
function updateActive() {
  frame = 0;
  const line = scroller.getBoundingClientRect().top + 130;
  let section = props.study.sections[0];
  for (const candidate of props.study.sections) {
    const el = document.getElementById(`deep-${candidate.id}`);
    if (el && el.getBoundingClientRect().top <= line) section = candidate;
  }
  let sub = "";
  for (const item of subsOf(section)) {
    const el = document.getElementById(`deep-${item.id}`);
    if (el && el.getBoundingClientRect().top <= line) sub = item.id;
  }
  activeId.value = section.id;
  activeSub.value = sub;
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateActive);
}

// The project dialog is the scroll container.
onMounted(() => {
  scroller = root.value?.closest("dialog");
  scroller?.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  scroller?.removeEventListener("scroll", onScroll);
  if (frame) cancelAnimationFrame(frame);
});
provide("openImage", (src, opener) => lightbox.value?.open(src, opener));

// All enlargeable images in reading order, so the lightbox can step through them.
const allImages = computed(() => {
  const list = [];
  for (const section of props.study.sections) {
    for (const block of section.blocks) {
      if (block.type === "image" && block.src) {
        list.push({ src: block.src, alt: block.alt, caption: block.caption });
      } else if (block.type === "gallery") {
        for (const image of block.images) {
          if (image.src) list.push({ src: image.src, alt: image.alt, caption: image.caption });
        }
      } else if (block.type === "compare") {
        for (const side of [block.before, block.after]) {
          list.push({ src: side.src, alt: side.alt, caption: `${side.label}: ${side.alt}` });
        }
      }
    }
  }
  return list;
});

function scrollToSection(id) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(`deep-${id}`)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
</script>

<template>
  <div ref="root" class="deep-dive">
    <dl class="deep-facts">
      <div v-for="fact in study.facts" :key="fact.label">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>

    <nav class="deep-toc" aria-label="Case study sections">
      <span class="deep-toc-label">In this case study</span>
      <button
        v-for="section in study.sections"
        :key="section.id"
        type="button"
        @click="scrollToSection(section.id)"
      >
        <b v-if="section.number">{{ section.number }}</b> {{ section.title }}
      </button>
    </nav>

    <div class="deep-layout">
    <aside class="deep-rail">
      <nav class="deep-rail-nav" aria-label="Jump to section">
        <template v-for="section in study.sections" :key="section.id">
          <button
            type="button"
            :class="{ 'is-active': activeId === section.id && !activeSub }"
            :aria-current="activeId === section.id && !activeSub ? 'true' : undefined"
            @click="scrollToSection(section.id)"
          >
            <b v-if="section.number">{{ section.number }}</b>
            <span>{{ section.title }}</span>
          </button>
          <div v-if="activeId === section.id && subsOf(section).length" class="deep-rail-subs">
            <button
              v-for="item in subsOf(section)"
              :key="item.id"
              type="button"
              :class="{ 'is-active': activeSub === item.id }"
              :aria-current="activeSub === item.id ? 'true' : undefined"
              @click="scrollToSection(item.id)"
            >
              <span>{{ item.title }}</span>
            </button>
          </div>
        </template>
      </nav>
    </aside>
    <div class="deep-content">
    <section
      v-for="section in study.sections"
      :id="`deep-${section.id}`"
      :key="section.id"
      :data-id="section.id"
      class="deep-section"
    >
      <header class="deep-section-head">
        <span v-if="section.number" class="deep-number">{{ section.number }}</span>
        <h3>{{ section.title }}</h3>
      </header>

      <template v-for="(block, index) in section.blocks" :key="index">
        <p v-if="block.type === 'p'" class="deep-p">{{ block.text }}</p>

        <ul v-else-if="block.type === 'list'" class="deep-list">
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>

        <h4
          v-else-if="block.type === 'sub'"
          :id="`deep-${section.id}-sub-${index}`"
          class="deep-sub"
        >
          <span>{{ block.label }}</span>{{ block.title }}
        </h4>

        <blockquote v-else-if="block.type === 'callout'" class="deep-callout">
          {{ block.text }}
        </blockquote>

        <CaseFigure v-else-if="block.type === 'image'" :image="block" />

        <CompareSlider
          v-else-if="block.type === 'compare'"
          :before="block.before"
          :after="block.after"
          :caption="block.caption"
          :ratio="block.ratio"
        />

        <div
          v-else-if="block.type === 'gallery'"
          class="deep-gallery"
          :class="`deep-gallery--${block.layout}`"
        >
          <CaseFigure
            v-for="image in block.images"
            :key="image.src || image.slot"
            :image="image"
            :ratio="['pair', 'trio'].includes(block.layout) ? block.ratio : ''"
          />
        </div>
      </template>
    </section>
    </div>
    </div>
    <ImageLightbox ref="lightbox" :images="allImages" />
  </div>
</template>
