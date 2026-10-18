import type { Locale } from "@/lib/i18n";
import { elsewhereCopy, socialDescriptions } from "@/lib/elsewhere-copy";
import { getPublishedSocialChannels } from "@/lib/social-channels";
import { ElsewhereThought } from "./ElsewhereThought";
import { SocialExitTracking } from "./SocialExitTracking";
import styles from "./NoFiElsewhere.module.css";

export function NoFiElsewhere({ locale, placement }: { locale: Locale; placement: "coming_soon" | "home" }) {
  const channels = getPublishedSocialChannels();
  if (!channels.length) return null;
  const copy = elsewhereCopy[locale];
  const id = `nofi-elsewhere-${placement}`;
  return <section id={id} className={styles.section} aria-labelledby={`${id}-title`} lang={locale}>
    <div className={styles.inner}>
      <header className={styles.intro}>
        <p className={styles.kicker}>NOFI / ELSEWHERE <span>{copy.subtitle}</span></p>
        <h2 id={`${id}-title`}>{copy.title[0]}<br /><em>{copy.title[1]}</em></h2>
        <p className={styles.description}>{copy.intro}</p>
        <p className={styles.invitation}>{copy.invitation}</p>
      </header>
      <ol className={styles.destinations}>
        {channels.map((channel, index) => <li key={channel.id}>
          <a href={channel.url} target="_blank" rel="noopener noreferrer" data-social-channel={channel.id}
            aria-label={`${channel.name} — ${socialDescriptions[locale][channel.id]} (${copy.external})`}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{channel.name}</h3><p>{socialDescriptions[locale][channel.id]}</p><small>{copy.external}</small></div>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </li>)}
      </ol>
      <ElsewhereThought key={locale} thoughts={copy.thoughts} label={copy.another} />
    </div>
    <SocialExitTracking sectionId={id} placement={placement} locale={locale} />
  </section>;
}
