const risultati=6;
// endpoint,id e chiave per api con richiesta apiKey
const endpoint='https://api.edamam.com/search';
const id_cibi='470f72fa';
const key_cibi='a9ff60eb8630b280551728ad12a8e870';

const form=document.querySelector('form');
form.addEventListener('submit',cerca);




function cerca(event){
event.preventDefault();
const tipo_input=document.querySelector('#tipo').value;
if(!tipo_input){
alert("Inserisci qualcosa nella barra di ricerca")
}
else{
const tipo_value=encodeURIComponent(tipo_input);
console.log('eseguo la ricerca:' + tipo_value);

const scelta=document.querySelector('#scelta').value;

if(scelta=='birre'){
rest_url='https://api.punkapi.com/v2/beers?beer_name=' + tipo_value + '&per_page=' + risultati;
console.log('Url:' + rest_url);
fetch(rest_url).then(onResponse).then(onJSONbirre);
}
 
if(scelta=='cibi'){
const richiesta= endpoint + '?q=' + tipo_value + '&app_id=' + id_cibi + '&app_key=' + key_cibi;
console.log('Url:'+ richiesta);
fetch(richiesta).then(onResponse).then(onJSONCibi);
}
}
}
function onResponse(response){
    return response.json();
}
// Vale per l'api senza autenticazione
function onJSONbirre(json){
    console.log('json ricevuto');
    console.log(json);
    
    const beer=document.querySelector('#lista');
    beer.innerHTML="";
    
    for(let i=0;i<json.length;i++){
    const doc=json[i];
    const img=doc.image_url;
    const title=doc.name;
    const tipo_malto=doc.ingredients.malt;
    const tipo_luppolo=doc.ingredients.hops;
    
    const birra=document.createElement('div');
    birra.classList.add('birra');
    
    const immagine=document.createElement('img');
    immagine.src=img;
    immagine.classList.add('immagine');
    immagine.addEventListener('click',apriModale);
    birra.appendChild(immagine);
    
    const intestazione=document.createElement('h4');
    intestazione.classList.add('testo1');
    intestazione.textContent=title;
    birra.appendChild(intestazione);  
    
    const tipo_di_malto=document.createElement('p');
    tipo_di_malto.textContent='Tipi di malto per la preparazione:';
    tipo_di_malto.classList.add('ingredienti');
    birra.appendChild(tipo_di_malto);

    for(malto of tipo_malto){
        const ingrediente1=malto.name;
        const ingrediente2=malto.amount.value;
        const ingrediente3=malto.amount.unit;
        
        const i1=document.createElement('p');
        i1.textContent=ingrediente1 + '(' +ingrediente2 + ingrediente3 + ')';
        i1.classList.add('paragrafo');
        birra.appendChild(i1);
        }

    const tipo_di_luppolo=document.createElement('p');
    tipo_di_luppolo.textContent='Tipi di luppolo per la preparazione:';
    tipo_di_luppolo.classList.add('ingredienti');
    birra.appendChild(tipo_di_luppolo);

        for(luppolo of tipo_luppolo){
            const ingrediente4=luppolo.name;
            const ingrediente5=luppolo.amount.value;
            const ingrediente6=luppolo.amount.unit;
            
            const i4=document.createElement('p');
            i4.textContent=ingrediente4 + '(' +ingrediente5 + ingrediente6 + ')';
            i4.classList.add('paragrafo');
            birra.appendChild(i4);
            }
     
    
    beer.appendChild(birra);
    
    }
    let d=json.length;
    if(d==0){
    const errore=document.createElement('h2');
    errore.textContent=('Non ci sono risultati per questa ricerca');
    errore.classList.add('errore');
    beer.appendChild(errore);
    }
    
}



// Vale per l'api con autenticazione mediante apiKey
function onJSONCibi(json){
console.log('json ricevuto');
console.log(json);

const food=document.querySelector('#lista');
food.innerHTML="";

let conteggio=json.count;
if(conteggio>9)conteggio=9;

for(let c=0;c<conteggio;c++){
const documento=json.hits[c].recipe;
const img1=documento.image;
const nome=documento.label;
const lista=documento.ingredientLines;

const cibo=document.createElement('div');
cibo.classList.add('birra');

const immagine1=document.createElement('img');
immagine1.src=img1;
immagine1.classList.add('immagine1');
immagine1.addEventListener('click',apriModale);
cibo.appendChild(immagine1);

const intestazione1=document.createElement('h5');
intestazione1.textContent=nome;
intestazione1.classList.add('intestazione');
cibo.appendChild(intestazione1);

const ingredienti=document.createElement('p');
ingredienti.textContent='ingredienti:';
ingredienti.classList.add('ingredienti');
cibo.appendChild(ingredienti);

for(let i=0;i<lista.length;i++){
const elenco=document.createElement('p');
elenco.textContent=lista[i];
elenco.classList.add('elenco');
cibo.appendChild(elenco)
}

food.appendChild(cibo);
}
if(conteggio==0){
    const errore1=document.createElement('h2');
    errore1.textContent=('Non ci sono risultati per questa ricerca');
    errore1.classList.add('errore');
    food.appendChild(errore1);
}

}
//implementazione modale
function apriModale(event){
 const image=document.createElement('img');
 image.src=event.currentTarget.src;
 const modale=document.querySelector('#modale');
 modale.appendChild(image);
 modale.classList.remove('hidden');
 document.body.classList.add('no-scroll');
}
const mod=document.querySelector('#modale');
mod.addEventListener('click',chiudiModale);

function chiudiModale(event){
document.body.classList.remove('no-scroll');
mod.classList.add('hidden');
mod.innerHTML="";
 }
    





