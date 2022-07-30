export const bluetoothHandle = () => {
  (document.querySelector('#ble') as HTMLButtonElement).addEventListener('click', () => connectBluetooth());

  const connectBluetooth = async () => {
    if (!('navigator' in window)) return;

    // Connect Device
    // @ts-ignore-next-line
    const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
    const server = await device.gatt.connect();

    // Get heart rate data
    const hr = await server.getPrimaryService('heart_rate');
    const hrMeasurement = await hr.getCharacteristic('heart_rate_measurement');

    // Listen to changes on device
    await hrMeasurement.startNotifications();

    hrMeasurement.addEventListener('characteristicvaluechanged', (e: any) => {
      console.log(parseHeartRate(e.target.value));
    });
  };

  const parseHeartRate = (initialValue: any) => {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    const value: DataView = initialValue.buffer ? initialValue : new DataView(initialValue);
    const flags = value.getUint8(0);

    const rate16Bits = flags & 0x1;
    const contactDetected = flags & 0x2;
    const contactSensorPresent = flags & 0x4;
    const energyPresent = flags & 0x8;
    const rrIntervalPresent = flags & 0x10;

    const result: { [key: string]: any } = {};

    let index = 1;

    result.heartRate = value.getUint16(index, !!rate16Bits);
    index += 1 + +!!rate16Bits;

    contactSensorPresent && (result.contactDetected = !!contactDetected);

    if (energyPresent) {
      result.energyExpended = value.getUint16(index, true);
      index += 2;
    }

    if (rrIntervalPresent) {
      const rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, true));
      }
      result.rrIntervals = rrIntervals;
    }

    return result;
  };
};
