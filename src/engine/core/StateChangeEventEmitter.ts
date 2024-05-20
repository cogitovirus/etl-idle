type StateChangeListener = () => void;

// TODO: notify listeners has gaps, sometimes it might not notify listeners of the change
export class StateChangeEventEmitter {
  private listeners: StateChangeListener[] = [];

  subscribe(listener: StateChangeListener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: StateChangeListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}
