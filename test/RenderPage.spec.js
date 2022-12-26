import { shallowMount } from '@vue/test-utils';
import { clipboardCopy } from 'clipboard-copy';
import RenderPage from '@/pages/render.vue';

describe('RenderPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RenderPage);
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('pastes text from the clipboard when the "Paste from clipboard" button is clicked', () => {
    clipboardCopy('test clipboard text');

    const pasteButton = wrapper.find('v-btn pasteFromClipboard');
    pasteButton.trigger('click');

    expect(wrapper.vm.inputString).toBe('test clipboard text');
  });

  it('decodes and renders the serialized data when the "Show Form" button is clicked', () => {
    wrapper.vm.inputString = 'W3sidHlwZSI6ImRpdmlkZXIiLCJpZCI6InBhcmFtZXRlcl8xIiwibmFtZSI6IkRpdmlkZXIiLCJkZWZhdWx0IjoiIiwicmVxdWlyZWQiOnRydWUsInZhbHVlIjoiSnVzdCBmb3IgdGVzdHMpIn1d==';
    const showButton = wrapper.find('v-btn showButton');
    showButton.trigger('click');

    expect(wrapper.vm.fields.length).toBe(1);
  });

  it('clears the form when the "Clear" button is clicked', () => {
    wrapper.vm.inputString = 'W3sidHlwZSI6ImRpdmlkZXIiLCJpZCI6InBhcmFtZXRlcl8xIiwibmFtZSI6IkRpdmlkZXIiLCJkZWZhdWx0IjoiIiwicmVxdWlyZWQiOnRydWUsInZhbHVlIjoiSnVzdCBmb3IgdGVzdHMpIn1d';
    wrapper.vm.serializedData = '{"fields":[{"id":"parameter_1","type":"divider","name":"Divider","value":"Just for tests)","default":null,"required":true}]}';

    const clearButton = wrapper.find('v-btn clearForm');
    clearButton.trigger('click');

    expect(wrapper.vm.inputString).toBe('');
    expect(wrapper.vm.serializedData).toBe('');
  });
});
