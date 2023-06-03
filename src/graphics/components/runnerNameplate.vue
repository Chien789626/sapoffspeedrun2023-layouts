<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { computed, onMounted, Ref, ref } from 'vue';
import { RunDataActiveRun, Timer } from '@sapoffspeedrun2023-layouts/types/schemas/speedcontrol';
import { SNS } from '@sapoffspeedrun2023-layouts/types/schemas/Sns';
import * as util from '../util/format';

interface Props {
  index: number;
}

const sns: SNS = {
  name: 0,
  twitch: 1,
  twitter: 2,
  youtube: 3,
};

const stringArray: (string | undefined)[] = [];
const player = ref(stringArray);

let isShow: Ref<number> = ref(0);

onMounted(() => {
  setInterval(() => {
    //時間出来たら関数化
    if (name.value == '-') {
      return;
    }
    if (twitch.value == '') {
      return;
    }
    if (sns.twitch === isShow.value) {
      if (twitter.value === '') {
        isShow.value = 0;
        return;
      }
    }
    if (sns.twitter === isShow.value) {
      if (youtube.value === '') {
        isShow.value = 0;
        return;
      }
    }
    if (sns.youtube === isShow.value) {
      isShow.value = 0;
      return;
    }
    isShow.value++;
  }, 30000);
});

/*
onBeforeMount(() => {
  clearInterval();
});
*/

const props = defineProps<Props>();

const runDataActiveRun = useReplicant<RunDataActiveRun>('runDataActiveRun', 'nodecg-speedcontrol');

const timer = useReplicant<Timer>('timer', 'nodecg-speedcontrol');

const name = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  player.value.push(runDataActiveRun?.data.teams[props.index].players[0].name);
  return runDataActiveRun?.data.teams[props.index].players[0].name;
});

const twitch = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (!runDataActiveRun?.data.teams[props.index].players[0].social.twitch) {
    return '';
  }
  player.value.push(runDataActiveRun?.data.teams[props.index].players[0].social.twitch);
  return runDataActiveRun?.data.teams[props.index].players[0].social.twitch;
});

const twitter = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (!runDataActiveRun?.data.teams[props.index].players[0].customData.player_twitter) {
    return '';
  }
  player.value.push(runDataActiveRun?.data.teams[props.index].players[0].customData.player_twitter);
  return runDataActiveRun?.data.teams[props.index].players[0].customData.player_twitter;
});

const youtube = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (!runDataActiveRun?.data.teams[props.index].players[0].customData.player_youtube) {
    return '';
  }
  player.value.push(runDataActiveRun?.data.teams[props.index].players[0].customData.player_youtube);
  return runDataActiveRun?.data.teams[props.index].players[0].customData.player_youtube;
});

const finishTime = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  const teamId = runDataActiveRun?.data.teams[props.index].id;
  if (!timer?.data?.teamFinishTimes[teamId]) {
    return '';
  }
  const finish = timer?.data?.teamFinishTimes[teamId];
  if (finish.state === 'forfeit') {
    return '';
  }
  if (finish.state === 'completed') {
    return util.formatSeconds(Math.trunc(finish.milliseconds / 1000));
  }
  return '';
});
</script>

<template>
  <div :class="{ clear: finishTime }">
    <div class="player_time">
      {{ finishTime }}
    </div>
    <div class="nameplate">
      <span class="controller">
        <img src="../images/icon/controller.png" />
      </span>
    </div>
    <transition name="social" mode="out-in">
      <div v-if="sns.name === isShow && name === player[sns.name]" key="name" class="player_name">
        <span> {{ name }}</span>
      </div>
      <div
        v-else-if="sns.twitch === isShow && twitch === player[sns.twitch]"
        key="twitch"
        class="sns"
      >
        <span class="twitch_icon">
          <img src="../images/icon/twitch.png" />
        </span>
        <span class="twitch"> {{ twitch }}</span>
      </div>
      <div
        v-else-if="sns.twitter === isShow && twitter === player[sns.twitter]"
        key="youtube"
        class="sns"
      >
        <span class="twitter_icon">
          <img src="../images/icon/twitter.png" />
        </span>
        <span class="twitter"> {{ twitter }}</span>
      </div>
      <div
        v-else-if="sns.youtube === isShow && youtube === player[sns.youtube]"
        key="twitter"
        class="sns"
      >
        <span class="youtube_icon">
          <img src="../images/icon/youtube.png" />
        </span>
        <span class="youtube"> {{ youtube }}</span>
      </div>
    </transition>
  </div>
</template>

<style>
.social-enter-active {
  transition: all 1s 1s;
}

.social-leave-active {
  transition: all 1s;
}

.social-enter-from,
.social-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
