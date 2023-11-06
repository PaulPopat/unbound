import {
  AccessExpression,
  Component,
  ComponentGroup,
  InvokationExpression,
  ReferenceExpression,
  StructEntity,
} from "@compiler/ast";
import { ReferenceCollectorVisitor } from "./reference-collector-visitor";
import { LinkerError } from "../error";

export class FunctionFlatteningVisitor extends ReferenceCollectorVisitor {
  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [...super.OperatesOn, InvokationExpression];
  }

  Visit(target: Component) {
    if (target instanceof InvokationExpression) {
      const subject = target.Subject;
      if (subject instanceof AccessExpression) {
        const accessing = subject.Subject;
        if (
          accessing instanceof ReferenceExpression &&
          accessing.References instanceof StructEntity &&
          accessing.References.HasKey(accessing.Name)
        ) {
          return {
            result: undefined,
            cleanup: () => {},
          };
        }

        const found = this.find(subject.Target);
        if (!found)
          throw new LinkerError(
            target.Location,
            `Reference not found ${subject.Target}`
          );
        return {
          result: new InvokationExpression(
            target.Location,
            found,
            new ComponentGroup(accessing, ...target.Parameters.iterator())
          ),
          cleanup: () => {},
        };
      }
    }

    return super.Visit(target);
  }
}
