import { signal } from "@preact/signals";

const active = signal<string | null>(null);

export default active;
