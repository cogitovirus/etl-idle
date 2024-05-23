import { NarrativeManager } from "./NarrativeManager";
import { CoreState } from "./CoreState";
import { EventEmitter } from "./EventEmitter";
import NarrativeEvent from "../entities/NarrativeEvent";
import narrativeEvents from "../data/narrativeEvents";

jest.mock("../data/narrativeEvents", () => [
  {
    id: "1",
    trigger: "funds_reached",
    condition: { type: "funds", value: 1000 },
    message: "You have reached $1000! Keep going!",
    delay: 0,
  },
  {
    id: "2",
    trigger: "play_time",
    condition: { type: "time", value: 300 },
    message: "You've been playing for 5 minutes! Time flies when you're processing data!",
    delay: 0,
  },
]);

describe("NarrativeManager", () => {
  let coreState: CoreState;
  let narrativeManager: NarrativeManager;

  beforeEach(() => {
    coreState = {
      getFunds: jest.fn(),
      getPlayTime: jest.fn(),
      getInnovationCredits: jest.fn(),
      getDataWarehouseCapacity: jest.fn(),
      isFeatureUnlocked: jest.fn(),
    } as unknown as CoreState;

    narrativeManager = new NarrativeManager(coreState);
  });

  test("should load narrative events by trigger", () => {
    expect(narrativeManager["eventsByTrigger"].get("funds_reached")!.length).toBe(1);
    expect(narrativeManager["eventsByTrigger"].get("play_time")!.length).toBe(1);
  });

  test("should check conditions and push messages for 'funds_reached'", () => {
    (coreState.getFunds as jest.Mock).mockReturnValue(1000);

    narrativeManager["checkAndPushUnlockedEventsToQueue"]("funds_reached");

    expect(narrativeManager["narrativeQueue"].length).toBe(1);
    expect(narrativeManager["narrativeQueue"][0].message).toBe("You have reached $1000! Keep going!");
  });

  test("should check conditions and push messages for 'play_time'", () => {
    (coreState.getPlayTime as jest.Mock).mockReturnValue(300);

    narrativeManager["checkAndPushUnlockedEventsToQueue"]("play_time");

    expect(narrativeManager["narrativeQueue"].length).toBe(1);
    expect(narrativeManager["narrativeQueue"][0].message).toBe(
      "You've been playing for 5 minutes! Time flies when you're processing data!"
    );
  });

  test("should notify about new narratives", () => {
    const listener = jest.fn();
    narrativeManager.subscribeToNarrativeEvents(listener);

    narrativeManager["notifyAboutNewNarrative"]();

    expect(listener).toHaveBeenCalled();
  });

  test("should add and remove event listeners", () => {
    const listener = jest.fn();
    narrativeManager.subscribeToNarrativeEvents(listener);
    narrativeManager.unsubscribeFromNarrativeEvents(listener);

    narrativeManager["notifyAboutNewNarrative"]();

    expect(listener).not.toHaveBeenCalled();
  });
});
