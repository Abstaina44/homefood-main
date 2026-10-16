import { Joi, validate } from "express-validation";
import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const ensureExpressValidationReady = (): void => {
  if (typeof validate !== "function") {
    throw new Error("express-validation failed to load");
  }

  Joi.string();
};

const bootstrap = async (): Promise<void> => {
  ensureExpressValidationReady();
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Backend running on port ${env.port}`);
    if (!env.openaiApiKey) {
      console.log("  AI ordering assistant disabled (set OPENAI_API_KEY to enable)");
    }
  });
};

bootstrap().catch((error: unknown) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
