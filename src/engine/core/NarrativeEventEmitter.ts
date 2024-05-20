type NarrativeEventListener = (message: string) => void;

export class NarrativeEventEmitter {
  private listeners: NarrativeEventListener[] = [];

  subscribe(listener: NarrativeEventListener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: NarrativeEventListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  notifyListeners(message: string) {
    this.listeners.forEach(listener => listener(message));
  }
}
