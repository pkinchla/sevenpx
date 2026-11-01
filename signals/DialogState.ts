import { signal } from "@preact/signals";

export interface DialogConfig {
  message: string;
  dangerous: boolean;
  resolve: (result: boolean) => void;
}

export const dialogState = signal<DialogConfig | null>(null);

export function confirm(message: string, dangerous = false): Promise<boolean> {
  return new Promise((resolve) => {
    dialogState.value = { message, dangerous, resolve };
  });
}
