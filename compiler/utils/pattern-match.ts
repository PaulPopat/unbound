export function PatternMatch<
  TOptions extends Array<new (...args: Array<any>) => any>
>(...options: TOptions) {
  return <TResult>(
    ...handlers: {
      [TKey in keyof TOptions]: (
        input: InstanceType<TOptions[TKey]>
      ) => TResult;
    }
  ) => {
    return (input: any) => {
      for (let i = 0; i < options.length; i++) {
        const constructor = options[i];
        const handler = handlers[i];
        if (input instanceof constructor) {
          return handler(input);
        }
      }

      throw new Error("No handler found");
    };
  };
}
