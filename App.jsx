import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [essais, setEssais] = useState(0);
  const [niveau, setNiveau] = useState(null);
  const [nombreMystere, setNombreMystere] = useState(null);

function valider(){
  setEssais(essais + 1);
  const n = Number(nombre);

  if(n > nombreMystere){
    setMessage("C'est moins");
  } else if(n < nombreMystere){
    setMessage("C'est plus");
  }else{
    setMessage("C'est exactement ce qu'on recherchait, le nombre " + nombreMystere);
  }
}

function choixNiveau(niv) {
  setNiveau(niv);
  let max
  if(niv === 1) max = 5000;
  else if(niv === 2) max = 10000;
  else if(niv === 3) max = 20000;
  else if(niv === 4) max = 100000;
  else setMessage("Choix invalide, réessayer");
  
  setNombreMystere(Math.floor(Math.random() * max) + 1)
}

function pageNiveaux(){
  return(
  <div>
    <h1>Chosissez un niveau</h1>
    <button onClick={() => choisirNiveau(1)}>Facile</button>
    <button onClick={() => choisirNiveau(2)}>Moyen</button>
    <button onClick={() => choisirNiveau(3)}>Difficile</button>
    <button onClick={() => choisirNiveau(4)}>Impossible</button>
  </div>
  );
}

if (niveau === null) return pageNiveaux();
 
  return (
    <div>
      <h1>Devine le nombre</h1>
      <input
        type="number"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={valider}>Valider</button>
      <p>{message}</p>
      <p>Nombre d'essais : {essais}</p>
    </div>
  );
}

export default App;