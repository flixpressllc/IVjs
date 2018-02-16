import { createEngine } from './command-engine';
import { CommandRunner } from './commandRunner';

import * as ff from './dom-commands/';

const factories: CommandEngine.TargetFunctionFactory[] = [
  ff.videoPlayFactory,
  ff.goToNodeFactory,
  ff.stopExecutionFactory,
  ff.audioSourceFactory,
  ff.audioVolumeFactory,
];

export function createDomEngine(input: {
  settings: IV.Settings,
  nodes: IvNode[],
  variables: {[x:string]: any}
}) {
  const { settings, nodes, variables } = input;
  return createEngine({
    commandRunnerClass: CommandRunner,
    settings,
    nodes,
    variables
  }, ...factories)
}