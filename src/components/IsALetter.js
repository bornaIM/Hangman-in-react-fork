// TODO: ovo je funkcija, a ne React komponenta. Dakle trebalo bi napravit dvije stvari: 
// 1.) ime funkcije treba bit napisano malim pocetnim slovom
// 2.) ovo treba bit u drugom folderu, a ne u components. Components folder je za React componente, a ovo je obicna funkcija
export default function IsALetter(char) {
    if ((65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90 || 97 <= char.charCodeAt(0) &&  char.charCodeAt(0) <= 122)){
        return true
    } else{
        return false
    }
}

// TODO: e pazi kako se ovo moze napisat
// export default function IsALetter(char) {
//     return (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90 || 97 <= char.charCodeAt(0) && char.charCodeAt(0) <= 122);
// }