import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// this class is the entry point to your application
export default class App extends React.Component {
  // inherits props from react Component, instantiates app with the default props

  constructor(props) {
    super(props);
    this.state = { clockDisplay: '00:00:00:00',
                    elapsedTime: 0,
                    startTime: null };
    this.startStopTimer = this.startStopTimer.bind(this);
    // this.currentElapsedTime = this.currentElapsedTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startStopTimer() {

    if(this.state.startTime) {
      clearInterval(this.timer);
      const newTime = this.state.elapsedTime + (new Date() - this.state.startTime);
      this.setState({ startTime: null, elapsedTime: newTime});
    } else {
      this.setState({ startTime: new Date() });
      this.timer = setInterval( () => {
        const newTime = this.state.elapsedTime + (new Date() - this.state.startTime);
        this.setState({ clockDisplay: this.convertMsToDigitalClock(newTime) });
      }, 20);
    }
  }

  // currentElapsedTime() {
  //   this.state.elapsedTime + (new Date() - this.state.startTime);
  // }

  convertMsToDigitalClock(ms) {
    const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
    const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    const remainMs = Math.floor((ms - 3600000 * hours - minutes * 60000 - seconds * 1000) / 10);
    return `${this.twoDigits(hours)}:${this.twoDigits(minutes)}:${this.twoDigits(seconds)}:${this.twoDigits(remainMs)}`;
  }
  twoDigits(number) {
    if(number >= 10) {
      return number.toString();
    } else {
      return `0${number.toString()}`
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({ clockDisplay: '00:00:00:00',
                   elapsedTime: 0,
                   startTime: null });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Awesome Timer</Text>

        <Text style={styles.clockText}>{this.state.clockDisplay}</Text>

        <View>
          <TouchableHighlight underlayColor='#ff663d'
                              onPress={this.startStopTimer}
                              style={styles.startButton} >
            <Text>{this.state.startTime ? 'Stop' : 'Start'}</Text>
          </TouchableHighlight>

          <TouchableHighlight underlayColor='#ff663d'
                              onPress={this.resetTimer}
                              style={styles.startButton} >
            <Text>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 30,
    color: '#9c0a0a'
  },
  clockText: {
    fontSize: 35,
    // fontFamily: 'Courier New' // monospace for Android phones
  },
  startButton: {
    width: 250,
    height: 50,
    marginBottom: 5,
    backgroundColor: '#ffafac',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
