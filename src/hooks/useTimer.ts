import { ref } from "vue";
export type TimerStatus = "ready" | "running" | "paused" | "ended";
export function useTimer(initDuration: number) {
  const initVal = initDuration;
  const duration = ref(initDuration);
  const timer = ref(0);
  const status = ref<TimerStatus>("ready");
  const countDown = () => {
    console.log(duration.value);
    --duration.value;
    if (duration.value === 0) {
      stopTimer();
    }
  };
  const startTimer = () => {
    status.value = "running";
    timer.value = setInterval(() => {
      countDown();
    }, 1000);
  };
  const stopTimer = () => {
    status.value = "ended";
    clearInterval(timer.value);
  };
  const pauseTimer = () => {
    status.value = "paused";
    clearInterval(timer.value);
  };
  const resetTimer = () => {
    clearInterval(timer.value);
    status.value = "ready";
    duration.value = initVal;
  };
  const formatDuration = () => {
    return `${Math.floor(duration.value / 60)}: ${(
      "00" +
      (duration.value % 60)
    ).slice(-2)}`;
  };
  return {
    duration,
    status,
    startTimer,
    stopTimer,
    pauseTimer,
    resetTimer,
    formatDuration,
  };
}
