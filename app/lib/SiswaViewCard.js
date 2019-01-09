//
// Toolbar Component
//
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Typo } from './Typography'
import { getColor } from './helpers'

export default class SiswaViewCard extends Component {
  render() {
    const {
      nis,
      nama,
      id,
      keys
    } = this.props

    const background = (keys % 2 == 0) ? { backgroundColor: '#ffffff' } : { backgroundColor: '#f2f2f2'}

    return (
      <TouchableOpacity onPress={this.handleGoto.bind(this)} onLongPress={this.handleLongPress.bind(this)}>
        <View style={[ styles.cardContainer, background ]}>
          <View style={styles.cardTitleContainer}>
            <Text style={[ styles.cardTitle, Typo.cardTitle ]}>
              {nis.toUpperCase()}
            </Text>
          </View>
          <View style={styles.cardDescriptionContainer}>
            <Text style={[ styles.cardDescription, Typo.cardDescription ]}>
              {(nama.length > 30)
              ? nama.slice(0, 30) + '...'
              : nama}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  handleLongPress() {
    this.props.onLongPressBtn(this.props.id)
  }

  handleGoto() {
    this.props.onPressBtn(this.props.id, this.props.nis, this.props.nama)
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  cardTitleContainer: {
    justifyContent: 'center'
  },
  cardTitle: {
    marginBottom: 10
  },
  cardDescriptionContainer: {

  },
  cardDescription: {

  }
})
