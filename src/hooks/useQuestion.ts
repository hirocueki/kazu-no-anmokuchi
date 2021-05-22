export type Question = {
  num1: number;
  num2: number;
  operation: "+" | "-";
};
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function useQuestion(count = 10) {
  let i = 0;
  const questions: Array<Question> = [];
  while (i++ < count) {
    questions.push({
      num1: getRandomInt(200),
      num2: getRandomInt(99),
      operation: "+",
    });
  }
  return { questions };
}
