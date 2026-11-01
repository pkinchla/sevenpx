import { useEffect, useRef } from "preact/hooks";
import { dialogState } from "../signals/DialogState.ts";

export default function Dialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const config = dialogState.value;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (config) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [config]);

  function handleResponse(result: boolean) {
    dialogState.value?.resolve(result);
    dialogState.value = null;
  }

  // Escape key closes dialog and resolves false
  function handleClose() {
    if (dialogState.value) {
      dialogState.value.resolve(false);
      dialogState.value = null;
    }
  }

  return (
    <dialog ref={dialogRef} class="dialog" onClose={handleClose}>
      {config && (
        <>
          <p class="message">{config.message}</p>
          <div class="actions">
            <button
              type="button"
              class={`${config.dangerous ? "confirm-dangerous" : "confirm"}`}
              onClick={() => handleResponse(true)}
            >
              Yes
            </button>
            <button
              type="button"
              class="cancel"
              onClick={() => handleResponse(false)}
            >
              No
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
