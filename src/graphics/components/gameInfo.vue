<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { computed } from 'vue';
import { RunDataActiveRun } from '@sapoffspeedrun2023-layouts/types/schemas/speedcontrol';

const runDataActiveRun = useReplicant<RunDataActiveRun>(
  'runDataActiveRun',
  'nodecg-speedcontrol'
);

const runTitle = computed(() => runDataActiveRun?.data?.game ?? '');
const runCategory = computed(() => runDataActiveRun?.data?.category ?? '');
const runSystem = computed(() => runDataActiveRun?.data?.system ?? '');
</script>

<template>
  <div class="gametitle">
    <span>
      {{ runTitle }}
    </span>
  </div>
  <div class="runcategory">
    <span>
      {{ runCategory }}
    </span>
  </div>
  <div class="runsystem">
    <span>
      {{ runSystem }}
    </span>
  </div>
</template>
