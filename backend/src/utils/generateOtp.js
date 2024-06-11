export default function generateOTP() {
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
    return otp;
  }
  