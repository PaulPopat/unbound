namespace std.iterable {
  export fn Reduce(target: [use T = any], start: use R = any, reducer: (item: T, current: R) -> R) {
    store aggregator = (current: [T], result: R) -> {
      return if (current.done) {
        return result;
      } else {
        store next = reducer(current.result, result);
        return aggregator(current.next(), result);
      };
    };

    return if (target.done) {
      return start;
    } else {
      return aggregator(target.next(), start);
    };
  }
}