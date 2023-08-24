export class TokenStorage {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  setStorage(storage: Storage) {
    this.storage = storage;
  }

  getItem(item: string) {
    return this.storage.getItem(item);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(item: string) {
    this.storage.removeItem(item);
  }

  clearItems() {
    this.storage.clear();
  }

  static _getItem(storage: Storage, item: string) {
    return storage.getItem(item);
  }

  static _setItem(storage: Storage, key: string, value: string) {
    storage.setItem(key, value);
  }
}
