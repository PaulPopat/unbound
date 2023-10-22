import { Location } from "@location";

export abstract class Component {
  readonly #location: Location;

  constructor(location: Location) {
    this.#location = location;
  }

  get Location() {
    return this.#location;
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
      this.First.Location.StartLine,
      this.First.Location.StartColumn,
      this.Last.Location.EndLine,
      this.Last.Location.EndColumn
    );
  }

  get json() {
    return this.#components.map((c) => c.json);
  }
}
