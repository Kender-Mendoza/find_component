import listComponents from '../src/utils/list_components';

jest.mock('glob', () => {
  return {
    glob: jest.fn()
      .mockReturnValue(new Promise((resolve, reject) => {
        resolve([
          'table_row/table_row_component.rb',
          'filter/filter_component.rb',
          'form/form_component.rb'
        ])
      }))
  }
});

describe('list components', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should see list component from a list path', async () => {
    const dirPath = '/example/components/clients';
    const componentClassNames = await listComponents(dirPath);

    expect(componentClassNames).toEqual([
      {
        "name": "Clients::TableRow::TableRowComponent",
        "path": "/example/components/clients/table_row/table_row_component.rb",
      },
      {
        "name": "Clients::Filter::FilterComponent",
        "path": "/example/components/clients/filter/filter_component.rb",
      },
      {
        "name": "Clients::Form::FormComponent",
        "path": "/example/components/clients/form/form_component.rb",
      }
    ])
  });
});
