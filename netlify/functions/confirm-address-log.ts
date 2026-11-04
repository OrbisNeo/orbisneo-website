import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { CONFIRM_STORE, handleRead, type JsonStore } from "./_shared/confirm";

// Leesendpoint voor Vera. Zet VERIFY_READ_SECRET in Netlify (productie en
// deploy preview). Geen waarde in de repo. Aanroep:
//   GET /api/confirm-address-log
//   Authorization: Bearer <VERIFY_READ_SECRET>
// Optioneel: ?since=<ISO-8601> (inclusief). Antwoord:
//   { "confirmations": [{ "token", "confirmedAt" }], "truncated": false }

export default async (req: Request, context: Context) => {
  const confirmations = getStore({ name: CONFIRM_STORE, consistency: "strong" });
  return handleRead(req, {
    ip: context.ip,
    confirmations: confirmations as unknown as JsonStore,
  });
};

export const config: Config = {
  path: "/api/confirm-address-log",
  method: "GET",
  rateLimit: {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
