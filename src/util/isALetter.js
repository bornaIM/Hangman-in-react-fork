// TODO: ok, promijenio si ime filea, ali ime funkcije je i dalje s velikim slovom
export default function IsALetter(char) {
    return (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90 || 97 <= char.charCodeAt(0) && char.charCodeAt(0) <= 122);
}