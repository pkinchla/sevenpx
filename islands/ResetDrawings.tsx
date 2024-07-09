import drawings from '../components/DrawingsSignal.tsx';
import svgs from "../svgs.json" with { type: "json" };


export default function ResetDrawings() {
  const handleReset = () => {
    drawings.value = svgs;
    localStorage.setItem("drawings", JSON.stringify(svgs));
    window.location.reload();
  }

  return <button class="button" onClick={() => handleReset()}>Reset Drawings</button>;
}
