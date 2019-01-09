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
import { updateSiswa } from '../actions'

class SingleSiswa extends Component {
  constructor(props) {
    super(props)

    this._handleBackButton = this._handleBackButton.bind(this)

    this.state = {
      changed: false,
      id: this.props.siswaId,
      nis: this.props.nis,
      nama: this.props.nama
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backPressedSingleSiswa', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPressedSingleSiswa', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.state.changed && this.state.nis != '') {
      this.updateSiswa()
    } else {
      this.goBack()
    }
    return true
  }

  render() {
    return(
      <View style={ styles.addNotesContainer }>
        <StatusBar
          backgroundColor={getColor('paperBlue700')}
          barStyle="light-content"
          animated={true}
        />
        <Toolbar title="Edit Siswa" color={getColor('paperBlue')}/>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputSiswaStyle}
            placeholder='NIS'
            placeholderTextColor='#aaa'
            returnKeyType='next'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => this.setState({ nis: text, changed: true })}
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
            onChangeText={(text) => this.setState({nama: text, changed: true})}
            value={this.state.nama}
          />
        </View>

        <View style={styles.inputScreenBtnContainer}>
          <TickBtn onBtnPress={this.updateSiswa.bind(this)} />
        </View>

      </View>
    )
  }

  goBack(event) {
    this.props.navigator.pop()
  }

  updateSiswa() {
    if (this.state.changed) {
      this.props.updateSiswa({
        id: this.state.id,
        nis: this.state.nis,
        nama: this.state.nama
      })
    }

    this.goBack()
  }
}

export default connect(null, { updateSiswa })(SingleSiswa)
