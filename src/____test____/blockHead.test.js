import { mount } from '@vue/test-utils';
import blockHead from '../components/blockHead.vue';

test('render head', () => {
  const wrapper = mount(blockHead, {
    props: {
      title: 'Block 66532',
    },
  });

  expect(wrapper.text()).toContain('Block 66532');
});
