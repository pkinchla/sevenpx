export interface Drawing {
  name: string;
  type: string;
  value: string;
  parent: string | null;
  attributes: { [key: string]: string };
  children: Drawing[];
  title: string;
}
