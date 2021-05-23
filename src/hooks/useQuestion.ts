export type Question = {
  no: number;
  num1: number;
  num2: number;
  operation: "+" | "-";
  answer: () => number;
};
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
function getRandomOperation() {
  return Math.floor(Math.random() * 2) % 2 ? "+" : "-";
}
export function useQuestion(count = 10) {
  let i = 0;
  const questions: Array<Question> = [];
  while (i++ < count) {
    const q = {
      no: i,
      num1: getRandomInt(200),
      num2: getRandomInt(50),
      operation: "+", //getRandomOperation(),
    } as Question;
    (q.answer = eval(`${q.num1}${q.operation}${q.num2}`)), questions.push(q);
  }
  return { questions };
}
