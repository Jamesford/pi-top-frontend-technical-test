import React from 'react'
import { shallow } from 'enzyme'
import Layout from '.'

test('Layout contains main dom nodes', () => {
  const layout = shallow(<Layout />)

  expect(layout.find('h1').text()).toBe('Pi-Top Todo')
})
