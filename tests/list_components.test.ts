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
      'Clients::TableRow::TableRowComponent',
      'Clients::Filter::FilterComponent',
      'Clients::Form::FormComponent'
    ])
  });
});
