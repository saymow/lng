import { Value } from "../expr";
import { SysCall, System } from "../interfaces";
import { CoreLibError } from "../errors";
import { isNumber, isString } from "./helpers";

class Int extends SysCall {
  public arity(): number {
    return 1;
  }

  public async call(system: System, args: Value[]) {
    const value = args[0];

    if (!(isString(value) || isNumber(value))) {
      throw new CoreLibError("Expected string or number.");
    }

    return parseInt(value);
  }
}

export default Int;
