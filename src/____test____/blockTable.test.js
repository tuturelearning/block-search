import { mount } from '@vue/test-utils';
import blockTable from '../components/blockTable.vue';

test('render table', () => {
  const wrapper = mount(blockTable, {
    props: {
      pkey: 'Nonce',
      value: '1285091394',
    },
  });

  expect(wrapper.text()).toContain('Nonce');
  expect(wrapper.text()).toContain('1285091394');
});
