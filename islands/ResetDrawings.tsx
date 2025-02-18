import drawings from "../signals/DrawingsState.ts";
import svgs from "../svgs.json" with { type: "json" };
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function ResetDrawings() {
  const handleReset = () => {
    drawings.value = svgs;
    localStorage.setItem("drawings", JSON.stringify(svgs));
    globalThis.location.reload();
  };

  return (
    <>
      {IS_BROWSER && (
        <button class="button mt-1" onClick={() => handleReset()}>
          Reset Drawings
        </button>
      )}
    </>
  );
}
