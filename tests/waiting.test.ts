// import Spinnies from 'spinnies';
import Spinnies from 'spinnies';
import * as waitingModule from '../src/utils/waiting';

jest.mock('spinnies', () => {
  class Spinnies {
    add = jest.fn();
    succeed = jest.fn();
    fail = jest.fn();
  };

  return Spinnies;
});

describe('Waiting utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a spinner with the given test', () => {
    const waiting = waitingModule.addWaiting('testing');

    expect(waiting).toBeInstanceOf(Spinnies);
    expect(waiting.add).toHaveBeenCalledWith('spinner', { text: 'testing' });
  });

  it('should change the spinner status to succeed', () => {
    const spinner = new Spinnies();
    waitingModule.changeWaitingStatus(spinner, 'succeed', 'testing message');

    setTimeout(() => {
      expect(spinner.succeed).toHaveBeenCalledWith('spinner', { text: `Success! ✨: testing message` });
    }, 1000);
  });

  it('should change the spinner status to fail', () => {
    const spinner = new Spinnies();
    waitingModule.changeWaitingStatus(spinner, 'fail', 'testing message');

    setTimeout(() => {
      expect(spinner.fail).toHaveBeenCalledWith('spinner', { text: `Fail 🐙: testing message` });
    }, 1000);
  });
});
