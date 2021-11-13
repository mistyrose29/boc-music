import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import {HomePage} from '../client/src/HomePage/Projects.jsx'

var mockProps = {
friends: [
{id: "ciLj06t5VmMYUlODiHdOsjdrFIA3",
name: "Jason Mollerup",
photo: "https://lh3.googleusercontent.com/ogw/ADea4I4BZE5HBROkUDyYyyJ7rnto3ydbNMfmQdDLvsbz4g=s192-c-mo"},
{id: "DloPtmMlntV9RebNZShpnSUnbmI3",
name: "Abdulhameed",
photo: ""}
],
ownerId: "AKCtFiHxrcbZifYQTEkstmvR0ym2",
ownerName: "Quinn Lima"
}


describe('HomePage', () => {
    const wrapper = shallow(
      <HomePage state = {mockProps}/>)
      const instance = wrapper.instance()
      test('should render properly', () => {
          console.log('jeslloo')
        const component = renderer.create(<HomePage state = {mockProps}/>);
        const instance = component.getInstance();
        //console.log('its a wrap', wrapper.find('.expandedProductCatagory').text())
  
        console.log('nope', component.toJSON().children)
  
        // expect(component.toJSON().children[1].children[1].children[0].children[1].children[0]).toBe('Jackets');
        // expect(component.toJSON().children[1].children[1].children[0].children[2].children[0]).toBe('Camo Onesie');
        // expect(component.toJSON().children[1].children[1].children[0].children[3].children[0]).toBe('Forest Green & Black')
        // expect(component.toJSON().children[1].children[1].children[0].children[4].children[0]).toBe('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.')
        // expect(component.toJSON().children[1].children[1].children[0].children[5].children[2]).toBe('140.00')
      })
    //   test('changeSelectedQuantity should work', () => {
    //     instance.changeSelectedQuantity({target: {value: 2}});
    //     expect(instance.state.quantitySelected).toBe(2);
    //   })
    //    test('changeSelectedQuantity should work', () => {
    //     instance.changeSelectedQuantity({target: {value: 2}});
    //     expect(instance.state.quantitySelected).toBe(2);
    //   })
    })