export default function phoneNumberMask(phoneNumber) {
  phoneNumber = phoneNumber.replace(/\D/g, ""); //Убираем все символы не являющиеся цифрами
  let formattedPhoneNumber = "";

  if (phoneNumber.length === 0) {
    return "";
  } else {
    if (["7", "8", "9"].indexOf(phoneNumber[0]) > -1) {
      formattedPhoneNumber = "+7";
      if (phoneNumber[0] === "9") {
        formattedPhoneNumber += " (" + phoneNumber;
      }
      if (phoneNumber.length > 1) {
        formattedPhoneNumber += " (" + phoneNumber.substring(1, 4);
      }

      if (phoneNumber.length >= 5) {
        formattedPhoneNumber += ") " + phoneNumber.substring(4, 7);
      }

      if (phoneNumber.length >= 8) {
        formattedPhoneNumber += "-" + phoneNumber.substring(7, 9);
      }

      if (phoneNumber.length >= 10) {
        formattedPhoneNumber += "-" + phoneNumber.substring(9, 11);
      }
      return formattedPhoneNumber;
    } else {
      formattedPhoneNumber = "+" + phoneNumber[0];
      if (phoneNumber.length > 1) {
        formattedPhoneNumber += " (" + phoneNumber.substring(1, 4);
      }

      if (phoneNumber.length >= 5) {
        formattedPhoneNumber += ") " + phoneNumber.substring(4, 7);
      }

      if (phoneNumber.length >= 8) {
        formattedPhoneNumber += "-" + phoneNumber.substring(7, 9);
      }

      if (phoneNumber.length >= 10) {
        formattedPhoneNumber += "-" + phoneNumber.substring(9, 11);
      }
      return formattedPhoneNumber;
    }
  }
}
