module('Lesson 1 - Observable Streams');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

test('ValuesFirst', function() {
    var received = [];
    rxjs.of(1, 2, 3)
        .subscribe(function(x) { received.push(x); });
    equals(received[0], _______);
    equals(received.length, _______);
});

test('SimpleSubscription', function() {
    var received;
    rxjs.of(42).subscribe(function(x) { received = x; });
    equals(received, _______);
});

test('SimpleReturn', function() {
    var received = '';
    rxjs.of('Foo')
        .subscribe(function(x) { received = x; });
    equals(received, _______);
});

test('TheLastEvent', function() {
    var received = '';
    rxjs.from(['Foo', 'Bar'])
        .subscribe(function(x) { received = x; });
    equals(received, _______);
});

test('EverythingCounts', function() {
    var received = 0;
    rxjs.from([3, 4])
        .subscribe(function(x) { received += x; });
    equals(received, _______);
});

test('DoingInTheMiddle', function() {
    var status = [];
    rxjs.from(Range.create(1, 4).reverse())
        .pipe(rxjs.tap(function(d) {
            status.push(d + '=' + (d === 1 ? 'Study Like Mad' : _______));
        }))
        .subscribe();
    equals(
        status.toString(),
        '4=Party,3=Party,2=Party,1=Study Like Mad');
});

test('NothingListensUntilYouSubscribe', function() {
    var sum = 0;
    var observable = rxjs.range(1, 10)
        .pipe(rxjs.tap(function(n) { sum += n; }));

    equals(0, sum);

    observable._______();

    equals(55, sum);
});
