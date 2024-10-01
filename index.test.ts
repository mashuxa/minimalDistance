import minimalDistance from "./minimalDistance";

describe("minimalDistance", () => {
  it("should return 3", async () => {
    expect(minimalDistance("wordone", "wordtwo")).toEqual(3);
  });

  it("should show messages", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    minimalDistance("wordone", "wordtwo");

    expect(consoleSpy).toHaveBeenNthCalledWith(1, "wordtwo");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "wordtwe");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "wordtne");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "wordone");
  });
});
