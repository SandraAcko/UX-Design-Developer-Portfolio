<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
  RotateCcw,
  Sparkles,
  X,
} from "lucide-vue-next";
import { projects } from "./data/projects";
import ProjectPreview from "./components/ProjectPreview.vue";
import CaseStudy from "./components/CaseStudy.vue";

const activeProject = ref(null);
const dialog = ref(null);
const copied = ref(false);
const splashVideo = ref(null);
const skipIntroButton = ref(null);
const mainContent = ref(null);
const splashVisible = ref(true);
const splashFading = ref(false);
const splashLeaving = ref(false);
const portfolioVisible = ref(false);
const sunriseProgress = ref(0);
const heroPhase = ref("idle");
const heroAnimationStarted = ref(false);
const heroStatic = ref(false);
const heroSequenceKey = ref(0);
const openingLine = Array.from("WHEN THINGS GO");
const sidewaysLine = Array.from("SIDEWAYS...");
const finalLines = ["I'M", "READY", "FOR", "THE", "NEXT", "CHALLENGE"].map(
  (line) => Array.from(line),
);
let previousFocus;
let copyTimer;
let splashTimer;
let heroTimer;
let scrollFrame;
const email = "sandra-atkinson@outlook.com";
const splashVideoSrc = `${import.meta.env.BASE_URL}PoftfolioSplashAnimation.mp4`;
const homeIconSrc = `${import.meta.env.BASE_URL}Icon.svg`;
const projectLogos = {
  scms2: `${import.meta.env.BASE_URL}SCLogo.svg`,
  miteam: `${import.meta.env.BASE_URL}mi.teamLogo.svg`,
  enzo: `${import.meta.env.BASE_URL}EnzoLogo.svg`,
};

function updateSunriseProgress() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sunriseProgress.value = 0;
    return;
  }

  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const projectsSection = document.getElementById("work");
    if (!projectsSection) return;

    const projectsTop = projectsSection.getBoundingClientRect().top + window.scrollY;
    const transitionEnd = Math.max(1, projectsTop - window.innerHeight * 0.25);
    sunriseProgress.value = Math.min(1, Math.max(0, window.scrollY / transitionEnd));
  });
}

function startHeroSequence() {
  clearTimeout(heroTimer);
  heroPhase.value = "idle";
  heroAnimationStarted.value = false;
  heroStatic.value = false;
  heroSequenceKey.value += 1;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroStatic.value = true;
    heroPhase.value = "message";
    return;
  }

  heroAnimationStarted.value = true;
  heroPhase.value = "typing";
  heroTimer = setTimeout(() => {
    heroPhase.value = "falling";
    heroTimer = setTimeout(() => {
      heroPhase.value = "rising";
      heroTimer = setTimeout(() => {
        heroPhase.value = "message";
      }, 3450);
    }, 1050);
  }, 2050);
}

function finishSplash() {
  if (!splashVisible.value || splashFading.value) return;

  const shouldFocusMain = document.activeElement === skipIntroButton.value;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  splashFading.value = true;
  splashVideo.value?.pause();

  splashTimer = setTimeout(() => {
    portfolioVisible.value = true;
    startHeroSequence();

    if (reduceMotion) {
      splashVisible.value = false;
      if (shouldFocusMain) {
        nextTick(() => mainContent.value?.focus({ preventScroll: true }));
      }
      return;
    }

    splashLeaving.value = true;
    splashTimer = setTimeout(() => {
      splashVisible.value = false;
      if (shouldFocusMain) {
        nextTick(() => mainContent.value?.focus({ preventScroll: true }));
      }
    }, 850);
  }, reduceMotion ? 0 : 500);
}

onMounted(() => {
  window.addEventListener("scroll", updateSunriseProgress, { passive: true });
  window.addEventListener("resize", updateSunriseProgress);
  updateSunriseProgress();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    splashVisible.value = false;
    portfolioVisible.value = true;
    startHeroSequence();
    return;
  }

  if (splashVideo.value) splashVideo.value.playbackRate = 1.12;
  splashVideo.value?.play().catch(finishSplash);
});

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
  clearTimeout(splashTimer);
  clearTimeout(heroTimer);
  window.removeEventListener("scroll", updateSunriseProgress);
  window.removeEventListener("resize", updateSunriseProgress);
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  document.body.style.overflow = "";
});
</script>

