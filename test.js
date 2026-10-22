const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { sections: sectionsTruth, trench: trenchTruth, weight: weightTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the run length must be from 1 to 10000 ft with no decimal places",
  "the section length must be from 1 to 100 ft with no decimal places",
  "the trench width must be from 1 to 240 inches with no decimal places",
  "the trench depth must be from 1 to 240 inches with no decimal places",
  "the volume must be from 1 to 100000000 cu ft with no decimal places",
  "the density must be from 1 to 200 pounds a cubic foot with no decimal places",
  "the section count must be from 1 to 100000 with no decimal places",
  "the tons must be from 1 to 1000000 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
