import { FunctionEntity, InvokationExpression } from "#compiler/ast";
import { WriterError } from "../error";

function WriteReturnType(func: FunctionEntity) {
  const returns = func.Returns;
  if (!returns)
    throw new WriterError(func.Location, "No return type for function");

  if ()
}

export function WriteFunction(func: FunctionEntity, invokation: InvokationExpression) {

  
}
