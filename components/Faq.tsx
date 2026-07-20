const items = [
  ["Does NoFi require an account?", "No. The core diary experience is designed to work without creating a profile."],
  ["Are my memories uploaded?", "NoFi is local-first. Content remains on your device unless you deliberately export or share it."],
  ["Can I back up my diary?", "The application is designed to support export and import of pages, Boxes and diary archives."],
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
