import React from 'react';
import {alertContext} from './AlertProvider';

export function useAlert() {
  const alert = React.useContext(alertContext);
  return alert;
}

export {AlertType} from './Alert';
