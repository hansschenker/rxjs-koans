# RxJSKoans v7 — Usage Guide

## What this is

A set of browser-based exercises for learning RxJS 7.8. Each exercise is a failing test with a blank (`_______`) you fill in to make it pass. There are no lectures — the tests teach by failing.

## Prerequisites

- A modern browser (Chrome, Firefox, Edge)
- Internet access for the first load (RxJS 7.8 is served from unpkg CDN)

No Node, no npm, no build step.

## Setup

1. Clone or download this repository.
2. Open `rxkoans-v7.html` directly in your browser (File → Open, or drag the file onto the browser window).

That's it.

## How to work through a lesson

The page loads two copies of every test: your working copy (red = failing) and a reference answer (green = passing). You only edit the working copy files in `koans-v7/`.

**The workflow for each test:**

1. Look at the **first red test** on the page.
2. Open the corresponding file in `koans-v7/` — the module name in the test header tells you which lesson:

   | Module name on page | File to edit |
   |---|---|
   | Lesson 1 - Observable Streams | `koans-v7/lesson1-observablestreams.js` |
   | Lesson 2 - Composable Observations | `koans-v7/lesson2-ComposableObservations.js` |
   | Lesson 3 - Time | `koans-v7/lesson3-Time.js` |
   | Lesson 4 - Events | `koans-v7/lesson4-Events.js` |
   | Lesson 5 - Subjects | `koans-v7/lesson5-Subjects.js` |
   | Lesson 6 - Advanced Streams | `koans-v7/lesson6-AdvancedStreams.js` |

3. Find the `_______` blank in that test and replace it with the correct value.
4. **Save the file and refresh the browser.**
5. If the test turns green, move to the next red test. If not, adjust your answer and refresh again.

**Rules:**
- Only replace `_______`. Do not change anything else in the test.
- One blank at a time — the first failing test always has only one blank to fix before you move on.

## Example

You open `rxkoans-v7.html` and see this test is red:

```
Lesson 1 › SimpleReturn  —  _______ is not defined
```

You open `koans-v7/lesson1-observablestreams.js` and find:

```js
test('SimpleReturn', function() {
    var received = '';
    rxjs.of('Foo')
        .subscribe(function(x) { received = x; });
    equals(received, _______);
});
```

`rxjs.of('Foo')` emits the string `'Foo'`, which gets assigned to `received`. So you replace `_______` with `'Foo'`:

```js
    equals(received, 'Foo');
```

Save, refresh — the test turns green.

## If you get stuck

Each lesson has a complete answer file in `koans-v7/Answers/`. The answers are already loaded by the page (that's the green half). Open the matching answer file and look for the value next to the `/*_______*/` comment:

```js
equals(received, 'Foo'/*_______*/);
//                ^^^^^ this is the answer
```

## Lesson map

| Lesson | Concepts covered |
|---|---|
| 1 — Observable Streams | `of`, `from`, `range`, `tap`, `subscribe` |
| 2 — Composable Observations | `filter`, `map`, `tap`, `reduce`, `every` |
| 3 — Time | `asyncScheduler`, `delay`, `timeout` |
| 4 — Events | `fromEvent`, `filter`, `unsubscribe` |
| 5 — Subjects | `Subject`, `BehaviorSubject`, `ReplaySubject`, `next`, `complete` |
| 6 — Advanced Streams | `merge`, `groupBy`, `mergeMap`, `zip`, `reduce` with completion |

Work through them in order — each lesson builds on the previous one.

## Key RxJS 7 patterns you will learn

**Creating an observable:**
```js
rxjs.of(1, 2, 3)          // emit specific values
rxjs.from([1, 2, 3])      // emit from an array
rxjs.range(1, 10)          // emit a numeric range
rxjs.fromEvent(el, 'click') // emit DOM events
```

**Transforming with pipe:**
```js
rxjs.of(1, 2, 3)
    .pipe(
        rxjs.filter(function(x) { return x > 1; }),
        rxjs.map(function(x) { return x * 10; })
    )
    .subscribe(function(x) { console.log(x); });
// logs: 20, 30
```

**Subscribing and unsubscribing:**
```js
var sub = observable.subscribe(function(x) { ... });
sub.unsubscribe(); // stop listening
```

**Using a Subject:**
```js
var subject = new rxjs.Subject();
subject.subscribe(function(x) { console.log(x); });
subject.next(42);     // push a value
subject.complete();   // end the stream
```
