/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {ButtonType} from './Alert';
import Alert, {AlertType} from './Alert';

export type ArgumentsType = {
  title: string;
  message: string;
  firstButton: ButtonType;
  secondButton?: ButtonType;
};

export type AlertPropsType = ArgumentsType;

export type AlertContextType = {
  type: AlertType;
  title: string;
  message: string;
  firstButton: ButtonType;
  secondButton?: ButtonType;
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
  title: '',
  message: '',
  type: AlertType.FAIL,
  firstButton: {
    text: '',
    onPress: undefined,
  },
  secondButton: {
    text: '',
    onPress: undefined,
  },
};

export const alertContext = React.createContext({
  warn: ({...initialState}: ArgumentsType) => {},
  confirm: ({...initialState}: ArgumentsType) => {},
});

const {Provider} = alertContext;

interface AlertProviderProps {
  children?: JSX.Element | JSX.Element[];
}

const AlertProvider = ({children}: AlertProviderProps) => {
  const [alertState, setAlertState] = React.useState<AlertContextType>(initialState);

  const warn = ({title, message, firstButton, secondButton}: ArgumentsType) => {
    setAlertState({title, message, isOpen: true, type: AlertType.FAIL, firstButton, secondButton});
  };

  const confirm = ({title, message, firstButton, secondButton}: ArgumentsType) => {
    setAlertState({title, message, isOpen: true, type: AlertType.CONFIRM, firstButton, secondButton});
  };

  const close = () => {
    setAlertState({...initialState});
  };

  return (
    <>
      <Provider value={{warn, confirm}}>{children}</Provider>
      <Alert {...alertState} close={close} />
    </>
  );
};

export default AlertProvider;
