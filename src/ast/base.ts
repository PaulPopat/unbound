export type ComponentContext = {
  line: number;
  column: number;
};

export abstract class Component {
  readonly #line_number: number;
  readonly #column_number: number;

  constructor(ctx: ComponentContext) {
    this.#line_number = ctx.line;
    this.#column_number = ctx.column;
  }

  get LineNumber() {
    return this.#line_number;
  }

  get ColumnNumber() {
    return this.#column_number;
  }
}

export class ComponentGroup<TComponent extends Component> {
  readonly #components: Array<TComponent>;

  constructor(...components: Array<TComponent>) {
    this.#components = components;
  }
}
