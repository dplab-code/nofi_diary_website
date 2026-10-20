import { copy } from "@/lib/i18n";

const items = [
  ["Does NoFi require an account?", "No. The core diary experience is designed to work without creating a profile."],
  copy("en").faqs[1],
  copy("en").faqs[2],
  ["What are Sticker Packs, Themes and Appearances?", "Sticker Packs add decorations, Themes change pages, and Appearances change the app interface."],
  ["Are paid collections subscriptions?", "No. Optional collections are intended as individual one-time purchases."],
  ["Can I use NoFi offline?", "Yes. Core creation, editing and playback are designed to work offline."]
];

export function Faq() {
  return (
    <div className="faqList">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}<span>＋</span></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
