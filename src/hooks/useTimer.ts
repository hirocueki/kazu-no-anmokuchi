import { ref } from "vue";
export function useTimer(initDuration: number) {
  const duration = ref(initDuration);
  const started = ref(false);
  const timer = ref(0);
  const countDown = () => {
    console.log(duration.value);
    --duration.value;
    if (duration.value === 0) {
      stopTimer();
    }
  };
  const startTimer = () => {
    started.value = true;
    timer.value = setInterval(() => {
      countDown();
    }, 1000);
  };
  const stopTimer = () => {
    started.value = false;
    clearInterval(timer.value);
  };
  const formatDuration = () => {
    return `${Math.floor(duration.value / 60)}: ${(
      "00" +
      (duration.value % 60)
    ).slice(-2)}`;
  };
  return { duration, started, startTimer, stopTimer, formatDuration };
}
