import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  if (!process.env.API_BASE || !process.env.CRON_SECRET) {
    return { statusCode: 500, body: "Missing API_BASE or CRON_SECRET" };
  }
  await fetch(`${process.env.API_BASE}/jobs/aggregate`, {
    method: "POST",
    headers: { "x-cron": process.env.CRON_SECRET }
  });
  return { statusCode: 200, body: "ok" };
};
