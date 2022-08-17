import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {
  state = {
    ...initialState
  }

  addDigit = value => {
    if(value == '.' && this.state.displayValue.includes('.')) {
      return
    }

    const clearDisplay = (this.state.displayValue == '0' && value != '.') || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + value;
    this.setState({ displayValue, clearDisplay: false })

    if(value != '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];

      values[this.state.current] = newValue;
      this.setState({ values })

    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  deleteLast = () => {
    let displayValue = String(this.state.displayValue).slice(0, -1);
    this.setState({ displayValue: displayValue == '' ? '0' : displayValue })
  }

  setOperation = operation => {
    if(this.state.current == '0') {
      this.setState({operation, current: 1, clearDisplay: true})
    } else {
      const equals = operation == '=';
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch(e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: String(values[0]),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        clearDisplay: true,
        values,
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button
            label="AC"
            onClick={this.clearMemory}
            double
            deleteButton
            />
          <Button
            label="⊗"
            onClick={this.deleteLast}
            deleteButton
            />
          <Button
            label="&divide;"
            operation
            onClick={() => this.setOperation('/')}
            />
          <Button
            label="7"
            onClick={() => this.addDigit(7)}
            />
          <Button
            label="8"
            onClick={() => this.addDigit(8)}
            />
          <Button
            label="9"
            onClick={() => this.addDigit(9)}
            />
          <Button
            label="&times;"
            operation
            onClick={() => this.setOperation('*')}
            />
          <Button
            label="4"
            onClick={() => this.addDigit(4)}
            />
          <Button
            label="5"
            onClick={() => this.addDigit(5)}
            />
          <Button
            label="6"
            onClick={() => this.addDigit(6)}
            />
          <Button
            label="-"
            operation
            onClick={() => this.setOperation('-')}
            />
          <Button
            label="1"
            onClick={() => this.addDigit(1)}
            />
          <Button
            label="2"
            onClick={() => this.addDigit(2)}
            />
          <Button
            label="3"
            onClick={() => this.addDigit(3)}
            />
          <Button
            label="+"
            operation
            onClick={() => this.setOperation('+')}
            />
          <Button
            label="0"
            double
            onClick={() => this.addDigit(0)}
            />
          <Button
            label="."
            onClick={() => this.addDigit('.')}
            />
          <Button
            label="="
            result
            onClick={() => this.setOperation('=')}
            />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});