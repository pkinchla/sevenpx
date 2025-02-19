import { INode } from "npm:svgson";

export interface Drawing extends INode {
  title: string;
  name: string;
  viewBox: string;
  paths: string[];
  active?: boolean;
}
