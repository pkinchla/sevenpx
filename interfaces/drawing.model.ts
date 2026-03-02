import { INode } from "npm:svgson";

export interface PathItem {
  name: string;
  attributes: Record<string, string>;
}

export interface Drawing extends INode {
  title: string;
  name: string;
  viewBox: string;
  paths: PathItem[];
  active?: boolean;
}
