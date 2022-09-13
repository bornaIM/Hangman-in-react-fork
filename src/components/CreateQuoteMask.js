import IsALetter from "./IsALetter"
export default function CreateQuoteMask(quote, visableLetters){
    let mask = ""
    for (let char of quote) {
        if (!visableLetters.includes(char) && !visableLetters.includes(char.toLowerCase())){
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