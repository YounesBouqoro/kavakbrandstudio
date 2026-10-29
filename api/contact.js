const allowed = new Set(['brand','handel','showroom','messe','sonstiges']);
const clean = (v,max) => typeof v === 'string' ? v.trim().slice(0,max) : '';
module.exports = async function handler(req,res) {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Methode nicht erlaubt.'});}
 if(Number(req.headers['content-length']||0)>12000)return res.status(413).json({error:'Anfrage zu groß.'});
 const origin=req.headers.origin;
 if(origin){try{const h=new URL(origin).hostname;if(!['www.kavakbrandstudio.com','kavakbrandstudio.com','kavakbrandstudio-preview.vercel.app'].includes(h)&&!h.endsWith('.vercel.app'))return res.status(403).json({error:'Ungültige Herkunft.'});}catch{return res.status(403).json({error:'Ungültige Herkunft.'});}}
 let b=req.body||{};if(typeof b==='string'){try{b=JSON.parse(b)}catch{return res.status(400).json({error:'Ungültige Daten.'})}}
 if(clean(b.website,200))return res.status(200).json({success:true});
 const first=clean(b.vorname,80),last=clean(b.nachname,80),email=clean(b.email,180),company=clean(b.unternehmen,180),kind=clean(b.anliegen,40),message=clean(b.nachricht,5001);
 if(!first||!last||!/^\S+@\S+\.\S+$/.test(email)||!allowed.has(kind)||message.length<10||message.length>5000)return res.status(400).json({error:'Bitte Pflichtfelder korrekt ausfüllen.'});
 if(!process.env.RESEND_API_KEY)return res.status(503).json({error:'Der E-Mail-Versand wird gerade eingerichtet. Bitte kontaktieren Sie uns direkt per E-Mail.'});
 const labels={brand:'Brand / Vertriebspartnerschaft',handel:'Handel / Sortiment',showroom:'Showroom',messe:'Messe / Ordertag',sonstiges:'Sonstiges'};
 const body=['Neue Anfrage über kavakbrandstudio.com','Name: '+first+' '+last,'E-Mail: '+email,'Unternehmen: '+(company||'–'),'Anliegen: '+labels[kind],'','Nachricht:',message].join('\n');
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:'KAVAK Website <kontakt@kavakbrandstudio.com>',to:['ozan@kavakbrandstudio.com'],reply_to:email,subject:'Website-Anfrage: '+labels[kind],text:body})});
 if(!response.ok){console.error('Email provider status',response.status);return res.status(502).json({error:'Nachricht konnte nicht versendet werden. Bitte kontaktieren Sie uns direkt per E-Mail.'});}
 return res.status(200).json({success:true});}catch(e){console.error('Email network failure');return res.status(502).json({error:'Mailserver nicht erreichbar. Bitte erneut versuchen.'});}
};