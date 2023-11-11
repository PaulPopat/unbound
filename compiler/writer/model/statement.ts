import { StoreStatement } from "#compiler/ast";
import { WriterError } from "../error";

export function WriteStore(store: StoreStatement) {
  const type = store.Type;
  if (!type) throw new WriterError(store.Location, "Failed to link store type");
}
