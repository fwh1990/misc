import React, { createRef, PureComponent } from 'react';
import { TextInput, View } from 'react-native';
import UIText from '../../libraries/ui/UIText';

interface OwnProps {
  length: number;
  onChange: (value: string, isOk: boolean) => void;
  autoFocus: boolean;
}

type Props = OwnProps;

type State = Readonly<{
  value: string;
  focused: boolean;
}>;

class InputMask extends PureComponent<Props, State> {
  static defaultProps = {
    autoFocus: false,
  };

  readonly state: State = {
    value: '',
    focused: false,
  };

  public inputRef = createRef<TextInput>();

  handleChangeText = (value: string) => {
    const { length, onChange } = this.props;
    const { value: originalValue } = this.state;

    value = value.replace(/[^0-9]/g, '');

    if (value.length >= length) {
      value = value.substr(0, length);
    }

    if (value !== originalValue) {
      onChange(value, value.length === length);

      this.setState({
        value,
      });
    }
  };

  handleFocus = () => {
    this.setState({
      focused: true,
    });
  };

  handleBlue = () => {
    this.setState({
      focused: false,
    });
  };

  render() {
    const { length, autoFocus } = this.props;
    const { value, focused } = this.state;
    const arr: string[] = [];
    const inputed = value.split('');

    for (let index = 0; index < length; ++index) {
      arr.push(inputed[index] || '');
    }

    return (
      <View style={{
        position: 'relative',
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          {arr.map((item, index) => (
            <View key={index} style={{
              borderWidth: 0.5,
              borderLeftWidth: index === 0 ? 0.5 : 0,
              borderColor: focused && index === inputed.length ? '#0066ff' : (focused ? '#aaa' : '#ddd'),
              borderRightColor: (
                focused &&
                (
                  index === inputed.length ||
                  index === inputed.length - 1 && inputed.length < length
                )
              ) ? '#0066ff' : (focused ? '#aaa' : '#ddd'),
              flex: 1,
              height: 44,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <UIText style={{ fontSize: 18 }}>{item}</UIText>
            </View>
          ))}
        </View>
        <TextInput
          ref={this.inputRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: 44,
            opacity: 0,
          }}
          value={value}
          onChangeText={this.handleChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlue}
          keyboardType="numeric"
          autoFocus={autoFocus}
        />
      </View>
    );
  }
}

export default InputMask;
