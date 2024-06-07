import * as Localization from 'expo-localization';

export const getClientTimeZone = () => {
  let clientTimeZone = Localization.timezone;
  const [regionName, cityName] = clientTimeZone.split('/');
  return { regionName, cityName };
};