<script setup>
import { inject } from "vue";
import { ImageIcon, Maximize2 } from "lucide-vue-next";

// `ratio` frames the image at a fixed aspect-ratio (used in galleries so paired images line up).
defineProps({
  image: { type: Object, required: true },
  ratio: { type: String, default: "" },
});
const openImage = inject("openImage", null);
</script>

<template>
  <figure class="deep-figure" :class="`deep-figure--${image.size || 'full'}`">
    <div
      v-if="image.src"
      class="deep-media"
      :class="{ 'deep-media--framed': ratio }"
      :style="ratio ? { aspectRatio: ratio } : undefined"
    >
      <button
        type="button"
        class="deep-zoom"
        :aria-label="`Enlarge image: ${image.caption}`"
        @click="openImage?.(image.src, $event.currentTarget)"
      >
        <img :src="image.src" :alt="image.alt" loading="lazy" />
        <span class="deep-zoom-icon" aria-hidden="true"><Maximize2 :size="16" /></span>
      </button>
    </div>
    <div v-else class="deep-placeholder" :class="`ratio-${image.ratio}`">
      <ImageIcon :size="26" :stroke-width="1.4" aria-hidden="true" />
      <b>Image {{ String(image.slot).padStart(2, "0") }}</b>
    </div>
    <figcaption>{{ image.caption }}</figcaption>
  </figure>
</template>
