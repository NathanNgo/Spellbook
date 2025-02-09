export const BACKEND_PORT = "3000";
export const BACKEND_BASE_URL = `http://localhost:${BACKEND_PORT}`;
export const MANIFEST_ENDPOINT = new URL("spellSummaries", BACKEND_BASE_URL);
export const SPELLS_ENDPOINT = new URL("spells", BACKEND_BASE_URL);
