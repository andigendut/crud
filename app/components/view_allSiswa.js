import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  BackAndroid,
  ListView
} from 'react-native'
import { connect } from 'react-redux'

import NewSiswa from './view_newSiswa'
import SingleSiswa from './view_singleSiswa'
import Toolbar from '../lib/Toolbar'
import SiswaViewCard from '../lib/SiswaViewCard'
import AddSiswaButton from '../lib/AddSiswaButton'
import { deleteSiswa } from '../actions'
import { styles } from './styles'
import { getColor } from '../lib/helpers'
import { Typo } from '../lib/Typography'
import Icon from '../lib/Icon'

class AllSiswa extends Component {
  constructor(props) {
    super(props)

    this._handleBackButton = this._handleBackButton.bind(this)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton)
  }

  _handleBackButton() {
    if (this.props.navigator.getCurrentRoutes().length == 1) {
      return false
    }
    return true
  }

  render() {
    return (
      <View style={ styles.allSiswaContainer }>
        <StatusBar
          backgroundColor={getColor('paperBlue700')}
          barStyle="light-content"
          animated={true}
        />
        <Toolbar title="Data Siswa" color={getColor('paperBlue')}/>
        { this.renderList() }

        <AddSiswaButton onBtnPress={this.addNewSiswa.bind(this)}/>
      </View>
    )
  }

  addNewSiswa() {
    this.props.navigator.push({component: NewSiswa, type: 'addingSiswa'})
  }

  goToSiswa(siswaId, nis, nama) {
    this.props.navigator.push({ component: SingleSiswa, type: 'editingSiswa', passProps: { siswaId, nis, nama } })
  }

  longPressSiswa(siswaId) {
    Alert.alert(
      'Hapus Siswa',
      'Yakin ingin Hapus?',
      [
        { text: 'Ya', onPress: () => this.deleteSiswa(siswaId) },
        { text: 'Tidak' }
      ]
    )
  }

  deleteSiswa(siswaId) {
    this.props.deleteSiswa(siswaId)
  }

  renderList() {
    if (this.props.siswa.length <= 0) {
      return (
        <View style={styles.emptyListContainer}>
          <Icon name="delete" size={180} color={getColor('#f0f0f0')} />
          <Text style={styles.emptyList}>Data Siswa Masih Kosong</Text>
        </View>
      )
    } else {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(this.props.siswa) || []

      return (
        <ListView
          dataSource={dataSource}
          renderRow={(siswa, sectionID, rowID) => {
            return (
              <SiswaViewCard
                nis={siswa.nis}
                nama={siswa.nama}
                id={siswa.id}
                keys={rowID}
                onPressBtn={this.goToSiswa.bind(this)}
                onLongPressBtn={this.longPressSiswa.bind(this)}
              />
            )
          }}
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return { siswa: state.allSiswa }
}

export default connect(mapStateToProps, { deleteSiswa })(AllSiswa)
