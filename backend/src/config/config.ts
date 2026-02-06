import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("Env variable: DATABASE_URL not set, but required");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Env variable: GOOGLE_CLIENT_ID not set, but required");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Env variable: GOOGLE_CLIENT_SECRET not set, but required");
}

if (!process.env.URL) {
  throw new Error("Env variable: URL not set, but required");
}

export const env = {
  database: {
    connectionUrl: process.env.DATABASE_URL,
  },
  port: process.env.PORT || 3000,
  url: process.env.URL,
  authProvicers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  local: process.env.LOCAL === "true",
};
