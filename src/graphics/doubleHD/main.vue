<script setup lang="ts">
import { useHead } from '@vueuse/head';
import gameInfo from '../components/gameInfo.vue';
import runnerNameplate from '../components/runnerNameplate.vue';
import timerAndEstimate from '../components/timerAndEstimate.vue';
import commentatorNameplate from '../components/commentatorNameplate.vue';
import sponsor from '../components/sponsor.vue';

useHead({ title: 'doubleHD' });
</script>

<template>
  <sponsor />
  <timerAndEstimate />
  <gameInfo />
  <runnerNameplate class="player1" :index="0" />
  <runnerNameplate class="player2" :index="1" />
  <commentatorNameplate class="commentator1" :index="0" :index2="0" />
</template>

<style>
@import url('../css/reset.css');
@import url('../css/common.css');
@import url('../css/doubleHd.css');
</style>
