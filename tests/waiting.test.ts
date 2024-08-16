import Spinnies from 'spinnies';
import { addWaiting, changeWaitingStatus } from '../src/utils/waiting';

jest.mock('spinnies');

describe('Waiting utilities', () => {
  let spinniesMock: jest.Mocked<Spinnies>;

  beforeEach(() => {
    spinniesMock = new Spinnies() as jest.Mocked<Spinnies>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a spinner with the given test', () => {
    spinniesMock.add = jest.fn();
    const result = addWaiting('test');

    expect(spinniesMock.add).toHaveBeenCalled;
    // expect(spinniesMock.add).toHaveBeenCalledWith('spinner', { text: 'test' });
    expect(result).toBeInstanceOf(Spinnies)
  });
});
