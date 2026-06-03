const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const LOG_API_URL =
  "http://4.224.186.213/evaluation-service/logs";

const VALID_STACKS = ["frontend", "backend"];

const VALID_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const VALID_PACKAGES = [
  // Frontend
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",

  // Backend
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",

  // Common
  "auth",
  "config",
  "middleware",
  "utils",
];

async function Log(stack, level, packageName, message) {
  try {
    if (!VALID_STACKS.includes(stack)) {
      throw new Error(`Invalid stack: ${stack}`);
    }

    if (!VALID_LEVELS.includes(level)) {
      throw new Error(`Invalid level: ${level}`);
    }

    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error(`Invalid package: ${packageName}`);
    }

    const response = await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AFFORDMED_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Logging Middleware Error:",
      error.response?.data || error.message
    );
  }
}

module.exports = {
  Log,
};