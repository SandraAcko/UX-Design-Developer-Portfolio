<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Figma,
  Linkedin,
  Play,
  Sparkles,
  X,
} from "lucide-vue-next";
import { projects } from "./data/projects";
import ProjectPreview from "./components/ProjectPreview.vue";

const activeProject = ref(null);
const dialog = ref(null);
const copied = ref(false);
let previousFocus;
let copyTimer;
const email = "sandra-atkinson@outlook.com";

async function openProject(project) {
  previousFocus = document.activeElement;
  activeProject.value = project;
  await nextTick();
  dialog.value?.showModal();
}

function closeProject() {
  dialog.value?.close();
  activeProject.value = null;
  previousFocus?.focus();
}

function handleDialogTab(event) {
  const controls = [...event.currentTarget.querySelectorAll('a[href], button:not([disabled])')];
  const firstControl = controls[0];
  const lastControl = controls.at(-1);

  if (event.shiftKey && document.activeElement === firstControl) {
    event.preventDefault();
    lastControl?.focus();
  } else if (!event.shiftKey && document.activeElement === lastControl) {
    event.preventDefault();
    firstControl?.focus();
  }
}

watch(activeProject, (project) => {
  document.body.style.overflow = project ? "hidden" : "";
});

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    copied.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch {
    window.location.href = `mailto:${email}`;
  }
}

