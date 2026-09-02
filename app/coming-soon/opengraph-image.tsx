import { ImageResponse } from "next/og";

export const alt = "NoFi Diary — Keep what mattered. Coming soon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#fbf5ec 0%,#f4ece8 58%,#eee1eb 100%)", color: "#29262b", padding: "64px 72px", fontFamily: "serif" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "56%" }}>
      <div style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif", fontWeight: 700, fontSize: 27, letterSpacing: "-0.03em" }}><span style={{ display:"flex",width:32,height:32,borderRadius:8,background:"#a87691",marginRight:12 }} />NoFi Diary</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display:"flex",fontSize: 83, lineHeight: 0.94, letterSpacing: "-0.055em" }}>Keep what</div><div style={{ display:"flex",fontSize: 83, lineHeight: 0.94, letterSpacing: "-0.055em" }}>mattered.</div><div style={{ display:"flex",marginTop: 25, color: "#9c7189", fontSize: 34, fontStyle: "italic" }}>Coming soon.</div></div>
      <div style={{ fontFamily: "sans-serif", fontSize: 18, color: "#6f666b" }}>Private. Offline. Made for your memories.</div>
    </div>
    <div style={{ position: "absolute", right: 58, top: 48, width: 468, height: 526, display: "flex", flexDirection:"column", padding: 32, background: "#fffaf3", transform: "rotate(1.7deg)", boxShadow: "0 18px 40px rgba(80,60,65,.15)" }}><div style={{display:"flex",height:330,background:"linear-gradient(165deg,#e9dccb,#c8d3ca 50%,#be9a78 51%,#8b6c53)",border:"15px solid #f7efe5"}}/><div style={{display:"flex",alignItems:"center",gap:7,height:72,color:"#a87691"}}>{Array.from({length:18},(_,index)=><span key={index} style={{display:"flex",width:3,height:12+(index%5)*7,background:"#a87691"}} />)}</div><div style={{display:"flex",fontSize:24,fontStyle:"italic",color:"#5f5359"}}>You fell asleep before we reached the sea.</div></div>
    <div style={{ position: "absolute", right: 218, top: 27, width: 132, height: 36, background: "#d9c2d8", transform: "rotate(-1deg)", opacity: .9 }} />
  </div>);
}
