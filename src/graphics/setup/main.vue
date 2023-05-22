<script setup lang="ts">
import { useHead } from '@vueuse/head';
import SpotifyTrack from '../components/spotifyTrack.vue';
import SetupSchedule from '../components/setupSchedule/setupSchedule.vue';
import sponsor from '../components/sponsor.vue';

useHead({ title: 'Setup' });
</script>

<template>
  <div class="next_container" />
  <sponsor />
  <SetupSchedule />
  <SpotifyTrack />
</template>

<style>
@import url('../css/reset.css');
@import url('../css/common.css');
@import url('../css/setup.css');
</style>
