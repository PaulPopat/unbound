import { Location } from "@compiler/location";

export abstract class Visitor<T extends Component> {
  abstract get OperatesOn(): Array<new (...args: any[]) => T>;

  abstract Visit(target: T): Component | undefined;
}

export abstract class Component {
  readonly #location: Location;

  constructor(location: Location) {
    this.#location = location;
  }

  get Location() {
    return this.#location;
  }

  abstract inner_visited(visitor: Visitor<Component>): Component;

  visited(visitor: Visitor<Component>): Component {
    if (!visitor.OperatesOn.find((o) => this instanceof o))
      return this.inner_visited(visitor);

    const result = visitor.Visit(this);
    if (!result) return this.inner_visited(visitor);

    return result;
  }

  type_safe_visited<T extends Component>(
    checker: abstract new (...args: any[]) => T,
    visitor: Visitor<Component>
  ) {
    const result = this.visited(visitor);
    if (!(result instanceof checker))
      throw new Error("Invalid type from visitor");

    return result;
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

export class ComponentGroup<TComponent extends Component> {
  readonly #components: Array<TComponent>;

  constructor(...components: Array<TComponent>) {
    this.#components = components;
  }

  get Length() {
    return this.#components.length;
  }

  get First() {
    return this.#components[0];
  }

  get Last() {
    return this.#components[this.#components.length - 1];
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

  visited(visitor: Visitor<Component>) {
    return new ComponentGroup(
      ...this.#components.map((c) => c.visited(visitor))
    );
  }

  type_safe_visited<T extends Component>(
    checker: abstract new (...args: any[]) => T,
    visitor: Visitor<Component>
  ) {
    return new ComponentGroup(
      ...this.#components.map((c) => c.type_safe_visited(checker, visitor))
    );
  }

  get json() {
    return this.#components.map((c) => c.json);
  }

  iterator() {
    return this.#components[Symbol.iterator]();
  }
}

export class Ast<TType extends Component> {
  readonly #data: Array<ComponentGroup<TType>>;

  constructor(...data: Array<ComponentGroup<TType>>) {
    this.#data = data;
  }

  *iterator() {
    for (const item of this.#data) yield* item.iterator();
  }

  visited(visitor: Visitor<Component>) {
    return new Ast(...this.#data.map((g) => g.visited(visitor)));
  }
}
