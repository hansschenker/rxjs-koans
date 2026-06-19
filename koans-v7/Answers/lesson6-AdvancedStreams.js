module('Lesson 6 - Advanced Streams');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

test('MergingStreams', function() {
    var received = [];
    var letters = rxjs.of('A', 'B', 'C');
    var numbers = rxjs.of(1, 2, 3);

    rxjs.merge/*_______*/(letters, numbers)
        .subscribe(function(x) { received.push(x); });

    equals(received.toString(), 'A,B,C,1,2,3');
});

test('GroupingByKey', function() {
    var evens = [], odds = [];

    rxjs.range(1, 6)
        .pipe(rxjs.groupBy(function(n) { return n % 2/*_______*/; }))
        .subscribe(function(group) {
            group.subscribe(function(n) {
                if (group.key === 0) evens.push(n);
                else odds.push(n);
            });
        });

    equals(evens.toString(), '2,4,6');
    equals(odds.toString(), '1,3,5');
});

test('FlatteningInnerStreams', function() {
    var received = [];
    rxjs.of('a', 'b', 'c')
        .pipe(rxjs.mergeMap/*_______*/(function(letter) {
            return rxjs.of(letter.toUpperCase(), letter);
        }))
        .subscribe(function(x) { received.push(x); });
    equals(received.toString(), 'A,a,B,b,C,c');
});

test('ZippingPairs', function() {
    var received = [];
    rxjs.zip(
        rxjs.of('Hello', 'Goodbye'),
        rxjs.of('RxJS', 'World')
    ).subscribe(function(pair) { received.push(pair.join(' ')); });
    equals(received.toString(), 'Hello RxJS,Goodbye World'/*_______*/);
});

test('ReducingToASingleValue', function() {
    var subject = new rxjs.Subject();
    var sum = 0, count = 0;

    subject
        .pipe(rxjs.reduce(function(acc, x) { return acc + x; }, 0))
        .subscribe(function(n) { sum = n; });

    subject
        .pipe(rxjs.reduce(function(acc) { return acc + 1; }, 0))
        .subscribe(function(n) { count = n; });

    subject.next(10);
    subject.next(20);
    subject.next(30);
    subject.complete/*_______*/();

    equals(sum, 60);
    equals(count, 3);
});
