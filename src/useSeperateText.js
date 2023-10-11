
// extract the chaos text if it exists
const useSeperateText = (text) => {
  let chaosIndex = -1;
  const oddIndex = text.indexOf("Will of the council");
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