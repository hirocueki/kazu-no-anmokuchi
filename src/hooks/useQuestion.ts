import { random } from "lodash";
export type Question = {
  no: number;
  num1: number;
  num2: number;
  operation: "+" | "-" | "×";
  operator: "+" | "-" | "*";
  answer: () => number;
};

function generateQuestion() {
  switch (random(1, 3)) {
    case 1:
      return {
        num1: random(1, 99),
        num2: random(1, 99),
        operation: "+",
        operator: "+",
      };
    case 2:
      return {
        num1: random(50, 99),
        num2: random(1, 50),
        operation: "-",
        operator: "-",
      };
    case 3:
      return {
        num1: random(1, 9),
        num2: random(1, 9),
        operation: "×",
        operator: "*",
      };
  }
}
export function useQuestion(count = 10) {
  let i = 0;
  const questions: Array<Question> = [];
  while (i++ < count) {
    const q = {
      no: i,
      ...generateQuestion(),
    } as Question;
    (q.answer = eval(`${q.num1}${q.operator}${q.num2}`)), questions.push(q);
  }
  return { questions };
}
