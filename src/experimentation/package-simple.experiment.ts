import { performance } from "perf_hooks";
import "../index";

const data: Array<Array<number | string>> = [["index", "time"]];

for (let index = 100; index < 1000000; index++) {
  const a = Array(index)
    .fill(1)
    .map((x, i) => i);

  var startTime = performance.now();

  const result = a
    .mapLazy((x) => x * x)
    .filterLazy((x) => x % 2 == 0)
    .reduce({
      func: (a: number, b: number) => a + b,
      defaultValue: 0,
    });

  var endTime = performance.now();
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
    console.log(`${fileName} Saved!`);
  });
};

export_csv(data, "simple_package");

//node dist/experimentation/package-simple.experiment.js
//48274.60s user
//1232.47s system
//101% cpu
//13:32:24.76 total
