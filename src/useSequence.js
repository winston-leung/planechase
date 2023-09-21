import useCheckedCount from "./useCheckedCount";
import seedrandom from 'seedrandom'

// generate a randomized sequence based on value
const useSequence = (value) => {
  const length = useCheckedCount();
  const sequence = Array.from({ length: length }, (_, i) => i + 1);
  const seededRandom = seedrandom(value.toString())
  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  };
  return sequence;
}

export default useSequence;