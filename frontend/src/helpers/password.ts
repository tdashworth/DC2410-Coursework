
class Password {
  public static validate(password: string): boolean {
    return (
      Password.validateLength(password) &&
      Password.validateNumber(password) &&
      Password.validateLowerLetter(password) &&
      Password.validateUpperLetter(password) &&
      Password.validateSpecial(password)
    );
  }

  private static validateLength(password: string): boolean {
    return password.length >= 8;
  }

  private static validateNumber(password: string): boolean {
    return /[0-9]/.test(password);
  }

  private static validateLowerLetter(password: string): boolean {
    return /[a-z]/.test(password);
  }

  private static validateUpperLetter(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private static validateSpecial(password: string): boolean {
    return /\W/.test(password);
  }
}

export default Password;