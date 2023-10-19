
// extract the chaos text if it exists
const useSeperateText = (text) => {
  let chaosIndex = -1;
  let oddIndex = -1;
  if (text.indexOf("Will of the council")) oddIndex = text.indexOf("Will of the council");
  if (text.indexOf("When chaos ensues")) oddIndex = text.indexOf("When chaos ensues");
  if (oddIndex !== -1) {
    chaosIndex = oddIndex;
  } else {
    chaosIndex = text.indexOf("Whenever chaos ensues");
  }
  let oracleText = "";
  let chaosText = "";
  if (chaosIndex !== -1) {
    oracleText = text.slice(0, chaosIndex);
    chaosText = text.slice(chaosIndex);
  } else {
    oracleText = text;
  }


  return { oracleText, chaosText };
}



export default useSeperateText;