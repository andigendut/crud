import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  BackAndroid,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import Toolbar from '../lib/Toolbar'
import TickBtn from '../lib/TickBtn'
import BackBtn from '../lib/BackBtn'
import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { Typo } from '../lib/Typography'
import { addSiswa } from '../actions'

class NewSiswa extends Component {
  constructor(props) {
    super(props);

    this._handleBackButton = this._handleBackButton.bind(this)

    this.state = {
      nis: '',
      nama: ''
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backPressed', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPressed', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.state.nis == '') {
      this.goBack()
    } else {
      this.addSiswa()
    }
    this.goBack()
    return true
  }

  render() {
    return (
      <View style={ styles.addNotesContainer }>
        <StatusBar
          backgroundColor={getColor('paperBlue700')}
          barStyle="light-content"
          animated={true}
        />
        <Toolbar title="Input Siswa" color={getColor('paperBlue')}/>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputSiswaStyle}
            autoFocus={true}
            placeholder='NIS'
            placeholderTextColor='#aaa'
            returnKeyType='next'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({ nis: text })}
            value={this.state.nis}
          />

          <TextInput
            style={styles.inputSiswaStyle}
            multiline={true}
            placeholder='Nama Siswa'
            placeholderTextColor='#aaa'
            returnKeyType='done'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({nama: text})}
            value={this.state.nama}
          />
        </View>

        <View style={styles.inputScreenBtnContainer}>
          <TickBtn onBtnPress={this.addSiswa.bind(this)} />
        </View>
      </View>
    )
  }

  goBack(event) {
    this.props.navigator.pop()
  }

  addSiswa() {
    this.props.addSiswa({
      nis: this.state.nis,
      nama: this.state.nama
    })
    this.goBack()
  }
}

export default connect(null, { addSiswa })(NewSiswa)
