<script setup>
import {
  ArrowUpRight,
  BarChart3,
  Box,
  Check,
  ChevronDown,
  Figma,
  Headphones,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Settings,
  Truck,
  Users,
} from "lucide-vue-next";

defineProps({ project: { type: Object, required: true } });
const speakerImage = `${import.meta.env.BASE_URL}speaker.jpg`;
const projectShots = {
  scms2: [
    {
      src: `${import.meta.env.BASE_URL}SCMS2DeskTop.png`,
      layout: "scms2-desktop-shot",
    },
    {
      src: `${import.meta.env.BASE_URL}SCMS2Mobile.png`,
      layout: "scms2-mobile-shot",
    },
  ],
  miteam: [
    {
      src: `${import.meta.env.BASE_URL}Mi.Team1.png`,
      layout: "miteam-overview-shot",
    },
    {
      src: `${import.meta.env.BASE_URL}Mi.Team2.png`,
      layout: "miteam-users-shot",
    },
  ],
  enzo: [
    {
      src: `${import.meta.env.BASE_URL}Enzo1.png`,
      layout: "enzo-first-shot",
    },
    {
      src: `${import.meta.env.BASE_URL}Enzo2.png`,
      layout: "enzo-second-shot",
    },
  ],
};
</script>

<template>
  <div class="project-preview" :class="project.id" aria-hidden="true">
    <div v-if="project.id === 'scms2'" class="real-project-gallery">
      <div class="scms2-desktop-frame">
        <img
          :src="projectShots.scms2[0].src"
          alt=""
          class="scms2-desktop-shot"
          loading="lazy"
        />
      </div>
      <img
        :src="projectShots.scms2[1].src"
        alt=""
        class="real-project-shot scms2-mobile-shot"
        loading="lazy"
      />
    </div>
    <div v-else-if="projectShots[project.id]" class="real-project-gallery">
      <img
        v-for="shot in projectShots[project.id]"
        :key="shot.src"
        :src="shot.src"
        alt=""
        class="real-project-shot"
        :class="shot.layout"
        loading="lazy"
      />
    </div>
    <img
      v-else-if="project.image"
      :src="project.image"
      :alt="project.imageAlt || `${project.name} design preview`"
      class="actual-project-image"
      loading="lazy"
    />
    <template v-else-if="project.id === 'scms2'">
      <div class="preview-dot-grid"></div>
      <div class="desktop-mockup delivery-mockup">
        <div class="mock-topbar">
          <span class="mock-brand"
            ><Box :size="16" /> scms<span class="text-teal">2</span></span
          ><span class="mock-search"
            ><Search :size="10" /> Search deliveries</span
          ><span class="mock-avatar">SA</span>
        </div>
        <div class="mock-layout">
          <div class="mock-sidebar">
            <LayoutDashboard /><Truck
              class="active-icon"
            /><Users /><BarChart3 /><Settings class="mt-auto" />
          </div>
          <div class="mock-main">
            <div class="mock-breadcrumb">Workspace / Deliveries</div>
            <div class="mock-heading">
              <h4>Delivery overview</h4>
              <span class="mock-primary">+ New delivery</span>
            </div>
            <div class="mock-stats">
              <div>
                <span>Total deliveries</span
                ><strong>248 <small>+12.8%</small></strong>
              </div>
              <div>
                <span>In transit</span><strong>32 <Truck :size="12" /></strong>
              </div>
              <div>
                <span>Delivered</span><strong>216 <Check :size="12" /></strong>
              </div>
            </div>
            <div class="mock-table-title">
              <b>All deliveries <span>248</span></b
              ><span>This month <ChevronDown :size="9" /></span>
            </div>
            <div class="mock-table-row mock-table-header">
              <span>Delivery ID</span><span>Customer</span><span>Status</span
              ><span>Expected</span>
            </div>
            <div
              v-for="(customer, index) in [
                'Oak & Co.',
                'North Studio',
                'Studio Eight',
                'Green House',
                'Oak & Co.',
              ]"
              :key="index"
              class="mock-table-row"
            >
              <b>#DL-{{ 2048 + index }}</b
              ><span>{{ customer }}</span
              ><span
                ><i
                  class="status-pill"
                  :class="{ transit: index === 1 || index === 3 }"
                  >{{
                    index === 1 || index === 3 ? "In transit" : "Delivered"
                  }}</i
                ></span
              ><span>24 Jun 2025</span>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-sticker">
        <Check :size="16" /> A little more clarity.
      </div>
    </template>
    <template v-else-if="project.id === 'miteam'">
      <div class="desktop-mockup analytics-mockup">
        <div class="mock-topbar">
          <span class="mock-brand">mi<span class="text-teal">.team</span></span
          ><span class="mock-search"><Search :size="10" /> Search anything</span
          ><span class="mock-avatar">SA</span>
        </div>
        <div class="mock-layout">
          <div class="mock-sidebar">
            <LayoutDashboard
              class="active-icon"
            /><BarChart3 /><Users /><Settings class="mt-auto" />
          </div>
          <div class="mock-main">
            <div class="mock-breadcrumb">Your workspace, at a glance</div>
            <div class="mock-heading">
              <h4>Let's see the bigger picture.</h4>
              <span class="mock-filter"
                >Last 7 days <ChevronDown :size="9"
              /></span>
            </div>
            <div class="mock-stats">
              <div>
                <span>Active devices</span
                ><strong>128 <small>+8.2%</small></strong>
              </div>
              <div>
                <span>Activity score</span><strong>86<em>/100</em></strong>
              </div>
              <div>
                <span>Team members</span><strong>42 <small>+4</small></strong>
              </div>
            </div>
            <div class="chart-layout">
              <div class="chart-panel">
                <div class="chart-label">
                  <b>Activity overview</b><MoreHorizontal :size="13" />
                </div>
                <div class="bar-chart">
                  <div
                    v-for="(height, index) in [45, 68, 52, 86, 72, 96, 60]"
                    :key="index"
                  >
                    <i :style="{ height: height + '%' }"></i
                    ><span>{{
                      ["M", "T", "W", "T", "F", "S", "S"][index]
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="chart-panel">
                <div class="chart-label"><b>Device status</b></div>
                <div class="donut">
                  <span>128<small>devices</small></span>
                </div>
                <div class="chart-legend"><i></i> Online <b>92%</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-sticker">
        <BarChart3 :size="16" /> Less noise. More insight.
      </div>
    </template>
    <template v-else-if="project.id === 'enzo'">
      <span class="enzo-wordmark">enzo.</span
      ><span class="enzo-background-copy">Find your<br />own frequency.</span>
      <div class="phone-mockup phone-back">
        <div class="phone-camera"></div>
        <div class="phone-content">
          <span class="phone-brand">enzo.</span
          ><span class="phone-eyebrow">YOUR EVERYDAY, AMPLIFIED</span>
          <h4>Sound that<br />moves you.</h4>
          <img
            :src="speakerImage"
            alt=""
            class="speaker-image"
            loading="lazy"
          />
          <div class="phone-product">
            <b>Enzo One</b><span>Portable. Powerful. Yours.</span>
          </div>
          <div class="phone-cta">
            Explore the collection <ArrowUpRight :size="12" />
          </div>
        </div>
      </div>
      <div class="phone-mockup phone-front">
        <div class="phone-camera"></div>
        <div class="phone-content">
          <div class="phone-nav">
            <span class="phone-brand">enzo.</span><Headphones :size="15" />
          </div>
          <h4>Your sound.<br />Your space.</h4>
          <div class="phone-speaker-crop">
            <img :src="speakerImage" alt="" loading="lazy" />
          </div>
          <div class="phone-product">
            <b>Enzo One</b><span>A little speaker. A big feeling.</span>
          </div>
          <div class="swatches"><i></i><i></i><i></i></div>
          <div class="phone-cta">Make it yours <ArrowUpRight :size="12" /></div>
        </div>
      </div>
    </template>
    <div v-else class="generic-preview">
      <Figma :size="32" />
      <h4>{{ project.name }}</h4>
      <p>{{ project.category }}</p>
    </div>
  </div>
</template>
