import { Location } from "@compiler/location";
import { LinkerError } from "../linker/error";

export abstract class Visitor {
  abstract get OperatesOn(): Array<new (...args: any[]) => Component>;

  abstract Visit(target: Component): {
    result: Component | undefined;
    cleanup: () => void;
  };
}

export abstract class Component {
  readonly #location: Location;

  constructor(location: Location) {
    this.#location = location;
  }

  get Location() {
    return this.#location;
  }

  abstract inner_visited(visitor: Visitor): Component;

  visited(visitor: Visitor): Component {
    if (!visitor.OperatesOn.find((o) => this instanceof o))
      return this.inner_visited(visitor);

    const { result, cleanup } = visitor.Visit(this);
    try {
      if (!result) return this.inner_visited(visitor);

      return result;
    } finally {
      cleanup();
    }
  }

  type_safe_visited<T extends Component>(
    checker: abstract new (...args: any[]) => T,
    visitor: Visitor
  ) {
    const result = this.visited(visitor);
    // if (!(result instanceof checker))
    //   throw new LinkerError(this.Location, "Invalid type from visitor");

    return result as T;
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

  visited(visitor: Visitor) {
    return new ComponentGroup(
      ...this.#components.map((c) => c.visited(visitor))
    );
  }

  type_safe_visited<T extends Component>(
    checker: abstract new (...args: any[]) => T,
    visitor: Visitor
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

  visited(visitor: Visitor) {
    return new Ast(...this.#data.map((g) => g.visited(visitor)));
  }

  get json() {
    return this.#data.flatMap((d) => d.json);
  }
}
