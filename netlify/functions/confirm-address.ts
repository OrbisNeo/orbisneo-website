import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { CONFIRM_STORE, handleConfirm, type JsonStore } from "./_shared/confirm";

export default async (req: Request, context: Context) => {
  const confirmations = getStore({ name: CONFIRM_STORE, consistency: "strong" });
  return handleConfirm(req, {
    ip: context.ip,
    confirmations: confirmations as unknown as JsonStore,
  });
};

export const config: Config = {
  path: "/api/confirm-address",
  method: "POST",
  rateLimit: {
    windowLimit: 8,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
