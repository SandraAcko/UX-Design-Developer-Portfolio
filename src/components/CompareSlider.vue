<script setup>
import { ref } from "vue";

defineProps({
  before: { type: Object, required: true },
  after: { type: Object, required: true },
  caption: { type: String, default: "" },
});

const position = ref(50);
</script>

<template>
  <figure class="deep-figure deep-compare-figure">
    <div class="deep-compare" :style="{ '--pos': `${position}%` }">
      <img class="deep-compare-img" :src="after.src" :alt="after.alt" loading="lazy" />
      <img
        class="deep-compare-img deep-compare-before"
        :src="before.src"
        :alt="before.alt"
        loading="lazy"
      />
      <span class="deep-compare-tag deep-compare-tag--before">{{ before.label }}</span>
      <span class="deep-compare-tag deep-compare-tag--after">{{ after.label }}</span>
      <span class="deep-compare-handle" aria-hidden="true"><i></i></span>
      <input
        v-model.number="position"
        class="deep-compare-range"
        type="range"
        min="0"
        max="100"
        step="0.5"
        :aria-label="`Compare ${before.label} and ${after.label}`"
      />
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
