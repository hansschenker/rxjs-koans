module('Lesson 4 - Events');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 *
 * In RxJS 7, DOM events are handled with rxjs.fromEvent — no jQuery needed.
 * Subscriptions are cancelled with .unsubscribe() instead of .dispose().
 */

test('ListeningToEvents', function() {
    var received = '';
    var subscription =
        rxjs.fromEvent(document, 'koans-foo')
            .subscribe(function(e) { received += e.detail.payload; });

    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'M' } }));
    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'A' } }));
    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'T' } }));
    subscription.unsubscribe/*_______*/();
    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'T' } }));

    equals(received, 'MAT');
});

test('ListeningToTheRightEvents', function() {
    var received = '';
    var subscription =
        rxjs.fromEvent(document, 'koans-foo')
            .subscribe(function(e) { received += e.detail.payload; });

    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'M' } }));
    document.dispatchEvent(new CustomEvent('koans-bar', { detail: { payload: 'A' } }));
    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'T' } }));
    document.dispatchEvent(new CustomEvent('koans-foo', { detail: { payload: 'T' } }));
    subscription.unsubscribe();

    equals(received, 'MTT'/*_______*/);
});

test('FilteringEvents', function() {
    var received = '';
    var subscription =
        rxjs.fromEvent(document, 'koans-key')
            .pipe(rxjs.filter(function(e) { return e.detail.key === 'a'/*_______*/; }))
            .subscribe(function(e) { received += e.detail.value; });

    document.dispatchEvent(new CustomEvent('koans-key', { detail: { key: 'a', value: '1' } }));
    document.dispatchEvent(new CustomEvent('koans-key', { detail: { key: 'b', value: '2' } }));
    document.dispatchEvent(new CustomEvent('koans-key', { detail: { key: 'a', value: '3' } }));
    subscription.unsubscribe();

    equals(received, '13');
});
