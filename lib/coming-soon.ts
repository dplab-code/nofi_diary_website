// Keep unreleased deployments closed unless the full site is explicitly enabled.
export const isComingSoon = process.env.COMING_SOON !== "false";
