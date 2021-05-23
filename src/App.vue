<template>
  <div :class="{ finished: finished }">
    <Timer :duration="180" @timer-changed="handleTimerChanged" />
    <div class="show-answer">
      <button
        v-show="finished"
        class="btn"
        @click="
          () => {
            showAnswer = true;
          }
        "
      >
        こたえをみる
      </button>
    </div>
    <template v-if="timerStatus !== 'ready'">
      <Questions :showAnswer="showAnswer" />
    </template>
    <template v-else>
      <ul>
        <div>「数の暗黙知」きょうせいギプス</div>
        <a target="blank" href="https://note.com/horisou/n/nd2333a71d993"
          >「ドラゴン桜」の第4話は、数の暗黙知｜ほりそう / 堀 聡太｜note</a
        >
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Questions from "./components/Questions.vue";
import Timer from "./components/Timer.vue";
import { TimerStatus } from "./hooks/useTimer";

export default defineComponent({
  name: "App",
  components: {
    Questions,
    Timer,
  },
  setup() {
    const timerStatus = ref<TimerStatus>("ready");
    const showAnswer = ref(false);
    const finished = computed(() => timerStatus.value === "ended");
    const handleTimerChanged = (status: TimerStatus) => {
      timerStatus.value = status;
    };
    return { finished, timerStatus, handleTimerChanged, showAnswer };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.finished {
  /* background: #888; */
}
.show-answer {
  position: absolute;
  right: 5px;
  top: 205px;
  width: 200px;
}
</style>
