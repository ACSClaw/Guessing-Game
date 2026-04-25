import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [essais, setEssais] = useState(0);
  const [niveau, setNiveau] = useState(null);
  const [nombreMystere, setNombreMystere] = useState(null);
  const [essaisListe, setEssaisListe] = useState([]);

function retourMenu(){
  setNiveau(null);
  setNombre("");
  setEssais(0);
  setNombreMystere(null);
  setEssaisListe([]);
}

function affichageNombreDeviner() {
  if (essaisListe.length === 0) return null;
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Vos essais :</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {essaisListe.map((essai, index) => (
          <li
            key={index}
            style={{
              color: essai.estProche ? "#1a5f1a" : "#003366",
              fontWeight: "bold",
              fontSize: "20px",
              margin: "5px 0"
            }}
          >
            {essai.nombre} {essai.estProche ? "(proche)" : "(loin)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

function valider(){
  if(nombreMystere === null){
    setMessage("Aucun nombre généré, chosis d'abor un niveau");
    return;
  }
  const n = Number(nombre);
  setEssais(essais + 1);   
  const distance = Math.abs(n - nombreMystere);
  const estProche = distance <= 10;
  setEssaisListe([...essaisListe, { nombre: n, estProche }]);

  if(n > nombreMystere){
    setMessage("C'est moins");
  } else if(n < nombreMystere){
    setMessage("C'est plus");
  }else{
    setMessage("C'est exactement ce qu'on recherchait, le nombre " + nombreMystere);
  }
}

function genererNombreAleatoire(niveau){
  let max
  if(niveau === 1) max = 5000;
  else if(niveau === 2) max = 10000;
  else if(niveau === 3) max = 20000;
  else if(niveau === 4) max = 100000;
  else {setMessage("Choix invalide, réessayer");
  return;
  }

  setNombreMystere(Math.floor(Math.random()*max) +1);
  setMessage("Le nombre a été généré, devine-le ");
}

function choisirNiveau(niveauChoisi){
  setEssais(0);
  setNiveau(niveauChoisi);
  genererNombreAleatoire(niveauChoisi);
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
        onKeyDown={(e) => {
        if (e.key === "Enter") {
          valider();
        }
        }}></input> 
      <button onClick={valider}>Valider</button>
      <p>{message}</p>
      <p>Nombre d'essais : {essais}</p>
      <button onClick={retourMenu}>Retour au menu</button>
      {affichageNombreDeviner()}
    </div>
  );
}

export default App;
