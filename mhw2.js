for(ristorante of info_ristoranti){
const mostraRistoranti=document.querySelector("#choice")

let contenitore=document.createElement('div');

let immagine=document.createElement('img');
immagine.src=ristorante.immagine;
contenitore.appendChild(immagine);

let nome=document.createElement('h1');
nome.dataset.idRistorante=ristorante.nome;
nome.textContent=ristorante.nome; 
contenitore.appendChild(nome);

let aggiungiPreferiti=document.createElement('img');
aggiungiPreferiti.id="aggiungi";
aggiungiPreferiti.src="aggiungi ai preferiti.jpg";
contenitore.id=(ristorante.nome);
contenitore.appendChild(aggiungiPreferiti);


let mostraD=document.createElement("a");
mostraD.textContent="mostra più dettagli";
mostraD.addEventListener("click",mostraDescrizione)
contenitore.appendChild(mostraD);

let descrizione=document.createElement("p");
descrizione.textContent=ristorante.descrizione;
descrizione.id="descrizione"
descrizione.classList.add("hidden")
contenitore.appendChild(descrizione);

let descNascosta=document.createElement("p");
descNascosta.id="nascondi"
descNascosta.textContent="mostra meno dettagli";
descNascosta.classList.add("hidden")
descNascosta.addEventListener("click",nascondiDescrizione)
contenitore.appendChild(descNascosta)

mostraRistoranti.appendChild(contenitore);
}
function mostraDescrizione(event){
event.currentTarget.classList.add("hidden")
let contenuto=document.querySelectorAll("#choice div");  
let j=0;
for(ristorante of contenuto){
if(ristorante.id===event.currentTarget.parentNode.id){
 c1=document.querySelectorAll("#choice div #descrizione")
 c2=document.querySelectorAll("#choice div #nascondi")
 c1[j].classList.remove("hidden")
 c2[j].classList.remove("hidden")
 ristorante.classList.add("chosen");
        }
j++;
    }
}


function nascondiDescrizione(event){
 event.currentTarget.classList.add("hidden")
let contenuto=document.querySelectorAll("#choice div");
let k=0;

for(ristorante of contenuto){
if(ristorante.id===event.currentTarget.parentNode.id){
 c1=document.querySelectorAll("#choice div #descrizione")
 c2=document.querySelectorAll("#choice div #nascondi")
 c1[k].classList.add("hidden")
 c2[k].classList.add("hidden")
 c3=document.querySelectorAll("#choice div a")
 c3[k].classList.remove("hidden")
 ristorante.classList.remove("chosen");
    }
 k++;
    }
}

barraRicerca=document.querySelector("#ricerca")
barraRicerca.addEventListener("keyup",ricerca_ristoranti)

function ricerca_ristoranti(event){
let contenutoPreferiti=document.querySelectorAll("#ristoranti_preferiti .ristoranti div")
let contenuto=document.querySelectorAll("#choice div h1")
let testo=event.currentTarget.value
for(ristorante of contenuto){
if(ristorante.dataset.idRistorante.search(testo)!==-1){
ristorante.parentNode.classList.remove("hidden")
for(let ristoranteP of contenutoPreferiti){
if(ristoranteP.dataset.nome===ristorante.parentNode.id){
ristorante.parentNode.classList.add("hidden")
   }
  }
    }
else{
ristorante.parentNode.classList.add("hidden")
    }
}
if(testo===""){
for(ristorante of contenuto){
ristorante.parentNode.classList.remove("hidden")
for(ristoranteP of contenutoPreferiti){
if(ristoranteP.dataset.nome===ristorante.parentNode.id){
ristorante.parentNode.classList.add("hidden")
 }
 }
}
 }
}
const ristoranti= document.querySelectorAll("#aggiungi")
for(ristorante of ristoranti){
ristorante.addEventListener("click", AggiungiAiPreferiti);
}
function AggiungiAiPreferiti(event){
let ristoranteSelezionato=event.currentTarget.parentNode;
ristoranteSelezionato.classList.add("hidden");

const p=document.querySelector("#ristoranti_preferiti");
p.classList.remove("hidden");
const t=document.querySelector("#testo1");
t.classList.remove("hidden");

const preferiti=document.querySelector("#ristoranti_preferiti .ristoranti")
   
for(ristorante of info_ristoranti){
if(ristoranteSelezionato.id===ristorante.nome)
        {
let contenitore=document.createElement('div');
           
let immagine=document.createElement('img');
immagine.src=ristorante.immagine;
contenitore.appendChild(immagine);
            
let nome=document.createElement('h1');
contenitore.dataset.nome=ristorante.nome
nome.textContent=ristorante.nome;
contenitore.appendChild(nome);

let rimuoviPreferiti=document.createElement('img');
rimuoviPreferiti.id='elimina';
rimuoviPreferiti.src='rimuovi dai preferiti.jpg'
rimuoviPreferiti.addEventListener("click",RimuoviDaiPreferiti);
contenitore.appendChild(rimuoviPreferiti);

preferiti.appendChild(contenitore);
    }
}
}
function RimuoviDaiPreferiti(event){
let ristoranteSelezionato=event.currentTarget.parentNode;
ristoranteSelezionato.remove();
let contenuto=document.querySelectorAll("#choice div");

for(ristorante of contenuto){
if(ristorante.id===ristoranteSelezionato.dataset.nome){
ristorante.classList.remove("hidden")
     }
}
let c1=document.querySelectorAll("#ristoranti_preferiti .ristoranti div")
let d=c1.length;

if(d===0){
const pre=document.querySelector("#ristoranti_preferiti");
pre.classList.add("hidden");
const ts=document.querySelector("#testo1");
ts.classList.add("hidden");
}
}


