<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { computed, onMounted, Ref, ref } from 'vue';
import { RunDataActiveRun } from '@sapoffspeedrun2023-layouts/types/schemas/speedcontrol';
import { SNS } from '@sapoffspeedrun2023-layouts/types/schemas/Sns';

interface Props {
  index: number;
  index2: number;
}

const sns: SNS = {
  name: 0,
  twitch: 1,
  twitter: 2,
  youtube: 3,
};

const stringArray: (string | undefined)[] = [];
const commentator = ref(stringArray);

let isShow: Ref<number> = ref(0);

onMounted(() => {
  //時間出来たら関数化
  setInterval(() => {
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
  }, 15000);
});

/*
onBeforeMount(() => {
  clearInterval();
});
*/

const props = defineProps<Props>();

const runDataActiveRun = useReplicant<RunDataActiveRun>('runDataActiveRun', 'nodecg-speedcontrol');

const name = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  commentator.value.push(
    runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_name
  );
  return runDataActiveRun?.data.teams[props.index].players[props.index2].customData
    .commentator_name;
});

const twitch = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (
    !runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_twitch
  ) {
    return '';
  }
  commentator.value.push(
    runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_twitch
  );
  return runDataActiveRun?.data.teams[props.index].players[props.index2].customData
    .commentator_twitch;
});

const twitter = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (
    !runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_twitter
  ) {
    return '';
  }
  commentator.value.push(
    runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_twitter
  );
  return runDataActiveRun?.data.teams[props.index].players[props.index2].customData
    .commentator_twitter;
});

const youtube = computed(() => {
  if (!runDataActiveRun?.data || !runDataActiveRun?.data.teams[props.index]) {
    return '';
  }
  if (
    !runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_youtube
  ) {
    return '';
  }
  commentator.value.push(
    runDataActiveRun?.data.teams[props.index].players[props.index2].customData.commentator_youtube
  );
  return runDataActiveRun?.data.teams[props.index].players[props.index2].customData
    .commentator_youtube;
});
</script>

<template>
  <div v-if="name != '-'">
    <div class="nameplate">
      <span class="microphone">
        <img src="../images/icon/commentator.png" />
      </span>
    </div>
    <transition name="social" mode="out-in">
      <div
        v-if="sns.name === isShow && name === commentator[sns.name]"
        key="name"
        class="commentator_name"
      >
        <span> {{ name }}</span>
      </div>
      <div
        v-else-if="sns.twitch === isShow && twitch === commentator[sns.twitch]"
        key="twitch"
        class="sns"
      >
        <span class="twitch_icon">
          <img src="../images/icon/twitch.png" />
        </span>
        <span class="twitch"> {{ twitch }}</span>
      </div>
      <div
        v-else-if="sns.twitter === isShow && twitter === commentator[sns.twitter]"
        key="twitter"
        class="sns"
      >
        <span class="twitter_icon">
          <img src="../images/icon/twitter.png" />
        </span>
        <span class="twitter"> {{ twitter }}</span>
      </div>
      <div
        v-else-if="sns.youtube === isShow && youtube === commentator[sns.youtube]"
        key="youtube"
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
