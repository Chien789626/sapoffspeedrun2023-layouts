<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { computed, onMounted, Ref, ref, registerRuntimeCompiler } from 'vue';
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
    if (name.value == '-') {
      return;
    }

    switch (isShow.value) {
      case sns.name:
        if (twitch.value == '') {
          isShow.value = 2;
        } else {
          isShow.value++;
        }
        break;
      case sns.twitch:
        if (twitter.value == '') {
          isShow.value = 3;
        } else {
          isShow.value++;
        }
        break;
      case sns.twitter:
        if (youtube.value == '') {
          isShow.value = 0;
        } else {
          isShow.value++;
        }
        break;
      case sns.youtube:
        isShow.value = 0;
        break;
      default:
        isShow.value++;
    }
  }, 30000);
});

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
      <div v-if="sns.name === isShow && player.includes(name)" key="name" class="player_name">
        <span> {{ name }}</span>
      </div>
      <div v-else-if="sns.twitch === isShow && player.includes(twitch)" key="twitch" class="sns">
        <span class="twitch_icon">
          <img src="../images/icon/twitch.png" />
        </span>
        <span class="twitch"> {{ twitch }}</span>
      </div>
      <div v-else-if="sns.twitter === isShow && player.includes(twitter)" key="twitter" class="sns">
        <span class="twitter_icon">
          <img src="../images/icon/twitter.png" />
        </span>
        <span class="twitter"> {{ twitter }}</span>
      </div>
      <div v-else-if="sns.youtube === isShow && player.includes(youtube)" key="youtube" class="sns">
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
