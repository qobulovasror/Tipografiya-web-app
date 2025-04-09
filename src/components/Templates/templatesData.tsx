import { Template } from "@/types/template"

export const category = ["Tashrifnoma", "Tashrifnoma", "Tabriknoma"]
export const categoryEnglish = ["visit-card", "invitation", "greeting-card"];

export const getTemplate = (): Template[] | [] => {
  const allTemplates: Template[] = [];
  fetch("/templates/visit_card.json")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      return data;
    });

  // fetch("/templates/visit_card.json")
  // .then(res => res.json())
  //     .then(data => {
  //       const selected = data.find((t: { id: number; }) => t.id === parseInt(id));
  //       if(selected !== undefined)
  //         allTemplates.push(selected);
  //     });

  return allTemplates;
}