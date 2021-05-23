<template>
  <div>
    <Timer :duration="3" @timer-changed="handleTimerChanged" />
    <button
      @click="
        () => {
          showAnswer = true;
        }
      "
    >
      こたえをみる
    </button>
    <div v-show="timerStatus !== 'ready'">
      <Questions :showAnswer="showAnswer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const handleTimerChanged = (status: TimerStatus) => {
      timerStatus.value = status;
    };
    return { timerStatus, handleTimerChanged, showAnswer };
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
  margin-top: 60px;
}
</style>
