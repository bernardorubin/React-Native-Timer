import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// this class is the entry point to your application
export default class App extends React.Component {
  // inherits props from react Component, instantiates app with the default props

  constructor(props) {
    super(props);
    this.state = { clockDisplay: '00:00:00:00' }
  }

  startStopTimer(){
    console.log('start/stop timer');
  }

  resetTimer() {
    console.log('reset timer');
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
            <Text>Start</Text>
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
