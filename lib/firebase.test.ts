import { db, auth, ensureAuth } from "./firebase";

describe("lib/firebase module security and initialization", () => {
  it("does not expose hardcoded fallback credentials when environment variables are unset", () => {
    // Verify that without NEXT_PUBLIC_FIREBASE_* env vars set, no hardcoded secret keys are used
    expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBeUndefined();
    expect(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL).toBeUndefined();
    expect(db).toBeNull();
    expect(auth).toBeNull();
  });

  it("handles ensureAuth safely when auth is uninitialized", async () => {
    await expect(ensureAuth()).resolves.not.toThrow();
  });
});
