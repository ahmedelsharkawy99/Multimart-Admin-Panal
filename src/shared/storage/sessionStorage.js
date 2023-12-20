class SessionStorageService {
  static saveData(identifier, data) {
    sessionStorage.setItem(identifier, JSON.stringify(data));
  }

  static getStoredData(identifier) {
    const data = sessionStorage.getItem(identifier);
    return JSON.parse(data);
  }

  static clearStoredData() {
    sessionStorage.clear();
  }

  static removeStoredData(identifier) {
    sessionStorage.removeItem(identifier);
  }
}

export default SessionStorageService;
