<template>
  <div class="timer">
    <button v-show="status !== 'ended'" @click="toggleTimer()">はじめる</button>
    <button v-show="status == 'ended'" @click="resetTimer()">リセット</button>
    <button :disabled="status !== 'running'" @click="handlePaused()">
      とめる
    </button>
    <div class="timer-duration" v-text="formatDuration()"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTimer } from "../hooks/useTimer";

export default defineComponent({
  name: "Timer",
  props: {
    duration: {
      type: Number,
      required: false,
      default: 180,
    },
    onStarted: {
      type: Object,
      required: false,
      default: () => {},
    },
    onStopped: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  setup: (props, { emit }) => {
    const {
      status,
      startTimer,
      pauseTimer,
      stopTimer,
      resetTimer,
      formatDuration,
    } = useTimer(props.duration);
    const toggleTimer = () => {
      if (status.value === "running") {
        pauseTimer();
      } else if (["ready", "paused"].includes(status.value)) {
        startTimer();
        console.log("started");
      }
      emit("timer-changed", status);
    };
    const handleStarted = () => {
      startTimer();
      emit("timer-changed", status);
      console.log(emit);
    };
    const handlePaused = () => {
      stopTimer();
      emit("timer-changed", status);
    };

    return {
      formatDuration,
      toggleTimer,
      handleStarted,
      handlePaused,
      status,
      resetTimer,
    };
  },
});
</script>

<style scoped>
.timer {
  padding: 10px 30px;
  position: fixed;
  top: 5px;
  right: 40px;
  background: rgba(200, 200, 200, 0.4);
  border: 1px rgba(200, 200, 200, 0.4) solid;
  border-radius: 6px;
}
.timer-duration {
  font-size: 24px;
  font-weight: 500;
}
</style>
