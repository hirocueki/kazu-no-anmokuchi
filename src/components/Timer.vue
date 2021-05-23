<template>
  <div class="timer">
    <button class="btn" v-show="status !== 'ended'" @click="toggleTimer()">
      {{
        status === "ready"
          ? "スタート"
          : status === "running"
          ? "ポーズ"
          : "再開"
      }}
    </button>
    <button class="btn" v-show="status == 'ended'" @click="resetTimer()">
      リセット
    </button>

    <div class="timer-duration" v-text="formatDuration()"></div>
    <a class="menu" href="#" @click.stop="handleStop()">回答へすすむ</a>
    <a class="menu" href="#" @click.stop="reload">再テスト</a>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
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
      }
    };
    const handleStarted = () => {
      startTimer();
    };
    const handleStop = () => {
      stopTimer();
    };
    const reload = () => {
      location.reload();
    };
    watch(status, () => {
      emit("timer-changed", status.value);
    });

    return {
      formatDuration,
      toggleTimer,
      handleStarted,
      handleStop,
      status,
      resetTimer,
      reload,
    };
  },
});
</script>

<style scoped>
.timer {
  color: white;
  padding: 10px 30px;
  position: fixed;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px rgba(200, 200, 200, 0.4) solid;
  border-radius: 6px;
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
}
.timer-duration {
  font-size: 24px;
  font-weight: 500;
}
.btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.menu {
  text-decoration: none;
  color: rgba(200, 200, 200, 0.7);
  font-size: 12px;
  padding: 2px;
}
.menu:hover {
  background: rgba(200, 200, 200, 0.2);
  font-size: 12px;
}
</style>
