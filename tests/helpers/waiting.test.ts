import Spinnies from 'spinnies';
import * as waitingModule from '../../src/helpers/waiting';

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

    expect(spinner.succeed).toHaveBeenCalledWith('spinner', { text: `Success! ✨: testing message` });
  });

  it('should change the spinner status to fail', () => {
    const spinner = new Spinnies();
    waitingModule.changeWaitingStatus(spinner, 'fail', 'testing message');

    expect(spinner.fail).toHaveBeenCalledWith('spinner', { text: `Fail 🐙: testing message` });
  });
});
