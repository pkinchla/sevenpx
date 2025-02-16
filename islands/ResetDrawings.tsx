import drawings from "../signals/DrawingsState.ts";
import svgs from "../svgs.json" with { type: "json" };

export default function ResetDrawings() {
  const handleReset = () => {
    drawings.value = svgs;
    localStorage.setItem("drawings", JSON.stringify(svgs));
    globalThis.location.reload();
  };

  return (
    <button class="button" onClick={() => handleReset()}>Reset Drawings</button>
  );
}
