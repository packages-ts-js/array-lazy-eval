import { ReduceParam } from "../index";

export const concat: ReduceParam<Array<any>, Array<any>> = {
  func: (a, b) => {
    a.push(b);
    return a;
  },
  defaultValue: () => [],
  defaultValueIsCallable: true,
};
