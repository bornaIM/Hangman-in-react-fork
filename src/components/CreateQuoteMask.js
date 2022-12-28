// TODO: popravit formating koda
// TODO: ovo je funkcija, a ne React komponenta. Dakle trebalo bi napravit dvije stvari: 
// 1.) ime funkcije treba bit napisano malim pocetnim slovom
// 2.) ovo treba bit u drugom folderu, a ne u components. Components folder je za React componente, a ovo je obicna funkcija
import IsALetter from "./IsALetter"
// TODO: tipfeler visableLetters
export default function CreateQuoteMask(quote, visableLetters){
    let mask = ""
    for (let char of quote) {
        // TODO: ja bih osobno ovo razdvojio u 2 retka, malo je lakse za citat, ali to je opcionalno :)
        if (!visableLetters.includes(char.toUpperCase()) && !visableLetters.includes(char.toLowerCase())) {
            //TODO:
            if(IsALetter(char)){
                mask += "_"
            } else if(char == " "){
                mask += "  "
            }else{
                mask += char
            }
        } else {
            mask += char
        }
      }
    return mask
}

// TODO: ova petlja se moze malo optimizirat, pazi ovo
// for (let char of quote) {
//   if (
//     IsALetter(char) &&
//     !visableLetters.includes(char.toUpperCase()) &&
//     !visableLetters.includes(char.toLowerCase())
//   ) {
//     mask += "_";
//   } else {
//     mask += char;
//   }
// }