# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Koans

There is no build system or package manager. Open `rxkoans.html` directly in a browser to run all lessons. QUnit renders test results inline in the page.

Linting uses JSHint: `jshint koans/` (requires `jshint` installed globally).

## How the Koans Work

Each lesson file in `koans/` contains QUnit tests with blanks (`_______`) that students fill in to make failing tests pass. The rule: **only replace `_______` with the correct value — change nothing else**.

`koans/Answers/` contains the reference solutions. The HTML loads both the student file and the answer file; answer files use commented-out blanks (e.g. `42 /*_______*/`) so they coexist without conflict.

## Architecture

**No modules, no transpilation** — all files are plain ES5 loaded via `<script>` tags in `rxkoans.html`.

**Global namespaces available in all koan files** (provided by `lib/`):

| Global | Source | Purpose |
|--------|--------|---------|
| `Rx` | `lib/rx.js` + extensions | RxJS 2.x — `Rx.Observable`, `Rx.Subject`, etc. |
| `L2O` / `Ix` | `lib/l2o.js`, `lib/ixjs.js` | Interactive Extensions (LINQ-style) — `L2O.Enumerable` |
| `Range` | `lib/koanutils.js` | `Range.create(start, count)` → plain array |

**Prototype extensions added by `lib/koanutils.js`:**
- `Array.prototype.toObservable()` → `Rx.Observable.fromArray(this)`
- `Array.prototype.toEnumerable()` → `Ix.Enumerable.fromArray(this)`
- `Rx.Subject.prototype.onNextAll(...args)` — push multiple values

**Lesson load order** (matches `rxkoans.html`):
1. Lesson 1 — Observable Streams (create, subscribe, `doAction`)
2. Lesson 2 — Composable Observations (`where`, `select`, `sum`, `all`)
3. Lesson 3 — Time
4. Lesson 6 — Advanced Streams (`merge`, `groupBy`, `standardDeviation`, `tally`)

Lesson 4 (Events) is commented out in the HTML.

## RxJS 7.8 version (`koans-v7/`)

Open `rxkoans-v7.html` in a browser to run the modernized koans. Loads RxJS 7.8 from the unpkg CDN — requires internet, or download `https://unpkg.com/rxjs@7.8.1/dist/bundles/rxjs.umd.min.js` to `lib/rxjs.umd.min.js` and update the `<script>` tag for offline use.

**What changed from the original:**

| Concept | Old (v2) | New (v7) |
|---------|----------|---------|
| Create from value | `Rx.Observable.returnValue(x)` | `rxjs.of(x)` |
| Create from array | `Rx.Observable.fromArray([])` | `rxjs.from([])` |
| Create range | `Rx.Observable.range(1,10)` | `rxjs.range(1,10)` |
| Filter | `.where(fn)` | `.pipe(rxjs.filter(fn))` |
| Transform | `.select(fn)` | `.pipe(rxjs.map(fn))` |
| Side-effects | `.doAction(fn)` | `.pipe(rxjs.tap(fn))` |
| Sum / aggregate | `.sum()` | `.pipe(rxjs.reduce((a,b)=>a+b, 0))` |
| Predicate check | `.all(fn)` | `.pipe(rxjs.every(fn))` |
| Merge | `obs.merge(other)` | `rxjs.merge(obs, other)` |
| Flatten | — | `.pipe(rxjs.mergeMap(fn))` |
| Zip | — | `rxjs.zip(obs1, obs2)` |
| Subject push | `.onNext(x)` | `.next(x)` |
| Subject end | `.onCompleted()` | `.complete()` |
| Unsubscribe | `.dispose()` | `.unsubscribe()` |
| DOM events | `$(el).toObservable('evt')` (jQuery) | `rxjs.fromEvent(el, 'evt')` |
| Scheduler | `Rx.Scheduler.immediate` | `rxjs.asyncScheduler` |
| Timeout | `.timeout(ms, fallback$)` | `.pipe(rxjs.timeout({ each: ms, with: () => fallback$ }))` |

All pipeable operators (`filter`, `map`, `tap`, `reduce`, `every`, `delay`, `timeout`, `groupBy`, `mergeMap`, `take`, etc.) are available directly on `rxjs.*` in the UMD bundle — there is no separate `rxjs.operators` namespace.

**Lesson 5 (Subjects) is new** — covers `Subject`, `ReplaySubject`, and `BehaviorSubject` using the renamed observer API.

**Lesson 6 (Advanced Streams) is redesigned** — the original IxJS-dependent `standardDeviation`/`tally`/`riffles` tests are replaced with `merge`, `groupBy`, `mergeMap`, `zip`, and `reduce`-with-completion patterns. The IxJS (`l2o.js`/`ixjs.js`) and jQuery dependencies are not used in `koans-v7/`.

## Adding a New Lesson

1. Create `koans/lessonN-Name.js` using `module('Lesson N - ...')` and QUnit `test()`/`equals()`.
2. Create `koans/Answers/lessonN-Name.js` with blanks filled and commented out.
3. Add both `<script>` tags to `rxkoans.html` in order.
