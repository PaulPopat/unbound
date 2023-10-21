# Loops and Iterators

## Iterators

Iterators are sequences of data. Those sequences are retrieved upon request. In the case of iterators made within code, the code for the next item is only run upon request. In the case of arrays, the next request will simply pull the data from the memory address of the next item.

Iterators of a type are declared by putting a pair of square brackets after the type name.

## Loops

Like all over blocks in Unbound. Loops must return a value. That value will be an iterator. Each iteration of the loop will only be run when the next item of that loop is requested. As such, loops are not actually run when declared, but the scope of the function will be preserved until the iterator is finished.

## Count Loops

Count loops are for when you want to perform an operation for a fixed number of times. We avoid for loops because they break principles of purity. Instead a count loop will supply an index with the name provided on the right side of the `as` keyword. The count loop is not technically pure but will suffice in order to allow generative code.

```
// Returns 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
fn test(): int[] {
  store result = count (10 as index) {
    return index;
  };

  return result;
}
```

## Iterator Loops

Iterator loops are designed to iterate over other iterators. Otherwise they work much the same way as a while loop.

```
// Returns 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
fn test(): int[] {
  store iterator = count (10 as index) {
    return index;
  };

  store result = iterate (iterator as item) {
    return item + 1;
  };

  return result;
}
```
