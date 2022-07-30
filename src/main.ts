import { bluetoothHandle } from './bluetooth';
import { contactPickerHandle } from './contact-picker';
import { deviceMotionHandle } from './device-motion';
import { fileSystemHandle } from './file-system';
import { idleDetectionHandle } from './idle-detection';
import { sharingHandle } from './sharing';
import './styles/index.css';

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
};

export const initWebFeatures = () => {
  bluetoothHandle();
  contactPickerHandle();
  deviceMotionHandle();
  fileSystemHandle();
  idleDetectionHandle();
  sharingHandle();
};

registerSW();
initWebFeatures();
