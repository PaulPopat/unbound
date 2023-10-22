import { ComponentGroup, Namespace } from "@ast";

export function ParseUnbound(input: string): ComponentGroup<Namespace> {
  return new ComponentGroup();
}
