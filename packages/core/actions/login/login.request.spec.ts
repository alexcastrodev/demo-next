import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "../../api";
import { login } from "./login.request";

vi.mock("../../api", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("login request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the token when the request succeeds", async () => {
    vi.mocked(api.post).mockResolvedValue({ token: "abc123" });

    await expect(
      login({ email: "user@example.com", password: "secret" }),
    ).resolves.toEqual({
      token: "abc123",
    });
    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "user@example.com",
      password: "secret",
    });
  });

  it("throws the api error message when the request fails", async () => {
    const response = new Response(
      JSON.stringify({ error: "Invalid credentials" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );

    vi.mocked(api.post).mockRejectedValue(response);

    await expect(
      login({ email: "user@example.com", password: "wrong" }),
    ).rejects.toThrow("Invalid credentials");
  });
});
