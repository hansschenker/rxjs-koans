module('Lesson 2 - Composable Observations');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

test('ComposableAddition', function() {
    var received = 0;
    rxjs.from([10, 100, 1000/*_______*/])
        .pipe(rxjs.reduce(function(acc, x) { return acc + x; }, 0))
        .subscribe(function(x) { received = x; });
    equals(received, 1110);
});

test('ComposableBeforeAndAfter', function() {
    var a = '', b = '';
    rxjs.from(Range.create(1, 6))
        .pipe(
            rxjs.tap(function(n) { a += n.toString(); }),
            rxjs.filter(function(n) { return n % 2 === 0; }),
            rxjs.tap(function(n) { b += n.toString(); })
        )
        .subscribe();
    equals(a, '123456'/*_______*/);
    equals(b, '246');
});

test('WeWroteThis', function() {
    var received = [];
    rxjs.from(['Bart', 'Wes', 'Erik', 'Matthew', 'Brian'])
        .pipe(rxjs.filter(function(n) { return n.length <= 4/*_______*/; }))
        .subscribe(function(x) { received.push(x); });
    equals(received.toString(), 'Bart,Wes,Erik');
});

test('ConvertingEvents', function() {
    var received = '';
    rxjs.from(['wE', 'hOpE', 'yOU', 'aRe', 'eNJoyIng', 'tHiS'])
        .pipe(rxjs.map(function(x) { return x.toLowerCase()/*_______*/; }))
        .subscribe(function(x) { received += x + ' '; });
    equals(received, 'we hope you are enjoying this ');
});

test('CreatingAMoreRelevantEventStream', function() {
    var received = '';
    var mouseXMovements = [100, 200, 150];
    var windowTopX = 50;
    rxjs.from(mouseXMovements)
        .pipe(rxjs.map(function(x) { return x - windowTopX/*_______*/; }))
        .subscribe(function(x) { received += x + ', '; });
    equals(received, '50, 150, 100, ');
});

test('CheckingEverything', function() {
    var received = null;
    rxjs.from([2, 4, 6, 8])
        .pipe(rxjs.every(function(x) { return x % 2 === 0; }))
        .subscribe(function(x) { received = x; });
    equals(received, true/*_______*/);
});

test('CompositionMeansTheSumIsGreaterThanTheParts', function() {
    var received = 0;
    rxjs.range(1, 10)
        .pipe(
            rxjs.filter(function(x) { return x > 8/*_______*/; }),
            rxjs.reduce(function(acc, x) { return acc + x; }, 0)
        )
        .subscribe(function(x) { received = x; });
    equals(received, 19);
});
