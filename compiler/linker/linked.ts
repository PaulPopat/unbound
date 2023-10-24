import { Component } from "@compiler/ast";

export class Linked {
  readonly #component: Component;
  readonly #connected_to: Component | undefined;

  constructor(component: Component, connected_to: Component | undefined) {
    this.#component = component;
    this.#connected_to = connected_to;
  }

  get json() {
    return {
      component: this.#component.json,
      connected_to: this.#connected_to?.json ?? null,
    };
  }
}
