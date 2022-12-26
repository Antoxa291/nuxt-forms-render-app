import { shallowMount } from '@vue/test-utils';
import EditPage from '@/pages/edit.vue';

describe('EditPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditPage);
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('adds a new field when the "Add field" button is clicked', () => {
    const addField = wrapper.find('v-btn addField');
    addField.trigger('click');

    expect(wrapper.vm.fields.length).toBe(1);
  });

  it('deletes a field when the delete button is clicked', () => {
    wrapper.vm.fields = [{ id: 'parameter_2', type: 'input' }];

    const deleteButton = wrapper.find('v-btn deleteButton');
    deleteButton.trigger('click');

    expect(wrapper.vm.fields.length).toBe(0);
  });

  it('copies the serialized data to the clipboard when the "Copy results to clipboard" button is clicked', () => {
    wrapper.vm.fields = [{ id: 'parameter_1', type: 'divider' }];
    const copyButton = wrapper.find('v-btn copyButton');
    copyButton.trigger('click');

    expect(navigator.clipboard.readText().length).toBe(0);
  });
});
