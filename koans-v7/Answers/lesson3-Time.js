module('Lesson 3 - Time');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

asyncTest('LaunchingAnActionInTheFuture', function() {
    var received = '';
    var ms = 250/*_______*/;
    rxjs.asyncScheduler.schedule(function() { received = 'Finished'; }, ms);
    setTimeout(function() { equals(received, 'Finished'); start(); }, 500);
});

asyncTest('LaunchingAnEventInTheFuture', function() {
    var received = '';
    var ms = 250/*_______*/;
    rxjs.of('Godot')
        .pipe(rxjs.delay(ms))
        .subscribe(function(x) { received = x; });
    setTimeout(function() { equals(received, 'Godot'); start(); }, 500);
});

asyncTest('AWatchedPot', function() {
    var received = '';
    var emitAfterMs = 200;
    var timeoutAfterMs = 500/*_______*/;
    rxjs.of('Boiling')
        .pipe(
            rxjs.delay(emitAfterMs),
            rxjs.timeout({
                each: timeoutAfterMs,
                with: function() { return rxjs.of('Tepid'); }
            })
        )
        .subscribe(function(x) { received = x; });
    setTimeout(function() { equals(received, 'Boiling'); start(); }, 600);
});
