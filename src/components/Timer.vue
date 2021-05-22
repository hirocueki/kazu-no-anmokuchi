<template>
  <div>
    <button v-show="!started" @click="handleStarted()">はじめる</button>
    <button v-show="started" @click="handleStopped()">とめる</button>
    <div v-text="formatDuration()"></div>
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
    const handleStarted = () => {
      startTimer();
      emit("handle-changed", true);
      console.log(emit);
    };
    const handleStopped = () => {
      stopTimer();
      emit("handle-changed", false);
    };
    const { started, startTimer, stopTimer, formatDuration } = useTimer(
      props.duration
    );
    return { formatDuration, handleStarted, handleStopped, started };
  },
});
</script>

<style></style>
