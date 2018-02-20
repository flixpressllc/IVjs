import { IV } from './iv';
import { create, wait, simulateLoadedNextVideo, simulatePlayThroughNextVideo, getCurrentVideo, getAudioPlayerNamed } from '../../test-support';

describe('integration', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  describe('.videoPlay()', () => {
    test('it plays (loads) a video', () => {
      iv.node('anything').videoPlay('test.mp4');
      iv.run('anything');

      simulateLoadedNextVideo()
      
      expect(getCurrentVideo().src).toEqual('test.mp4');
    })

    test('it plays videos in sequence', async () => {
      iv.node('node1').videoPlay({ url: 'test.mp4', onComplete: 'node2' });
      iv.node('node2').videoPlay('test2.mp4');

      
      iv.run('node1');
      simulatePlayThroughNextVideo();
      await wait();

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toEqual('test2.mp4');
    })
  })

  describe('.bgAudio()', () => {
    test('loads audio', () => {
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('test.mp3');
    })

    test('loads initial audio', () => {
      iv.settings = {
        bgAudioUrl: 'tester.mp3',
      }
      iv.node('anything');
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('tester.mp3');
    })

    test('plays audio', async () => {
      const mock = jest.fn();
      iv.node('anything')
        .bgAudio({ load: 'test.mp3' })
        .bgAudio('play');
      
      iv.run('anything');
      getAudioPlayerNamed('BG').play = mock;
      await wait();

      expect(mock).toHaveBeenCalled();
    })

  })

  describe('.setVariable()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it stores the variable', () => {
      iv.node('anything')
        .setVariable({ storeIn: 'name', value: 'bob' })

      iv.run('anything');

      expect(iv.variables.name).toEqual('bob')
    });

    test('it stores the variable', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'name', value: 'bob' })
        .setVariable({ var: 'name', storeIn: 'sameName' })

      iv.run('anything');
      await wait()

      expect(iv.variables.sameName).toEqual('bob')
    });
  })

  describe('.getRandom()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it stores a random number', () => {
      iv.node('anything')
        .getRandom({ storeIn: 'myRand', min: 5, max: 10 })

      iv.run('anything');

      expect(iv.variables.myRand).toBeGreaterThan(4)
      expect(iv.variables.myRand).toBeLessThan(11)
    });
  })

  describe('.calculate()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it adds one', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'count', value: 10 })
        .calculate({var: 'count', add: 1, storeIn: 'count'})

      iv.run('anything');
      await wait();

      expect(iv.variables.count).toBe(11)
    });
  })

  describe('.if()', () => {
    let variables;
    beforeEach(() => {
      variables = {count: 2};
      iv.variables = variables;
    })

    test('does the first match', async () => {
      iv.node('anything')
        .if({var: 'count', is: 2})
          .setVariable({ storeIn: 'name', value: 'Bob' })
        .else()
          .setVariable({ storeIn: 'name', value: 'Jim'})
        .endIf()

      iv.run('anything');
      await wait();

      expect(iv.variables.name).toEqual('Bob')
    });

    test('does the default', async () => {
      iv.node('anything')
        .if({ var: 'count', isGreaterThan: 2 })
          .setVariable({ storeIn: 'name', value: 'Bob' })
        .else()
          .setVariable({ storeIn: 'name', value: 'Jim' })
        .endIf()

      iv.run('anything');
      await wait();

      expect(iv.variables.name).toEqual('Jim')
    });
  })

})