onBeforeUnmount(() => {
  clearTimeout(copyTimer);
  document.body.style.overflow = "";
});
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header page-width">
    <a href="#" class="wordmark" aria-label="Sandra Atkinson, home"
      >sandra<span class="wordmark-flower" aria-hidden="true">✳</span></a
    >
    <nav aria-label="Main navigation">
      <a href="#work">Work</a><a href="#about">About</a
      ><a href="#contact" class="nav-contact"
        >Let's talk <ArrowDownRight :size="15"
      /></a>
    </nav>
  </header>

  <main id="main">
    <section class="hero page-width" aria-labelledby="intro-title">
      <div class="hero-topline">
        <span class="eyebrow">UX DESIGN & WEB DEVELOPMENT</span
        ><span class="availability"><i></i> Open to junior UX roles</span>
      </div>
      <h1 id="intro-title">
        Sandra Atkinson<span class="coral">.</span><br />A
        <span class="hero-serif">human</span> approach<span class="coral"
          >.</span
        ><Sparkles class="hero-spark" :stroke-width="1.2" aria-hidden="true" />
      </h1>
      <div class="hero-bottom">
        <p>
          I'm a Digital UX degree apprentice and web developer,<br
            class="desktop-break"
          />
          bringing user-focused ideas from Figma to the web.
        </p>
        <a href="#work" class="work-link"
          >Explore my work <span><ArrowDown :size="19" /></span
        ></a>
      </div>
      <div class="hero-note" aria-hidden="true">
        A little curiosity goes a long way.<ArrowDownRight
          :size="23"
          :stroke-width="1.2"
        />
      </div>
    </section>

    <section
      id="work"
      class="work-section page-width"
      aria-labelledby="work-title"
    >
      <div class="section-heading">
        <h2 id="work-title">
          Selected work<span class="coral">
            ({{ String(projects.length).padStart(2, "0") }})</span
          >
        </h2>
        <span>Real challenges. Thoughtful solutions.</span>
      </div>
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-row"
      >
        <button
          class="preview-button"
          :aria-label="`Read the ${project.name} case study`"
          @click="openProject(project)"
        >
          <ProjectPreview :project="project" /><span class="preview-open"
            ><ArrowUpRight :size="21"
          /></span>
        </button>
        <div class="project-info">
          <div class="project-meta">
            <span>{{ project.type }}</span
            ><span
              >{{ String(index + 1).padStart(2, "0") }} /
              {{ String(projects.length).padStart(2, "0") }}</span
            >
          </div>
          <p class="project-client">
            {{ project.client
            }}<span v-if="project.award" class="award">{{
              project.award
            }}</span>
          </p>
          <h3>{{ project.name }}</h3>
          <p class="project-subtitle">{{ project.category }}</p>
          <p class="project-summary">{{ project.summary }}</p>
          <ul class="tags" aria-label="Project skills">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <button class="case-study-link" @click="openProject(project)">
            Explore project <ArrowUpRight :size="19" />
          </button>
        </div>
      </article>
      <div class="work-end">
        <span>Thoughtful by design. Always learning.</span
        ><Sparkles :size="20" :stroke-width="1.4" aria-hidden="true" />
      </div>
    </section>

    <section id="about" class="about-section" aria-labelledby="about-title">
      <div class="page-width about-layout">
        <div>
          <span class="eyebrow">A LITTLE ABOUT ME</span>
          <h2 id="about-title">
            Curious mind.<br /><span class="hero-serif">Considered</span>
            design.
          </h2>
          <span class="about-flower" aria-hidden="true">✳</span>
        </div>
        <div class="about-copy">
          <p class="about-lead">
            I'm a Digital UX degree apprentice and web developer, combining
            commercial experience with a people-first approach to design.
          </p>
          <p>
            Since October 2023, I've worked at Network Ltd in a small Agile team,
            designing and developing commercial web applications. I use Figma to
            explore requirements and prototype interfaces, then bring ideas into
            implementation with Vue, JavaScript and Tailwind.
          </p>
          <p>
            Before moving into tech, I spent eight years in customer service at
            Coventry Building Society. Listening to different needs, resolving
            problems and explaining complex information still shapes how I
            approach UX.
          </p>
          <p>
            I'm studying BSc (Hons) Digital UX Design at University Centre Weston,
            with current results averaging at First-Class level. I also completed
            a Level 4 Software Developer apprenticeship in 2025.
          </p>
          <p>
            I'm looking to bring that mix of empathy and technical experience to
            a junior UX role where I can contribute and keep learning.
          </p>
          <div class="about-skills">
            <span>Figma prototyping</span><span>Wireframing</span
            ><span>User-centred design</span><span>Accessibility awareness</span
            ><span>Vue & JavaScript</span><span>Agile collaboration</span>
          </div>
        </div>
      </div>
    </section>

    <section
      id="contact"
      class="contact-section page-width"
      aria-labelledby="contact-title"
    >
      <div class="contact-top">
        <span class="eyebrow">LET'S MAKE SOMETHING MEANINGFUL</span
        ><span class="availability"><i></i> Open to opportunities</span>
      </div>
      <h2 id="contact-title">
        Good design starts<br />with a
        <span class="hero-serif">conversation.</span
        ><span class="coral">*</span>
      </h2>
      <div class="contact-bottom">
        <a :href="`mailto:${email}`" class="email-link"
          >{{ email }}<ArrowUpRight :size="24" /></a
        ><button
          class="copy-button"
          :aria-label="copied ? 'Email address copied' : 'Copy email address'"
          :title="copied ? 'Copied' : 'Copy email address'"
          @click="copyEmail"
        >
          <Check v-if="copied" :size="18" /><Copy v-else :size="18" /></button
        ><span class="copy-status" role="status">{{
          copied ? "Copied!" : ""
        }}</span
        ><a
          href="https://www.linkedin.com/in/sandraacko"
          class="linkedin-link"
          target="_blank"
          rel="noopener noreferrer"
          ><Linkedin :size="17" /> LinkedIn <ArrowUpRight :size="15"
        /></a>
      </div>
    </section>
  </main>

  <footer class="site-footer page-width">
    <a href="#" class="wordmark" aria-label="Back to top"
      >sandra<span class="wordmark-flower" aria-hidden="true">✳</span></a
    ><span>Made with care & a little curiosity.</span
    ><span>© {{ new Date().getFullYear() }} Sandra Atkinson</span>
  </footer>

  <dialog
    ref="dialog"
    class="project-dialog"
    aria-labelledby="dialog-title"
    @cancel.prevent="closeProject"
    @keydown.esc.prevent.stop="closeProject"
    @keydown.tab="handleDialogTab"
    @click="
      (event) => {
        if (event.target === dialog) closeProject();
      }
    "
  >
    <template v-if="activeProject"
      ><div class="dialog-header">
        <span class="eyebrow"
          >{{ activeProject.type }} / {{ activeProject.client }}</span
        ><button
          class="icon-button"
          aria-label="Close case study"
          autofocus
          @click="closeProject"
        >
          <X :size="22" />
        </button>
      </div>
      <div class="dialog-body">
        <h2 id="dialog-title">{{ activeProject.name }}</h2>
        <p class="dialog-subtitle">{{ activeProject.category }}</p>
        <ProjectPreview :project="activeProject" />
        <div class="case-section">
          <h3>The project</h3>
          <p>{{ activeProject.context }}</p>
        </div>
        <div class="case-section">
          <h3>The challenge</h3>
          <p>{{ activeProject.challenge }}</p>
        </div>
        <div class="case-section">
          <h3>My approach</h3>
          <ul>
            <li v-for="step in activeProject.approach" :key="step">
              {{ step }}
            </li>
          </ul>
        </div>
        <div class="case-section">
          <h3>The deliverable</h3>
          <p>{{ activeProject.outcome }}</p>
        </div>
        <div class="project-resources">
          <a
            v-if="activeProject.figmaUrl"
            :href="activeProject.figmaUrl"
            class="resource-link"
            target="_blank"
            rel="noopener noreferrer"
            ><Figma :size="18" /> View Figma prototype
            <ExternalLink :size="15" /></a
          ><span v-else class="resource-unavailable"
            ><Figma :size="18" /> Prototype link coming soon</span
          ><template v-if="activeProject.hasVideo"
            ><a
              v-if="activeProject.videoUrl"
              :href="activeProject.videoUrl"
              class="resource-link"
              target="_blank"
              rel="noopener noreferrer"
              ><Play :size="18" /> Watch project video
              <ExternalLink :size="15" /></a
            ><span v-else class="resource-unavailable"
              ><Play :size="18" /> Video link coming soon</span
            ></template
          >
        </div>
        <a
          :href="`mailto:${email}?subject=${encodeURIComponent(`Let's talk about ${activeProject.name}`)}`"
          class="dialog-contact"
          >Let's talk about this project <ArrowRight :size="17"
        /></a></div
    ></template>
  </dialog>
</template>
