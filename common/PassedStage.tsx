import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {localize} from './localize';
import {useStoreContext} from './store';
import Emoji from 'react-native-emoji';

const PassedStage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const {appState} = useStoreContext();

  if (modalVisible) {
    setTimeout(function () {
      setModalVisible(!modalVisible);
    }, 5000);
  }
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Emoji name="tada" style={{fontSize: 30, padding: 20}} />
            <Text style={styles.modalText}>{localize('LEVEL_SUCCESS', appState)}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PassedStage;
