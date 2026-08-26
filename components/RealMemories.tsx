"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type MemoryId = "eccoli" | "fuori" | "sancius" | "altrove";
type MemoryCopy = { title:string; note:string; atmosphere:string };

const sectionCopy: Record<Locale,{kicker:string;title:string;body:string;note:string;voice:string;details:string;atmosphere:string;play:string;pause:string}> = {
  en:{kicker:"Real memories",title:"Four moments, kept as they happened.",body:"Made in NoFi on a phone. Preserved here with their paper, marks, words and voices.",note:"Written note",voice:"Voice letter",details:"Memory details",atmosphere:"Atmosphere",play:"Play voice letter",pause:"Pause voice letter"},
  it:{kicker:"Ricordi reali",title:"Quattro momenti, custoditi com’erano.",body:"Creati in NoFi sul telefono. Conservati qui con la loro carta, i segni, le parole e le voci.",note:"Nota scritta",voice:"Lettera vocale",details:"Dettagli del ricordo",atmosphere:"Atmosfera",play:"Riproduci la lettera vocale",pause:"Metti in pausa la lettera vocale"},
  fr:{kicker:"Souvenirs réels",title:"Quatre instants, gardés tels qu’ils étaient.",body:"Créés dans NoFi sur un téléphone. Conservés ici avec leur papier, leurs marques, leurs mots et leurs voix.",note:"Note écrite",voice:"Lettre vocale",details:"Détails du souvenir",atmosphere:"Atmosphère",play:"Lire la lettre vocale",pause:"Mettre la lettre vocale en pause"},
  es:{kicker:"Recuerdos reales",title:"Cuatro momentos, guardados tal como fueron.",body:"Creados en NoFi desde un teléfono. Conservados aquí con su papel, sus marcas, sus palabras y sus voces.",note:"Nota escrita",voice:"Carta de voz",details:"Detalles del recuerdo",atmosphere:"Atmósfera",play:"Reproducir la carta de voz",pause:"Pausar la carta de voz"},
  de:{kicker:"Echte Erinnerungen",title:"Vier Momente, bewahrt, wie sie waren.",body:"Auf einem Smartphone in NoFi gestaltet. Hier mit Papier, Zeichen, Worten und Stimmen bewahrt.",note:"Geschriebene Notiz",voice:"Sprachnachricht",details:"Details der Erinnerung",atmosphere:"Atmosphäre",play:"Sprachnachricht abspielen",pause:"Sprachnachricht pausieren"}
};

