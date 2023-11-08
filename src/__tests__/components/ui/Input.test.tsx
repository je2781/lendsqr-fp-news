import 'react-native';import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import Input from '../../../components/ui/Input';


describe('<TextInput />', () => {
  it('Calls onChangeText', async () => {
    //defining variable to collect test input
    let userInput: string = '';
    const onChange = jest.fn(function(value: string){
        userInput = value;
    });
    //defining test id of text input component
    const testID = 'textInput';

    // Rendering Input component using react-native-test-renderer.
    const {getByTestId} = render(
      <Input testID={testID} onUpdateValue={onChange}/>
       
    );

    const textInput = getByTestId(testID);

    /**
     * RNTL gives us API to fire events on node
     * Here we are firing changeText event
     */
    fireEvent.changeText(textInput, 'hi');

    // Asserting that mock method has stored test input inside test input variable.
    expect(userInput).toBe('hi');
  });
});