import { counter } from "../modules/AddCommentAPI.js";

beforeEach(() => {
  fetch.resetMocks();
});

describe("counter function", () => {
  it("should return the number of comments for a specific item_id", async () => {
    const itemId = "123";
    const mockData = [      { id: 1, item_id: "123", username: "user1", comment: "comment1" },      { id: 2, item_id: "123", username: "user2", comment: "comment2" },    ];

    fetch.mockResponseOnce(JSON.stringify(mockData));

    const count = await counter(itemId);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/TePAWbpwiBHr7xSY6An3/comments?item_id=123"
    );
    expect(count).toEqual(mockData.length);
  });
});
