import { JSX } from "preact/jsx-runtime";

export interface PathProps extends JSX.SVGAttributes<SVGPathElement> {
  d: string;
  transform?: string;
  isActive?: boolean;
}

export default function Path({ d, transform, isActive, ...rest }: PathProps) {
  return (
    <path
      className="draggable"
      tabIndex={isActive ? 0 : -1}
      d={d}
      transform={transform}
      {...rest}
    />
  );
}
