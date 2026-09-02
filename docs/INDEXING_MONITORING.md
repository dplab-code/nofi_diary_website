# Indexing monitoring

Activation target: 2026-09-02.

First review window: 2026-09-09 through 2026-09-16. This task is intentionally time-gated: search engines need to crawl and process the new public state before results are meaningful.

For each of `/`, `/it`, `/fr`, `/es`, `/de` and Fragment 001:

1. Inspect the URL in Google Search Console and Bing Webmaster Tools.
2. Record whether it is discovered, crawled and indexed.
3. Compare the search-engine-selected canonical with the declared self-canonical.
4. Search the exact page title and a `site:nofidiary.com` query; capture the title, description and displayed language.
5. Check Coverage/Page indexing, crawl errors and submitted-sitemap status.
6. Review the first search queries only in aggregate; do not attempt to identify visitors.
7. Flag duplicate `/coming-soon` URLs, query-string variants or localized pages assigned to the wrong language.

Do not rewrite titles or descriptions merely because a search engine initially chooses a different snippet. First verify that the page was recrawled after activation and that its canonical, language and visible copy are coherent.
