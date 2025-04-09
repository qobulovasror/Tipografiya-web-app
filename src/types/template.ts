export type Template = {
  id: number;
  type: string;
  elements: string;
  bg: string;
  img: string;
};

export type Category = {
  id: number;
  name: "All" | "visit-card" | "invitation" | "banner";
}