<template>
  <section
    v-if="splashVisible"
    class="splash-screen"
    :class="{ 'splash-screen--leaving': splashLeaving }"
    aria-label="Portfolio introduction"
  >
    <div
      class="splash-content"
      :class="{ 'splash-content--fading': splashFading }"
    >
      <video
        ref="splashVideo"
        class="splash-video"
        :src="splashVideoSrc"
        autoplay
        muted
        playsinline
        preload="auto"
        aria-label="Animated portfolio introduction"
        @ended="finishSplash"
        @error="finishSplash"
      ></video>
      <button
        ref="skipIntroButton"
        class="splash-skip"
        type="button"
        @click="finishSplash"
      >
        Skip intro <ArrowRight :size="15" aria-hidden="true" />
      </button>
    </div>
  </section>

  <div
    class="portfolio-content"
    :class="{ 'portfolio-content--visible': portfolioVisible }"
    :style="{ '--sunrise-progress': `${sunriseProgress * 100}%` }"
    :inert="!portfolioVisible"
    :aria-hidden="!portfolioVisible"
  >
    <div class="sunrise-backdrop" aria-hidden="true"></div>
    <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header page-width">
    <div class="flex flex-col">
      <a href="#" class="wordmark" aria-label="Sandra Atkinson, home">
        <img class="wordmark-icon" :src="homeIconSrc" alt="" />
        <span>Sandra Atkinson</span>
      </a>
      <span class="eyebrow coral">UX DESIGN DEGREE APPRENTICE & WEB DEVELOPER</span>
    </div>
    <nav aria-label="Main navigation">
      <a href="#work">Projects</a><a href="#about">About Me</a
      ><a href="#contact" class="nav-contact"
        >Let's talk <ArrowDownRight :size="15"
      /></a>
    </nav>
  </header>

  <main id="main" ref="mainContent" tabindex="-1">
    <section class="hero page-width" aria-labelledby="impact-title">
      <div
        :key="heroSequenceKey"
        class="impact-stage"
        :class="{
          'impact-stage--active': heroAnimationStarted,
          'impact-stage--dropped': ['falling', 'rising', 'message'].includes(heroPhase),
          'impact-stage--answer': ['rising', 'message'].includes(heroPhase),
          'impact-stage--message': heroPhase === 'message',
          'impact-stage--static': heroStatic,
        }"
      >
        <h1
          id="impact-title"
          class="impact-title"
          aria-label="When things go sideways... It's time to find a new way up. I'm ready for the next challenge."
        >
          <span class="impact-original" aria-hidden="true">
            <span class="impact-original-flip">
              <span class="impact-line impact-line--opening">
                <span
                  v-for="(character, index) in openingLine"
                  :key="`opening-${index}`"
                  class="impact-letter"
                  :style="{ '--letter-delay': `${index * 58}ms` }"
                  >{{ character === " " ? "\u00a0" : character }}</span
                >
              </span>
              <span class="impact-line impact-line--sideways">
                <span
                  v-for="(character, index) in sidewaysLine"
                  :key="`sideways-${index}`"
                  class="impact-letter"
                  :style="{
                    '--letter-delay': `${(openingLine.length + index + 2) * 58}ms`,
                  }"
                  >{{ character }}</span
                >
              </span>
            </span>
          </span>
          <span class="impact-answer" aria-hidden="true">
            <span>IT'S TIME TO FIND A</span>
            <span class="impact-answer-emphasis">NEW WAY UP!</span>
          </span>
          <span class="impact-final" aria-hidden="true">
            <span
              v-for="(line, lineIndex) in finalLines"
              :key="`final-line-${lineIndex}`"
              class="impact-final-line"
            >
              <span
                v-for="(character, characterIndex) in line"
                :key="`final-letter-${lineIndex}-${characterIndex}`"
                class="impact-final-letter"
                :class="{ 'impact-answer-emphasis': lineIndex > 1 }"
                :style="{
                  '--final-letter-delay': `${(lineIndex * 3 + characterIndex) * 52}ms`,
                }"
                >{{ character }}</span
              >
            </span>
          </span>
        </h1>
        <button
          v-if="heroPhase === 'message' || heroStatic"
          class="impact-replay"
          type="button"
          aria-label="Replay hero animation"
          title="Replay animation"
          @click="startHeroSequence"
        >
          <RotateCcw :size="15" aria-hidden="true" /> Replay
        </button>
      </div>
      <div class="hero-bottom">
        <div class="hero-intro-copy">
          <strong>Bridging the gap between form and function</strong>
          <p>An end-to-end creator who builds in fast-paced Agile environments, managing every stage of the lifecycle: gathering requirements, iterating on UX, writing the code, deploying, and maintaining.</p>
        </div>
        <a href="#work" class="work-link"
          >Explore my work <span><ArrowDown :size="19" /></span
        ></a>
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
          <h3 class="project-title">
            <img
              v-if="projectLogos[project.id]"
              class="project-logo"
              :src="projectLogos[project.id]"
              alt=""
              aria-hidden="true"
            />
            <span>{{ project.name }}</span>
          </h3>
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
    ><span></span
    ><span>© {{ new Date().getFullYear() }} Sandra Atkinson</span>
  </footer>

  <dialog
    ref="dialog"
    class="project-dialog"
    :class="{ 'project-dialog--deep': activeProject?.deepDive }"
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
        <CaseStudy v-if="activeProject.deepDive" :study="activeProject.deepDive" />
        <template v-else>
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
        </template>
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
  </div>
</template>
