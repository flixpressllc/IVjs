import { CommandBuilderContext, CommandHandlerInitializer } from '../../../plugin-types';

export const stopExecutionFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  return {
    stopExecution: (cmd: ICommand.StopExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['exit'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export const pauseExecutionFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  return {
    pauseExecution: (cmd: ICommand.PauseExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['pause'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export interface AddStopExecution {
  endAllNodes();
}

export const stopExecution: AddStopExecution['endAllNodes'] = function(this: CommandBuilderContext): void {
  const commandStop: ICommand.StopExecution = { name: 'stopExecution' };
  this.pushCommands(commandStop);
};
