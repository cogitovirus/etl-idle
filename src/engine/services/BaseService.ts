type StateChangeListener = () => void;

export class BaseService {
  private listeners: StateChangeListener[] = [];

  subscribe(listener: StateChangeListener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: StateChangeListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  protected notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}
