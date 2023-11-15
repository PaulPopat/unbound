namespace std.iterable {
  export struct CountContext {
    next: () -> CountContext;
    done: bool;
    result?: int;
  }

  export fn Count(target: int): CountContext {
    return make CountContext {
      assign done = target == 0i;

      store wrapper = (current: int) -> {
        return make CountContext {
          assign done = current == target;

          assign next = () -> wrapper(current + 1i);

          assign result = current + 1i;
        }
      };

      assign next = () -> wrapper(0i);
    };
  }

  export fn Concat(left: [use T = any], right: [T]): [T] {
    return make {
      store wrapper = (left: [T], right: [T]) -> {
        assign done = left.done && right.done;

        assign result = 
          if (left.done) {
            return if (right.done) {
              panic 89;
            } else {
              return right.result;
            };
          } else {
            return left.result;
          };

        assign next = () ->
          if (left.done) {
            return if (right.done) {
              return wrapper(left, right);
            } else {
              return wrapper(left, right.next());
            };
          } else {
            return wrapper(left.next(), right);
          };
      };

      assign done = left.done && right.done;

      assign next = () -> 
        if (left.done) {
          return if (right.done) {
            return wrapper(left, right);
          } else {
            return wrapper(left, right.next());
          };
        } else {
          return wrapper(left.next(), right);
        };
    };
  }
}