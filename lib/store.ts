// Same package listing for alpha testers and production; Play controls eligibility.
export const officialGooglePlayUrl = "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";
export const googlePlayUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || officialGooglePlayUrl;

export function isOfficialPlayUrl(value: string) {
  try {
    const url = new URL(value);
    return url.origin === "https://play.google.com" && url.pathname === "/store/apps/details" &&
      url.searchParams.get("id") === "com.nofi.nofi_diary" && !url.username && !url.password && !url.hash;
  } catch { return false; }
}
