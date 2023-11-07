import { Location } from "#compiler/location";
import { AsyncLocalStorage } from "node:async_hooks";

const component_context = new AsyncLocalStorage<{ index: number }>();

export abstract class Visitor {
  abstract get OperatesOn(): Array<new (...args: any[]) => Component>;

  abstract Visit(target: Component): {
    result: Component | undefined;
    cleanup: () => void;
  };
}

const _index = Symbol();
const _children = Symbol();

export function AstItem(
  target: new (...args: any[]) => Component,
  context: ClassDecoratorContext
) {
  const result = function (...args: any[]) {
    const instance = new target(...args);

    const index =
      component_context.getStore()?.index ?? ComponentStore.Register(instance);
    instance[_index] = index;
    instance[_children] = (
      args.filter((a) => a instanceof Component) as Array<Component>
    )
      .concat(
        ...args
          .filter((a) => a instanceof ComponentGroup)
          .flatMap((a: ComponentGroup) => [...a.iterator()])
      )
      .map((c) => c.Index);
    return instance;
  };

  result.prototype = target.prototype;
  return result as any;
}

export abstract class Component {
  readonly #location: Location;
  [_index]: number = -1;
  [_children]: Array<number> = [];

  constructor(location: Location) {
    this.#location = location;
  }

  get Location() {
    return this.#location;
  }

  get Index() {
    return this[_index];
  }

  abstract get type_name(): string;

  abstract get extra_json(): Record<never, never>;

  get json(): unknown {
    return {
      ...this.extra_json,
      type: this.type_name,
      location: this.#location.json,
    };
  }
}

export class ComponentStore {
  static #data: Array<Component> = [];

  static Register(component: Component) {
    this.#data = [...this.#data, component];

    return this.#data.length - 1;
  }

  static #Get(index: number) {
    const result = this.#data[index];
    if (!result) throw new Error("Could not find component");

    return result;
  }

  static Get(index: number) {
    return this.#Get(index);
  }

  static Visit(item: Component, visitor: Visitor) {
    const instance = this.#Get(item.Index);

    if (visitor.OperatesOn.find((o) => instance instanceof o)) {
      const { result, cleanup } = component_context.run(
        { index: instance.Index },
        () => visitor.Visit(instance)
      );

      if (result) {
        cleanup();
        this.#data[result.Index] = result;
      }

      for (const child of instance[_children]) {
        this.Visit(this.#Get(child), visitor);
      }

      cleanup();
    } else {
      for (const child of instance[_children]) {
        this.Visit(this.#Get(child), visitor);
      }
    }

    return this.#Get(item.Index);
  }
}

export class ComponentGroup {
  readonly #components: Array<number>;

  constructor(...components: Array<Component>) {
    this.#components = components.map((c) => c.Index);
  }

  get Length() {
    return this.#components.length;
  }

  get First() {
    return ComponentStore.Get(this.#components[0]);
  }

  get Last() {
    return ComponentStore.Get(this.#components[this.#components.length - 1]);
  }

  get Location() {
    return new Location(
      this.First.Location.FileName,
      this.First.Location.StartLine,
      this.First.Location.StartColumn,
      this.Last.Location.EndLine,
      this.Last.Location.EndColumn
    );
  }

  get json() {
    return this.#components.map((c) => ComponentStore.Get(c).json);
  }

  *iterator() {
    for (const component of this.#components)
      yield ComponentStore.Get(component);
  }
}

export class Ast {
  readonly #data: Array<Component>;

  constructor(...data: Array<ComponentGroup>) {
    this.#data = data.flatMap((d) => [...d.iterator()]);
  }

  *iterator() {
    for (const item of this.#data) yield item;
  }

  get json() {
    return this.#data.flatMap((d) => d.json);
  }

  visited(visitor: Visitor) {
    const result: Array<Component> = [];

    for (const item of this.#data)
      result.push(ComponentStore.Visit(item, visitor));

    return new Ast(...result.map((c) => new ComponentGroup(c)));
  }
}
