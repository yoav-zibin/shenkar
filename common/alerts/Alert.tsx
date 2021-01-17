import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

export enum AlertType {
  FAIL,
  CONFIRM,
}

export type ButtonType = {
  text: string;
  onPress?: () => void;
};

interface AlertProps {
  isOpen: boolean;
  close: () => void;
  type: AlertType;
  title: string;
  message: string;
  firstButton: ButtonType;
  secondButton?: ButtonType;
}

const Alert = ({isOpen, close, title, message, firstButton, secondButton}: AlertProps) => {
  const buttonPress = () => {
    close();
    if (firstButton.onPress) {
      firstButton.onPress();
    }
  };
  const secondButtonPress = () => {
    close();
    if (secondButton && secondButton.onPress) {
      secondButton.onPress();
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable style={[styles.modalContainer, {paddingHorizontal: '4%'}]} onPress={close}>
        <View style={styles.box}>
          <View style={{paddingHorizontal: 8}}>
            <Text style={styles.confirmTitle}>{title}</Text>
            <Text style={styles.confirmMessage}>{message}</Text>
          </View>
          <View style={{paddingVertical: 32, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Pressable style={[styles.button, {backgroundColor: '#1DA1F2'}]} onPress={buttonPress}>
              <Text style={styles.buttonText}>{firstButton.text}</Text>
            </Pressable>
            {secondButton && (
              <Pressable style={[styles.button, {backgroundColor: 'grey'}]} onPress={secondButtonPress}>
                <Text style={styles.buttonText}>{secondButton.text}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
    paddingHorizontal: '10%',
  },
  title: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    paddingHorizontal: '8%',
    marginTop: 30,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  confirmTitle: {
    padding: 8,
    fontSize: 32,
    textAlign: 'center',
  },
  confirmMessage: {
    paddingVertical: 16,
    fontSize: 17,
    textAlign: 'center',
  },
  box: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: 40,
  },
});

export default Alert;
