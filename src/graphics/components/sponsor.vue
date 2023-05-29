<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeMount } from 'vue';

let intervalId: string;
let isShow1: Ref<boolean> = ref(true);
let isShow2: Ref<boolean> = ref(false);

onMounted(() => {
  setInterval(() => {
    isShow1.value = !isShow1.value;
    isShow2.value = !isShow2.value;
  }, 5000);
});

onBeforeMount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="container">
    <Transition>
      <img v-show="isShow1" class="image1" src="../images/logo/e-revo_1.png" />
    </Transition>
    <Transition>
      <img v-show="isShow2" class="image2" src="../images/logo/e-revo_2.png" />
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
