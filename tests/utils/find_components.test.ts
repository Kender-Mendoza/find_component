import findComponent from '../../src/utils/find_components';

jest.mock('fs', () => {
  return {
    createReadStream: jest.fn()
  }
});

jest.mock('readline', () => {
  return {
    createInterface: jest.fn()
      .mockReturnValue([
        'Clients::TableRow::TableRowComponent',
        'Clients::Filter::FilterComponent'
      ])
  }
});

describe('Find component', () => {
  it('should see list component without use', async () => {
    const componentClassList = [
      {
        name: 'Clients::TableRow::TableRowComponent',
        path: 'table_row/table_row_component.rb'
      },
      {
        name: 'Clients::Filter::FilterComponent',
        path: 'filter/filter_component.rb'
      },
      {
        name: 'Clients::Form::FormComponent',
        path: 'form/form_component.rb'
      }
    ]

    const fileList = [
      'table_row/table_row_component.rb',
      'filter/filter_component.rb',
      'form/form_component.rb'
    ];

    const files = await findComponent(componentClassList, fileList);

    expect(files).toEqual([
      {
        name: 'Clients::Form::FormComponent',
        path: 'form/form_component.rb'
      }
    ])
  });
});
