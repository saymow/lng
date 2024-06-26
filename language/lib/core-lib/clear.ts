import { Value } from "../expr";
import { SysCall, System } from "../interfaces";

class Clear extends SysCall {
  public arity(): number {
    return 0;
  }

  public async call(system: System, _: Value[]) {
    return system.clear();
  }
}

export default Clear;
