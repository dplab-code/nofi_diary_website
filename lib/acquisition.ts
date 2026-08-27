export const nofiAppShareCampaign = {
  source: "nofi_app",
  medium: "share",
  campaign: "memory_share",
} as const;

type CampaignLink = {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
};

/** Builds source-level campaign links. Values must describe a channel or initiative, never a person or device. */
export function buildCampaignUrl(destination: string | URL, campaign: CampaignLink) {
  const url = new URL(destination);
  url.searchParams.set("utm_source", campaign.source);
  url.searchParams.set("utm_medium", campaign.medium);
  url.searchParams.set("utm_campaign", campaign.campaign);
  if (campaign.content) url.searchParams.set("utm_content", campaign.content);
  return url.toString();
}

export function buildNofiAppShareUrl(destination = "https://nofidiary.com/") {
  return buildCampaignUrl(destination, nofiAppShareCampaign);
}
