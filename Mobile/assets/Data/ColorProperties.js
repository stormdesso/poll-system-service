// ColorProperties.js
const listeners = [];

export const ColorProperties = {
  textColorInShortPollCard: "#FFFFFF",
  buttonColor: "#5C6BC0",
  buttonTextColor: "#fff",
  inputBlockBackgroundColor: "#E8EAF6",
  inputBlockBorderColor: "#9FA9DA",
  lableColor: "#9FA9DA",
  errorBorderColor: "red",
  backgroundColor: "whitesmoke",
  textColor: "#858585",
  shadowColor: "#000",
  otherUserMessageColor: "white",
  containerColorInPollInfoCard: "white",
  containerShadowInPollInfoCard: "gray",
  textColorInPollInfoCard: "black",
  userSettingsTextColor: "black",
  disabledColor: "#9c9c9c",
  
  subscribe: (listener) => {
    listeners.push(listener);
  },
  
  unsubscribe: (listener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  },
  
  notify: () => {
    listeners.forEach(listener => listener());
  },

  setProperty: (property, value) => {
    if (ColorProperties.hasOwnProperty(property)) {
      ColorProperties[property] = value;
      ColorProperties.notify();
    }
  },

  toggleTheme: () => {
    if (ColorProperties.backgroundColor === "whitesmoke") {
      ColorProperties.setProperty('backgroundColor', '#242529');
      ColorProperties.setProperty('textColor', 'white');
      ColorProperties.setProperty('lableColor', 'white');
      ColorProperties.setProperty('inputBlockBorderColor', '#858585')
      ColorProperties.setProperty('containerColorInPollInfoCard', '#414247')
      ColorProperties.setProperty('textColorInPollInfoCard', 'white')
      ColorProperties.setProperty('userSettingsTextColor', 'white')
    } else {
      ColorProperties.setProperty('backgroundColor', 'whitesmoke');
      ColorProperties.setProperty('textColor', '#858585');
      ColorProperties.setProperty('lableColor', '#9FA9DA');
      ColorProperties.setProperty('inputBlockBorderColor', '#9FA9DA')
      ColorProperties.setProperty('containerColorInPollInfoCard', 'white')
      ColorProperties.setProperty('textColorInPollInfoCard', 'black')
      ColorProperties.setProperty('userSettingsTextColor', 'black')
    }
  }
};