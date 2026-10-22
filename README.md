# Culvert Math

Culvert pipe and trench arithmetic. The run of 60 ft takes 8 sections at 8 ft each, leaving 4 ft of the last one.

## What it computes

- **The sections truth** - sections: the run (1 to 10000 ft) divided by the section length (1 to 100 ft), rounded up, and what is left of the last one.
- **The trench truth** - trench: the length times width (1 to 240 inches) times depth (1 to 240 inches), in cubic feet.
- **The weight truth** - weight: the cubic feet (1 to 100000000) times the density (1 to 200 pounds a cubic foot), in pounds and tons.
- **The cost truth** - cost: the sections (1 to 100000) and tons (1 to 1000000) at their prices (0.01 to 10000 dollars), and what that is per foot of run.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any site and does not know the flow, the pipe size, the cover depth, the soil or the local permit rules, and it gives no verdict that a culvert carries the water. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/culvertmath/
Repo: https://github.com/iLanis-agent/culvertmath
