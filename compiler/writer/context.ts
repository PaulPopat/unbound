export class CFile {
  #content: Array<string> = [];

  add_c(text: string) {
    this.#content = [...this.#content, text];
  }
}
