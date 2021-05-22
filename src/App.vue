<template>
  <div>
    <Timer :duration="30" @handle-changed="handleChanged" />
    <div v-show="timerStarted">
      <Questions />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Questions from "./components/Questions.vue";
import Timer from "./components/Timer.vue";

export default defineComponent({
  name: "App",
  components: {
    Questions,
    Timer,
  },
  setup() {
    const timerStarted = ref(false);
    const handleChanged = (started: boolean) => {
      timerStarted.value = started;
      console.log(started);
    };
    return { timerStarted, handleChanged };
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