const translations: Record<Locale,Record<MemoryId,MemoryCopy>> = {
  en:{
    eccoli:{title:"There they are!! 🐬🐬🐬",note:"For half an hour, nothing.\nThen one. Then another.\nAnd then we saw the calves ❤️❤️❤️.",atmosphere:"Wonder"},
    fuori:{title:"Off the beaten path",note:"We had got lost looking for the sea. Then this wall appeared and we stopped. R&B music was drifting from a nearby bar and, for some reason, it fit perfectly. For a few minutes, we were no longer in a hurry to find the road again.",atmosphere:"Joy"},
    sancius:{title:"Sancius Rex",note:"One man alone, with Silves and the Algarve at his feet.\nA thousand years later he is still here, sword in hand.\nWho knows whether that would have been enough for him.",atmosphere:"Complexity"},
    altrove:{title:"Elsewhere (Sand City)",note:"A gigantic sumo wrestler, red in the darkness.\nA deep sound came from the speakers, almost like a didgeridoo.\nFor a moment, Portugal seemed very far away.",atmosphere:"Complexity"}
  },
  it:{
    eccoli:{title:"Eccoli!! 🐬🐬🐬",note:"Per mezz’ora, niente.\nPoi uno. Poi un altro.\nE poi abbiamo visto i cuccioli ❤️❤️❤️.",atmosphere:"Meraviglia"},
    fuori:{title:"Fuori strada",note:"Ci eravamo persi cercando il mare. Poi è comparso questo muro e ci siamo fermati. Da un bar lì vicino arrivava della musica R&B che, non so perché, calzava a pennello. Per qualche minuto non avevamo più fretta di ritrovare la strada.",atmosphere:"Gioia"},
    sancius:{title:"Sancius Rex",note:"Un uomo solo, Silves e l’Algarve ai suoi piedi.\nMille anni dopo è ancora qui, con la spada in mano.\nChissà se gli sarebbe bastato.",atmosphere:"Complessità"},
    altrove:{title:"Altrove (Sand City)",note:"Un sumo gigantesco, rosso nel buio.\nDalle casse arrivava un suono profondo, quasi un didgeridoo.\nPer un attimo il Portogallo sembrava lontanissimo.",atmosphere:"Complessità"}
  },
  fr:{
    eccoli:{title:"Les voilà !! 🐬🐬🐬",note:"Pendant une demi-heure, rien.\nPuis un. Puis un autre.\nEt puis nous avons vu les petits ❤️❤️❤️.",atmosphere:"Émerveillement"},
    fuori:{title:"Hors des sentiers battus",note:"Nous nous étions perdus en cherchant la mer. Puis ce mur est apparu et nous nous sommes arrêtés. Un bar voisin diffusait du R&B qui, sans que je sache pourquoi, convenait parfaitement. Pendant quelques minutes, nous n’étions plus pressés de retrouver notre chemin.",atmosphere:"Joie"},
    sancius:{title:"Sancius Rex",note:"Un homme seul, Silves et l’Algarve à ses pieds.\nMille ans plus tard, il est toujours là, l’épée à la main.\nQui sait si cela lui aurait suffi.",atmosphere:"Complexité"},
    altrove:{title:"Ailleurs (Sand City)",note:"Un sumo gigantesque, rouge dans l’obscurité.\nDes enceintes venait un son profond, presque comme un didgeridoo.\nPendant un instant, le Portugal semblait infiniment loin.",atmosphere:"Complexité"}
  },
  es:{
    eccoli:{title:"¡Ahí están! 🐬🐬🐬",note:"Durante media hora, nada.\nLuego uno. Luego otro.\nY entonces vimos a las crías ❤️❤️❤️.",atmosphere:"Asombro"},
    fuori:{title:"Fuera del camino",note:"Nos habíamos perdido buscando el mar. Entonces apareció este muro y nos detuvimos. De un bar cercano llegaba música R&B que, no sé por qué, encajaba a la perfección. Durante unos minutos dejamos de tener prisa por encontrar de nuevo el camino.",atmosphere:"Alegría"},
    sancius:{title:"Sancius Rex",note:"Un hombre solo, con Silves y el Algarve a sus pies.\nMil años después sigue aquí, espada en mano.\nQuién sabe si le habría bastado.",atmosphere:"Complejidad"},
    altrove:{title:"En otra parte (Sand City)",note:"Un sumo gigantesco, rojo en la oscuridad.\nDe los altavoces llegaba un sonido profundo, casi como un didyeridú.\nPor un instante, Portugal parecía estar lejísimos.",atmosphere:"Complejidad"}
  },
  de:{
    eccoli:{title:"Da sind sie!! 🐬🐬🐬",note:"Eine halbe Stunde lang nichts.\nDann einer. Dann noch einer.\nUnd dann sahen wir die Jungen ❤️❤️❤️.",atmosphere:"Staunen"},
    fuori:{title:"Abseits des Weges",note:"Wir hatten uns auf der Suche nach dem Meer verirrt. Dann tauchte diese Mauer auf und wir blieben stehen. Aus einer Bar in der Nähe kam R&B-Musik, die aus irgendeinem Grund perfekt passte. Für ein paar Minuten hatten wir es nicht mehr eilig, den Weg wiederzufinden.",atmosphere:"Freude"},
    sancius:{title:"Sancius Rex",note:"Ein Mann allein, Silves und die Algarve zu seinen Füßen.\nTausend Jahre später steht er noch immer hier, das Schwert in der Hand.\nWer weiß, ob ihm das genügt hätte.",atmosphere:"Komplexität"},
    altrove:{title:"Anderswo (Sand City)",note:"Ein riesiger Sumoringer, rot in der Dunkelheit.\nAus den Lautsprechern drang ein tiefer Klang, fast wie ein Didgeridoo.\nFür einen Moment schien Portugal unendlich weit entfernt.",atmosphere:"Komplexität"}
  }
};

