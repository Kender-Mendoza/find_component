import listFiles from '../src/utils/list_files';

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
    const dirPath = '/example/app/components';
    const componentClassNames = await listFiles(dirPath);

    expect(componentClassNames).toEqual([
      'table_row/table_row_component.rb',
      'filter/filter_component.erb',
      'form/form_component.rb'
    ])
  });
});
