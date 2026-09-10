# Indexing monitoring

Activation target: 2026-09-02.

First review window: 2026-09-09 through 2026-09-16. This task is intentionally time-gated: search engines need to crawl and process the new public state before results are meaningful.

For each of `/`, `/it`, `/fr`, `/es`, `/de` and every published Fragment:

1. Inspect the URL in Google Search Console and Bing Webmaster Tools.
2. Record whether it is discovered, crawled and indexed.
3. Compare the search-engine-selected canonical with the declared self-canonical.
4. Search the exact page title and a `site:nofidiary.com` query; capture the title, description and displayed language.
5. Check Coverage/Page indexing, crawl errors and submitted-sitemap status.
6. Review the first search queries only in aggregate; do not attempt to identify visitors.
7. Flag duplicate `/coming-soon` URLs, query-string variants or localized pages assigned to the wrong language.

Do not rewrite titles or descriptions merely because a search engine initially chooses a different snippet. First verify that the page was recrawled after activation and that its canonical, language and visible copy are coherent.

## Inspection log

### 2026-09-10 — Fragment 002

URL: `https://nofidiary.com/fragments/002-the-song-kept-playing`

Release state:

- Production commit: `a0bb122`
- HTTP response: `200`
- Declared canonical: `https://nofidiary.com/fragments/002-the-song-kept-playing`
- Robots directive: `index, follow`
- Sitemap: URL present after production deployment

Google Search Console:

- The first inspection, performed before the production promotion completed, reported “URL unknown to Google”.
- Its live test correctly exposed the temporary blocking cause: HTTP 404.
- After deployment, the live test completed at 16:58 CEST and reported that the URL was available to Google and could be indexed.
- The indexing request was submitted successfully; Search Console displayed “Indicizzazione richiesta”.

Bing Webmaster Tools:

- Bing Index initially reported the URL as not discovered.
- The live test completed at 17:00 CEST and reported “URL can be indexed by Bing”.
- The indexing request was submitted successfully; Bing displayed “Indexing requested.”
- Bing reported one non-blocking SEO/GEO notice: one image with a missing alternative attribute. This is the approved full-page visual canvas, which intentionally uses `alt=""` because equivalent semantic content is present in the document for accessibility and indexing.

Follow-up:

- Recheck discovery, crawl and canonical selection after 48–72 hours.
- Repeat the status review at the end of the original monitoring window on 2026-09-16.
- Do not resubmit unless the engines still show an outdated fetch or a new technical error.

Operational note: never request indexing for a candidate-only URL. Confirm the production response and sitemap entry first; both Google and Bing inspect the public deployment, not the repository branch.
