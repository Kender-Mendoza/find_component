import listFiles from '../../src/utils/list_files';

jest.mock('../../src/helpers/path_manager', () => {
  return {
    APP_PREFIX: jest.fn().mockReturnValue('/example/app/components')
  };
});

jest.mock('glob', () => {
  return {
    glob: jest.fn()
      .mockReturnValue(new Promise((resolve, reject) => {
        resolve([
          'table_row/table_row_component.rb',
          'filter/filter_component.erb',
          'form/form_component.rb'
        ])
      }))
  }
});

describe('list files', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should see list files from a path', async () => {
    const componentClassNames = await listFiles();

    expect(componentClassNames).toEqual([
      'table_row/table_row_component.rb',
      'filter/filter_component.erb',
      'form/form_component.rb'
    ])
  });
});
