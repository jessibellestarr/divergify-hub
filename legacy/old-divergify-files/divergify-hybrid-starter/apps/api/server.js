import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/jobs/aggregate", (req, res) => {
  if (req.headers["x-cron"] !== process.env.CRON_SECRET) return res.sendStatus(401);
  // TODO: add your aggregation logic (e.g., write to Supabase)
  res.json({ ok: true });
});

app.listen(process.env.PORT || 8080);
