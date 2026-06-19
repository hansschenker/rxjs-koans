module('Lesson 5 - Subjects');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 *
 * In RxJS 7, Subject observer methods are next(), error(), complete()
 * (previously onNext(), onError(), onCompleted()).
 */

test('SubjectAsObserver', function() {
    var subject = new rxjs.Subject();
    var received = [];

    subject.subscribe(function(x) { received.push(x); });
    subject._______(42);

    equals(received.toString(), '42');
});

test('HotObservable', function() {
    var subject = new rxjs.Subject();
    var early = [], late = [];

    subject.subscribe(function(x) { early.push(x); });
    subject.next(1);

    subject.subscribe(function(x) { late.push(x); });
    subject.next(2);
    subject.next(3);

    equals(early.toString(), '1,2,3');
    equals(late.toString(), _______);
});

test('CompletingASubject', function() {
    var subject = new rxjs.Subject();
    var received = [];
    var done = false;

    subject.subscribe(
        function(x) { received.push(x); },
        null,
        function() { done = true; }
    );

    subject.next(1);
    subject.next(2);
    subject._______();
    subject.next(3);

    equals(received.toString(), '1,2');
    equals(done, true);
});

test('ReplaySubject', function() {
    var subject = new rxjs.ReplaySubject(3);
    var received = [];

    subject.next(10);
    subject.next(20);
    subject.next(30);
    subject.next(40);

    subject.subscribe(function(x) { received.push(x); });

    equals(received.toString(), _______);
});

test('BehaviorSubject', function() {
    var subject = new rxjs.BehaviorSubject(_______);
    var received = [];

    subject.subscribe(function(x) { received.push(x); });
    subject.next(2);
    subject.next(3);

    equals(received.toString(), '1,2,3');
});
