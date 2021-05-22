<template>
  <div v-for="(q, index) of questions" :key="index">
    <p v-text="`${q.num1} ${q.operation} ${q.num2} = `"></p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useQuestion, Question } from "../hooks/useQuestion";

export default defineComponent({
  name: "Questions",
  props: {},
  setup: () => {
    const { questions } = useQuestion(100);
    return { questions };
  },
});
</script>

<style scoped></style>
