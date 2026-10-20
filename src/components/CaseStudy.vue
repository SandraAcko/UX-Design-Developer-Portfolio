<script setup>
import CaseFigure from "./CaseFigure.vue";
import CompareSlider from "./CompareSlider.vue";

defineProps({ study: { type: Object, required: true } });

function scrollToSection(id) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(`deep-${id}`)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
</script>

<template>
  <div class="deep-dive">
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

    <section
      v-for="section in study.sections"
      :id="`deep-${section.id}`"
      :key="section.id"
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

        <h4 v-else-if="block.type === 'sub'" class="deep-sub">
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
</template>
