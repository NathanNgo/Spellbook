export const BACKEND_PORT = "3000";
export const DEVELOPMENT_BACKEND_BASE_URL = `http://localhost:${BACKEND_PORT}`;
export const PRODUCTION_BACKEND_BASE_URL =
    "https://wgkci5dpsz.ap-southeast-2.awsapprunner.com";

export const BACKEND_BASE_URL = import.meta.env.DEV
    ? DEVELOPMENT_BACKEND_BASE_URL
    : PRODUCTION_BACKEND_BASE_URL;

export const SPELL_SUMMARIES_ENDPOINT = new URL(
    "spellSummaries",
    BACKEND_BASE_URL
);
export const SPELLS_ENDPOINT = new URL("spells", BACKEND_BASE_URL);
