class Session {
  // Set the session in the local storage
  public static set = (token: string, expiry: string): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiry);
  };

  // Clear the session from the local storage
  public static clear = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
  };

  // Checks if the session is valid (locally) according to the expiration time
  public static isValid = (): boolean => {
    const expiry = localStorage.getItem('expiry');
    if (expiry) {
      return +new Date(expiry) > +new Date();
    }
    return false;
  };

  // Creates the authorization header using the bearer token
  public static getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
}

export default Session;