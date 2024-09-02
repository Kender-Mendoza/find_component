import validatePath from '../../src/utils/validate_path';
import { addWaiting, changeWaitingStatus } from '../../src/utils/waiting';

jest.mock('../../src/utils/waiting', () => {
  return {
    addWaiting: jest.fn(),
    changeWaitingStatus: jest.fn()
  };
});

jest.mock('fs', () => {
  return {
    existsSync: jest.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false),
    statSync: jest.fn()
      .mockReturnValueOnce({ isDirectory: () => true })
      .mockReturnValueOnce({ isDirectory: () => false })
  }
});

describe('validate path utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate succeded', () => {
    validatePath('./succeded_path');
    expect(addWaiting).toHaveBeenCalledWith('Validating...');
    expect(changeWaitingStatus).toHaveBeenCalledWith(addWaiting('Validating...'), 'succeed', 'Path valid');
  });

  it('should validate fail', () => {
    validatePath('./fail_path');
    expect(addWaiting).toHaveBeenCalledWith('Validating...');
    expect(changeWaitingStatus).toHaveBeenCalledWith(addWaiting('Validating...'), 'fail', `The path ./fail_path is invalid.`);
  });
});
