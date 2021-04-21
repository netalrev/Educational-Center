import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Test {
  readonly id: string;
  readonly name?: string;
  constructor(init: ModelInit<Test>);
  static copyOf(source: Test, mutator: (draft: MutableModel<Test>) => MutableModel<Test> | void): Test;
}