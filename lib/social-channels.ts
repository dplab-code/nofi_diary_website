import type { Locale } from "@/lib/i18n";

export const socialChannelIds = ["instagram", "bluesky", "youtube", "tiktok", "reddit", "pinterest", "threads"] as const;
export type SocialChannelId = (typeof socialChannelIds)[number];
export type SocialChannel = { id: SocialChannelId; name: string; url: string | null; enabled: boolean; order: number };

// Publication settings only. Add verified official URLs, then explicitly enable.
export const socialChannels: readonly SocialChannel[] = [
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/nofi_diary", enabled: true, order: 1 },
  { id: "bluesky", name: "Bluesky", url: "https://bsky.app/profile/nofidiary.bsky.social", enabled: true, order: 2 },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/@NoFiDiary", enabled: true, order: 3 },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@nofidiary", enabled: true, order: 4 },
  { id: "reddit", name: "Reddit", url: "https://www.reddit.com/user/nofi_diary/", enabled: true, order: 5 },
  { id: "pinterest", name: "Pinterest", url: "https://it.pinterest.com/nofidiary/", enabled: true, order: 6 },
  { id: "threads", name: "Threads", url: "https://www.threads.com/@nofi_diary", enabled: true, order: 7 },
];

const hosts: Record<SocialChannelId, readonly string[]> = {
  instagram: ["instagram.com", "www.instagram.com"], bluesky: ["bsky.app"],
  youtube: ["youtube.com", "www.youtube.com"], tiktok: ["tiktok.com", "www.tiktok.com"],
  reddit: ["reddit.com", "www.reddit.com"],
  pinterest: ["pinterest.com", "www.pinterest.com", "it.pinterest.com"], threads: ["threads.com", "www.threads.com"],
};

export function isSocialProfileUrl(id: SocialChannelId, value: string | null): value is string {
  if (!value || value !== value.trim()) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash || !hosts[id].includes(url.hostname)) return false;
    const path = url.pathname;
    if (/placeholder|your[_-]|example/i.test(path)) return false;
    const patterns: Record<SocialChannelId, RegExp> = {
      instagram: /^\/(?!explore(?:\/|$)|accounts(?:\/|$)|reels?(?:\/|$)|p(?:\/|$)|stories(?:\/|$)|direct(?:\/|$))[a-zA-Z0-9._]+\/?$/,
      pinterest: /^\/(?!pin(?:\/|$)|search(?:\/|$)|ideas(?:\/|$))[a-zA-Z0-9_]+\/?$/,
      threads: /^\/@[a-zA-Z0-9._]+\/?$/,
      bluesky: /^\/profile\/[a-zA-Z0-9.:-]+\/?$/,
      youtube: /^\/(?:@[a-zA-Z0-9._-]+|channel\/[a-zA-Z0-9_-]+|c\/[a-zA-Z0-9_-]+|user\/[a-zA-Z0-9_-]+)\/?$/,
      tiktok: /^\/@[a-zA-Z0-9._]+\/?$/,
      reddit: /^\/(?:r|user|u)\/[a-zA-Z0-9_-]+\/?$/,
    };
    return patterns[id].test(path);
  } catch { return false; }
}

export function getPublishedSocialChannels(channels: readonly SocialChannel[] = socialChannels) {
  return channels.filter((channel): channel is SocialChannel & { url: string } =>
    channel.enabled && isSocialProfileUrl(channel.id, channel.url)
  ).sort((a, b) => a.order - b.order);
}

export type SocialDescriptions = Record<Locale, Record<SocialChannelId, string>>;
