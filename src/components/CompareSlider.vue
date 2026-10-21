<script setup>
import { inject, ref } from "vue";
import { Maximize2 } from "lucide-vue-next";

defineProps({
  before: { type: Object, required: true },
  after: { type: Object, required: true },
  caption: { type: String, default: "" },
  ratio: { type: String, default: "" },
});

const position = ref(50);
const openImage = inject("openImage", null);
</script>

<template>
  <figure class="deep-figure deep-compare-figure">
    <div
      class="deep-compare"
      :style="{ '--pos': `${position}%`, ...(ratio ? { aspectRatio: ratio } : {}) }"
    >
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
      <button
        type="button"
        class="deep-zoom-icon deep-zoom-icon--button"
        aria-label="Enlarge images"
        @click="openImage?.(before.src, $event.currentTarget)"
      >
        <Maximize2 :size="16" />
      </button>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
