export type CardElementType = {
  id: string;
  type: "text" | "image" | "icon";
  content: string;
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic" | "oblique";
  textDecoration?: "none" | "underline" | "overline" | "line-through";
  resizble?: boolean;
}