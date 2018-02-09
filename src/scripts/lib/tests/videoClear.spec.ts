import { IV } from './../iv';
import { create } from '../../../test-support/factories';

describe('wait()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a number', () => {
    test('it creates a valid wait Command', () => {
      const expectedObject = create('waitCommand', {time: 5500});
      const expectedObject1 = {name: 'clearVideo'};
      
      iv.node('anything').videoClear(5.5);

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      expect(iv.nodes[0].commands[1]).toEqual(expectedObject1);
    })
  })

  describe('when given nothing', () => {
    test('it creates a valid clearVideo command', () => {
      const expectedObject = {name: 'clearVideo'};
      
      iv.node('anything').videoClear();

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})