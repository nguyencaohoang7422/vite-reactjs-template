export const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export default {
  checkEmail: (email: string) => {
    if (email && email.trim() === '') {
      return true;
    }
    const regex = /[\w+.-]+@[\w+.-]+\.[A-Za-z]{2,4}/;
    return regex.test(email);
  },
  checkCardNumber: (number: string) => {
    const regex = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
    return regex.test(number);
  },
  
  checkRequired: (value:string) => {
    return value && value.trim().length > 0;
  },
  checkPassword: (password: string) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s])\S{8,}$/;
    return password ? regex.test(password.trim()) : false;
  },
  checkNumeric: (value: string) => {
    if (value === undefined || value === '') {
      return true;
    }
    const regex = /^[+-]?(\d+\.?\d*|\.\d+)$/;
    return regex.test(value);
  },
  checkInteger: (value: string) => {
    if (value === undefined || value === '') {
      return true;
    }
    const regex = /^-?\d+$/;
    return regex.test(value);
  },
  checkPhoneNumber: (phoneNumber: string) => {
    return phoneNumber ? phoneNumberRegex.test(phoneNumber.trim()) : false;
  },
};
export async function isValidImage(imgUrl: string) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = imgUrl;
  });
}
export function isValidEmail(email:string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



