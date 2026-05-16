import app from "./app";
import { logger } from "./lib/logger";
import { runSeedIfNeeded } from "./lib/ota/seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  // Fire and forget — seed the OTA directory from Google Places on first boot.
  // Idempotent: a `seed:done` flag in storage prevents reruns.
  void runSeedIfNeeded();
});
