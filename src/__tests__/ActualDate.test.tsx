import { getActualDate } from "../db/server/getActualDate";
import { format } from "date-fns";

global.fetch = jest.fn();

describe("get actual date from time API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return correctly formatted date and day of the week", async () => {
    const mockResponse = {
      dayOfWeek: "Monday",
      dateTime: "2024-10-07T14:00:00Z",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getActualDate();

    const expectedDateTime = format(
      new Date(mockResponse.dateTime),
      "d.MM.yyyy"
    );

    expect(result).toEqual({
      dayOfWeek: mockResponse.dayOfWeek,
      dateTime: expectedDateTime,
    });
  });

  it("should throw an error when the fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getActualDate()).rejects.toThrow(
      "Failed to fetch actual date"
    );
  });
});
