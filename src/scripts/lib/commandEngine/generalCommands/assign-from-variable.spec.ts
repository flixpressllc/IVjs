import { assignFromVariableFactory } from './assign-from-variable';
import { create, createMockEngine } from '../../../../test-support'

describe('go-to-node-factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = assignFromVariableFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('assignFromVariable')
    expect(typeof tfo.assignFromVariable).toEqual('function')
  })

  test('it sets a variable from another variable value', () => {
    const variables: any = {name: 'Bob'};
    const tfo = assignFromVariableFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables
    });

    const command: ICommand.AssignFromVariable = { name: 'assignFromVariable', varName: 'name', assignTo: 'sameName' };
    tfo.assignFromVariable(command)

    expect(variables.sameName).toEqual('Bob');
  })

})