const memories: Array<{id:MemoryId;image:string;screen:string;audio?:string;duration:number;date:string}> = [
  {id:"eccoli",image:"/memories/images/eccoli-render.png",screen:"/memories/screens/eccoli-full.jpeg",audio:"/memories/audio/eccoli.m4a",duration:14,date:"2026-08-18T17:46:54+02:00"},
  {id:"fuori",image:"/memories/images/fuori-strada-render.png",screen:"/memories/screens/fuori-strada-full.jpeg",audio:"/memories/audio/fuori-strada.m4a",duration:23,date:"2026-08-17T12:56:40+02:00"},
  {id:"sancius",image:"/memories/images/sancius-rex-render.png",screen:"/memories/screens/sancius-rex-full.jpeg",duration:0,date:"2026-08-20T14:16:06+02:00"},
  {id:"altrove",image:"/memories/images/altrove-render.png",screen:"/memories/screens/altrove-full.jpeg",audio:"/memories/audio/altrove.m4a",duration:26,date:"2026-08-17T21:57:47+02:00"}
];

function formatTime(value:number){const seconds=Math.max(0,Math.floor(value));return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`;}

function VoicePlayer({src,duration,labels}:{src:string;duration:number;labels:{play:string;pause:string}}){
  const audio=useRef<HTMLAudioElement>(null); const [playing,setPlaying]=useState(false); const [position,setPosition]=useState(0);
  useEffect(()=>{const current=audio.current;return()=>{current?.pause();};},[]);
  const toggle=async()=>{if(!audio.current)return;if(audio.current.paused)await audio.current.play();else audio.current.pause();};
  return <div className="realVoicePlayer"><audio ref={audio} src={src} preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>{setPlaying(false);setPosition(0);}} onTimeUpdate={event=>setPosition(event.currentTarget.currentTime)}/><button type="button" onClick={toggle} aria-label={playing?labels.pause:labels.play}>{playing?"Ⅱ":"▶"}</button><div><input aria-label={labels.play} type="range" min="0" max={duration} step="0.1" value={Math.min(position,duration)} onChange={event=>{const value=Number(event.target.value);if(audio.current){audio.current.currentTime=value;setPosition(value);}}}/><span><b>{formatTime(position)}</b><b>{formatTime(duration)}</b></span></div></div>;
}

function NativeMemoryScreen({screen,audio,labels}:{screen:string;audio?:string;labels:{play:string;pause:string}}){
  const player=useRef<HTMLAudioElement>(null); const [playing,setPlaying]=useState(false);
  const toggle=async()=>{if(!player.current)return;if(player.current.paused)await player.current.play();else player.current.pause();};
  return <div className={`realMemoryScreenshot${audio?" hasAudio":""}`}><img src={screen} alt="" />{audio&&<><audio ref={player} src={audio} preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)}/><button type="button" className={playing?"isPlaying":""} onClick={toggle} aria-label={playing?labels.pause:labels.play}/></>}</div>;
}

export function RealMemories({locale}:{locale:Locale}){
  const section=sectionCopy[locale]; const localized=translations[locale];
  return <section className="section realMemories" aria-labelledby="real-memories-title"><div className="shell"><header className="realMemoriesIntro"><p className="kicker">{section.kicker}</p><h2 id="real-memories-title">{section.title}</h2><p>{section.body}</p></header><div className="realMemoryGrid">{memories.map((memory,index)=>{const item=localized[memory.id];return <article className={`realMemory realMemoryNative realMemory${index}`} key={memory.id} aria-label={item.title}><NativeMemoryScreen screen={memory.screen} audio={memory.audio} labels={section}/>{locale!=="it"&&<details className="realMemoryTranslation"><summary>{section.note}</summary><h3>{item.title}</h3>{item.note.split("\n").map(line=><p key={line}>{line}</p>)}<footer><span>{section.atmosphere}</span><b>{item.atmosphere}</b></footer></details>}</article>;})}</div></div></section>;
}
