import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Faq } from "@/components/Faq";

const playUrl =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ??
  "https://play.google.com/store/apps/details?id=com.nofi.nofi_diary";

const collections = [
  { type: "Sticker Packs", title: "Decorate your pages", copy: "Words, tapes, doodles, symbols and tactile fragments.", kind: "stickers" },
  { type: "Themes", title: "Change the page", copy: "Paper, texture, framing and atmosphere for each memory.", kind: "themes" },
  { type: "Appearances", title: "Change the app", copy: "A different interface feeling without changing saved pages.", kind: "appearance" }
];

export default function Home() {
  return (
    <main>
      <header className="header shell">
        <Link className="brand" href="#top"><BrandMark /><span>NoFi Diary</span></Link>
        <nav>
          <Link href="#features">Features</Link>
          <Link href="#how">How it works</Link>
          <Link href="#collections">Collections</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#faq">FAQ</Link>
        </nav>
        <a className="button dark" href={playUrl}>Get the app</a>
      </header>

      <section id="top" className="hero">
        <div className="shell heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Private by design · Offline-first</p>
            <h1>Your memories.<br />Yours to keep.</h1>
            <p className="lead">
              NoFi Diary is a private creative diary for photos, voice and tactile pages.
              Create memories, seal them in Time Capsules, export them and keep them on your terms.
            </p>
            <div className="actions">
              <a className="playBadge" href={playUrl}>
                <b>▶</b><span><small>GET IT ON</small>Google Play</span>
              </a>
              <Link className="button outline" href="#how">See how it works</Link>
            </div>
            <p className="micro">No account required. No public feed.</p>
          </div>

          <div className="heroArt">
            <div className="paper">
              <span className="tape t1" /><span className="tape t2" />
              <div className="paperPhoto" />
              <span className="handNote">good<br />times</span>
              <span className="flower">✿</span>
            </div>
            <div className="phone">
              <div className="screen">
                <div className="phoneTop">9:41 <span>•••</span></div>
                <h3>A perfect morning</h3>
                <small>May 21, 2026</small>
                <div className="phonePhoto" />
                <p className="phoneNote">Sun in the air, coffee in hand, and no reason to rush.</p>
                <div className="player">▶ ┃│┃┃│┃ ───── 00:28</div>
                <div className="phoneNav">⌂　□　●　♡　⚙</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statement">
        <h2>Not everything should be posted.</h2>
        <p>Some memories deserve privacy, permanence and intention.</p>
      </section>

      <section id="features" className="section shell threeCol">
        {[
          ["◉", "Capture", "Add a photo, a voice note, a place and the feeling of the moment."],
          ["✎", "Create", "Arrange stickers, handwriting, tape, textures and themes on a tactile canvas."],
          ["▣", "Keep", "Store it locally, place it in a Box or Time Capsule, and export it whenever you choose."]
        ].map(([icon, title, copy]) => (
          <article className="feature" key={title}>
            <div className="featureIcon">{icon}</div><h3>{title}</h3><p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="section band">
        <div className="shell">
          <div className="heading"><p className="eyebrow">Your personal memory system</p><h2>A memory can become more than a page.</h2></div>
          <div className="fourCol">
            {[
              ["Page", "A single moment made of image, voice and atmosphere.", "page"],
              ["Box", "A curated collection of memories that belong together.", "box"],
              ["Time Capsule", "A memory sealed until the date you choose.", "capsule"],
              ["Diary", "A personal chronology that remains portable and yours.", "diary"]
            ].map(([title, copy, kind]) => (
              <article className="memory" key={title}>
                <div className={`memoryArt ${kind}`} /><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section shell">
        <div className="heading"><p className="eyebrow">Four simple steps</p><h2>How it works</h2></div>
        <div className="steps">
          {["Capture a moment", "Add your voice", "Make it yours", "Keep, seal or share it"].map((label, i) => (
            <article className="step" key={label}>
              <div className={`stepArt s${i + 1}`} />
              <small>{i + 1}</small><h3>{label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section capsuleSection">
        <div className="shell capsuleGrid">
          <div><p className="eyebrow">Time Capsules</p><h2>Some memories are meant for later.</h2>
            <p>Seal a page or a collection until a future date. When the moment arrives, NoFi opens it like a private gift from your past.</p>
            <a className="button outline" href="#faq">Discover Time Capsules</a>
          </div>
          <div className="envelope"><span className="seal">N</span><span className="tag">Opens on<br /><b>May 21, 2027</b></span></div>
        </div>
      </section>

      <section id="collections" className="section shell">
        <div className="heading"><p className="eyebrow">Optional creative collections</p><h2>Make NoFi feel like yours.</h2><p>Buy only the collections you love. No recurring subscription.</p></div>
        <div className="threeCol">
          {collections.map(c => (
            <article className="collection" key={c.type}>
              <div className={`collectionArt ${c.kind}`}><i /><i /><i /></div>
              <p className="eyebrow">{c.type}</p><h3>{c.title}</h3><p>{c.copy}</p><span>Explore →</span>
            </article>
          ))}
        </div>
      </section>

      <section id="privacy" className="section privacy">
        <div className="shell">
          <div className="heading"><p className="eyebrow">Privacy & ownership</p><h2>Your memories are not our product.</h2></div>
          <div className="fourCol">
            {[
              ["No account", "Start writing without creating a profile."],
              ["No public feed", "Nothing is published unless you choose to share it."],
              ["Local by default", "Your diary lives on your device."],
              ["Portable by design", "Export pages, Boxes and diaries in formats you control."]
            ].map(([title, copy], i) => <article className="privacyItem" key={title}><div>0{i + 1}</div><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="gallery" className="section shell">
        <div className="heading left"><p className="eyebrow">A few quiet moments</p><h2>Made with NoFi</h2></div>
        <div className="gallery">
          {Array.from({length: 10}).map((_, i) => <figure key={i} className={`g g${i + 1}`}><div /><figcaption>{i % 2 ? "quiet morning" : "a moment kept"}</figcaption></figure>)}
        </div>
      </section>

      <section className="section compare">
        <div className="shell compareGrid">
          <div><p className="eyebrow">A different kind of app</p><h2>Why NoFi Diary?</h2><div className="polaroid"><div /></div></div>
          <div className="table">
            <div className="row head"><b>Typical social apps</b><b>NoFi Diary</b></div>
            {[
              ["Public by default", "Private by default"], ["Account-centric", "Diary-centric"],
              ["Cloud-dependent", "Local-first"], ["Built for reactions", "Built for remembrance"],
              ["Infinite feed", "Personal chronology"], ["Content locked in platform", "Exportable memories"]
            ].map(([a,b]) => <div className="row" key={a}><span>{a}</span><span>{b}</span></div>)}
          </div>
        </div>
      </section>

      <section id="faq" className="section shell faqGrid">
        <div><p className="eyebrow">Questions</p><h2>FAQ</h2><div className="coffee">☕</div></div>
        <Faq />
      </section>

      <section className="final"><div className="shell heading"><p className="eyebrow">Start privately</p><h2>Your diary, in airplane mode.</h2><p>Create your first page without an account, a feed or a cloud dependency.</p><a className="button dark" href={playUrl}>Get NoFi Diary</a></div></section>

      <footer className="footer shell">
        <Link className="brand" href="#top"><BrandMark /><span>NoFi Diary</span></Link>
        <span>A private space for your real memories.</span>
        <nav><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@example.com">Contact</a></nav>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
