import { ComponentGroup, Namespace } from "@ast";
import { SplitTokens } from "./tokeniser";

export function ParseUnbound(input: string): ComponentGroup<Namespace> {
  const tokens = SplitTokens(input);
  return new ComponentGroup();
}
