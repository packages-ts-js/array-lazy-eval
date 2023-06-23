import { sequenceOf } from "sequency";
import { performance } from "perf_hooks";
import assert = require("assert");

const data: Array<Array<number | string>> = [["index", "time"]];

for (let index = 100; index < 1000000; index++) {
  const a = Array(index)
    .fill(1)
    .map((x, i) => i);

  var startTime = performance.now();

  const result = sequenceOf(...a)
    .map((x) => x * x)
    .filter((x) => x % 2 == 0)
    .reduce((a: number, b) => a + b);

  var endTime = performance.now();

  const t = a
    .map((x) => x * x)
    .filter((x) => x % 2 == 0)
    .reduce((a, b) => a + b, 0);
  assert(result == t);
  data.push([index, endTime - startTime]);
  console.log(`Call to ${index} took ${endTime - startTime} milliseconds`);
}

const export_csv = (data: Array<Array<number | string>>, fileName: any) => {
  var fs = require("fs");

  var result: string = "";

  data.forEach((row) => {
    result += row.join(",") + "\n";
  });

  fs.writeFile(`${fileName}.csv`, result, function (err: any) {
    if (err) throw err;
    console.log("Saved!");
  });
};

export_csv(data, "sequence");

//node dist/experimentation/simple-form.experiement.js
//48387.67s user
//3307.37s system
//102% cpu
//13:56:50.81 total
