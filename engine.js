// Culvert Math engine: pipe sections for a run, trench volume, bedding gravel weight, and the cost per foot of run. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the plan and the supplier sheet.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the run length must be from 1 to 10000 ft with no decimal places";
var _SEC = "the section length must be from 1 to 100 ft with no decimal places";
var _TW = "the trench width must be from 1 to 240 inches with no decimal places";
var _TD = "the trench depth must be from 1 to 240 inches with no decimal places";
var _CUFT = "the volume must be from 1 to 100000000 cu ft with no decimal places";
var _DENS = "the density must be from 1 to 200 pounds a cubic foot with no decimal places";
var _SECS = "the section count must be from 1 to 100000 with no decimal places";
var _TONS = "the tons must be from 1 to 1000000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function sectionsTruth(lenft, secft) {
  var l = _i(lenft, _LEN, 5, 1, 10000), s = _i(secft, _SEC, 3, 1, 100);
  var n = Math.floor((l + s - 1) / s), spare = n * s - l;
  var tail = spare === 0 ? ", with nothing left over" : ", leaving " + spare + (spare === 1 ? " ft" : " ft") + " of the last one";
  return "The run of " + l + " ft takes " + n + (n === 1 ? " section" : " sections") + " at " + s + " ft each" + tail + ".";
}
function trenchTruth(lenft, widin, depin) {
  var l = _i(lenft, _LEN, 5, 1, 10000), w = _i(widin, _TW, 3, 1, 240), d = _i(depin, _TD, 3, 1, 240);
  var cuft100 = _hu(l * w * d * 100, 144);
  return "The trench of " + l + " ft by " + w + " inches wide by " + d + " inches deep holds " + _dec(cuft100, 2) + " cu ft.";
}
function weightTruth(cuft, dens) {
  var v = _i(cuft, _CUFT, 9, 1, 100000000), d = _i(dens, _DENS, 3, 1, 200);
  var lbs = v * d, tons100 = _hu(lbs * 100, 2000);
  return "The " + v + " cu ft at " + d + " pounds a cubic foot weighs " + lbs + " pounds, or " + _dec(tons100, 2) + " tons.";
}
function costTruth(secs, secprice, tons, tonprice, lenft) {
  var n = _i(secs, _SECS, 6, 1, 100000), sp = _p(secprice, _PRICE, 5, 2, 1, 1000000);
  var t = _i(tons, _TONS, 7, 1, 1000000), tp = _p(tonprice, _PRICE, 5, 2, 1, 1000000);
  var l = _i(lenft, _LEN, 5, 1, 10000);
  var cents = n * sp + t * tp, per = _hu(cents, l);
  return "The " + n + (n === 1 ? " section" : " sections") + " at $" + _dec(sp, 2) + " and the " + t + (t === 1 ? " ton" : " tons") + " at $" + _dec(tp, 2) + " cost $" + _money(cents) + ", or $" + _money(per) + " a foot over the " + l + " ft.";
}
