import { IvNode } from '../../../node';
import { getRandomInt } from '../../../utils';

interface RandomOptions {
  min: number;
  max: number;
  storeIn: string;
}

export const getRandomNumberFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'getRandomNumber':
      (cmd: ICommand.GetRandomNumber) =>
        Promise.resolve(getRandomNumber(input, cmd))
  }
}

export function getRandomNumber(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.GetRandomNumber
): Runner.CommandReturn {

  given.variables[cmd.assignTo] = getRandomInt(cmd.min, cmd.max);
  return {};
}

export function getRandomNumberApi(this: IvNode, objSettings: RandomOptions) : void {
  const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.storeIn };
  this.pushCommands(command);
}