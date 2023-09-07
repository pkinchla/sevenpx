import { signal } from "@preact/signals";

const active = signal<number | null>(null);

export default active;
