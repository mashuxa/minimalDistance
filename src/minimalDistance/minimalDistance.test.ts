import minimalDistance from "./minimalDistance";
import { BLUE, GREEN, PURPLE, YELLOW } from "../colors";

describe("minimalDistance", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("should convert first word to second with correct operations:", () => {
    it("delete 2 characters", async () => {
      expect(minimalDistance("123", "1")).toEqual(2);

      expect(consoleSpy).toHaveBeenNthCalledWith(2, PURPLE, "delete", "12");
      expect(consoleSpy).toHaveBeenNthCalledWith(3, PURPLE, "delete", "1");
    });

    it("insert 2 characters", async () => {
      expect(minimalDistance("1", "123")).toEqual(2);

      expect(consoleSpy).toHaveBeenNthCalledWith(2, BLUE, "insert", "13");
      expect(consoleSpy).toHaveBeenNthCalledWith(3, BLUE, "insert", "123");
    });

    it("replace 2 characters", async () => {
      expect(minimalDistance("123", "321")).toEqual(2);

      expect(consoleSpy).toHaveBeenNthCalledWith(2, GREEN, "replace", "121");
      expect(consoleSpy).toHaveBeenNthCalledWith(3, GREEN, "replace", "321");
    });
  });

  it("should return minimum number of operations", async () => {
    expect(minimalDistance("123456789", "")).toEqual(9);
    expect(minimalDistance("", "123456789")).toEqual(9);
    expect(minimalDistance("1234", "1")).toEqual(3);
    expect(minimalDistance("123", "1")).toEqual(2);
    expect(minimalDistance("12", "1")).toEqual(1);
    expect(minimalDistance("1", "2")).toEqual(1);
    expect(minimalDistance("1", "1")).toEqual(0);
  });

  it("should show messages with correct color, operation, result", async () => {
    minimalDistance("wordone", "wordtwo");

    expect(consoleSpy).toHaveBeenNthCalledWith(1, YELLOW, "convertibleWord", "wordone");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, GREEN, "replace", "wordono");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, GREEN, "replace", "wordowo");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, GREEN, "replace", "wordtwo");
  });
});
