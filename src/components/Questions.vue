<template>
  <div class="questions-columns">
    <div
      class="questions-column"
      v-for="(questions10, index) of chunk(questions, 10)"
      :key="index"
    >
      <div
        v-for="(q, index) of questions10"
        :key="index"
        class="question-box"
        :class="{ odd: index % 2 !== 0 }"
      >
        <span class="question-number">{{ q.no }}.</span>
        <span class="question"
          >{{ q.num1 }} {{ q.operation }} {{ q.num2 }} =
        </span>
        <span class="answer" v-if="showAnswer">{{ q.answer }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { useQuestion, Question } from "../hooks/useQuestion";
import { chunk } from "lodash";

export default defineComponent({
  name: "Questions",
  props: {
    showAnswer: {
      type: Boolean,
      required: true,
    },
  },
  setup: (props) => {
    const showAnswer = computed(() => props.showAnswer);
    const { questions } = useQuestion(100);
    return { questions, chunk, showAnswer };
  },
});
</script>

<style scoped>
body {
  background: #555;
}
.questions-columns {
  display: flex;
  flex-wrap: wrap;
}
.questions-column {
  border-top: 2px dashed gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-right: 3px;
  margin-bottom: 3px;
}
.question-box {
  display: flex;
  align-items: baseline;
  padding: 20px 40px;
  border-bottom: 1px solid #f5f5f5;
}
.question-number {
  margin-right: 5px;
  width: 32px;
}
.question-no {
}
.question {
  width: 5rem;
  font-weight: 500;
  font-size: 18px;
  width: 90px;
}
.odd {
  background: #fafafa;
}
</style>
