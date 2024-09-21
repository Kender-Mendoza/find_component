import listComponents from '../../src/utils/list_components';

jest.mock('../../src/constants/path', () => {
  return {
    DIR_PATH: '/example/components/clients'
  };
});

jest.mock('glob', () => {
  return {
    glob: jest.fn()
      .mockReturnValue(new Promise((resolve) => {
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
    const componentClassNames = await listComponents();

    expect(componentClassNames).toEqual([
      {
        "className": "Clients::TableRow::TableRowComponent",
        "path": "/example/components/clients/table_row/table_row_component.rb",
      },
      {
        "className": "Clients::Filter::FilterComponent",
        "path": "/example/components/clients/filter/filter_component.rb",
      },
      {
        "className": "Clients::Form::FormComponent",
        "path": "/example/components/clients/form/form_component.rb",
      }
    ])
  });
});
