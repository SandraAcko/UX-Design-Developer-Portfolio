<script setup>
import { computed, nextTick, ref } from "vue";
import { ChevronLeft, ChevronRight, X } from "lucide-vue-next";

const props = defineProps({ images: { type: Array, required: true } });

const dialog = ref(null);
const stage = ref(null);
const closeButton = ref(null);
const index = ref(0);
let trigger = null;

const current = computed(() => props.images[index.value]);

async function open(src, opener) {
  const found = props.images.findIndex((image) => image.src === src);
  if (found < 0) return;
  index.value = found;
  trigger = opener || document.activeElement;
  dialog.value?.showModal();
  await nextTick();
  closeButton.value?.focus();
}

function close() {
  dialog.value?.close();
  trigger?.focus?.();
}

async function step(direction) {
  const total = props.images.length;
  index.value = (index.value + direction + total) % total;
  await nextTick();
  stage.value?.scrollTo({ top: 0, left: 0 });
}

// Keys must not reach the parent case-study dialog, which would close itself or hijack Tab.
function onKeydown(event) {
  event.stopPropagation();
  if (event.key === "Escape") {
    event.preventDefault();
    close();
  } else if (event.key === "ArrowLeft") {
    step(-1);
  } else if (event.key === "ArrowRight") {
    step(1);
  } else if (event.key === "Tab") {
    const controls = [...dialog.value.querySelectorAll("button:not([disabled])")];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

defineExpose({ open });
</script>

<template>
  <dialog
    ref="dialog"
    class="lightbox"
    aria-label="Enlarged image"
    @cancel.prevent="close"
    @keydown="onKeydown"
    @click.self="close"
  >
    <div v-if="current" class="lightbox-inner">
      <div class="lightbox-bar">
        <span class="lightbox-count">{{ index + 1 }} / {{ images.length }}</span>
        <button
          ref="closeButton"
          type="button"
          class="lightbox-btn"
          aria-label="Close enlarged image"
          @click="close"
        >
          <X :size="22" />
        </button>
      </div>
      <div ref="stage" class="lightbox-stage" @click.self="close">
        <img :src="current.src" :alt="current.alt" />
      </div>
      <p class="lightbox-caption">{{ current.caption }}</p>
      <template v-if="images.length > 1">
        <button
          type="button"
          class="lightbox-btn lightbox-nav lightbox-nav--prev"
          aria-label="Previous image"
          @click="step(-1)"
        >
          <ChevronLeft :size="26" />
        </button>
        <button
          type="button"
          class="lightbox-btn lightbox-nav lightbox-nav--next"
          aria-label="Next image"
          @click="step(1)"
        >
          <ChevronRight :size="26" />
        </button>
      </template>
    </div>
  </dialog>
</template>
