import { Template } from "@/types/template"

export const category = ["visit-card", "invitation", "banner"]

export const templatesData: Template[] = [
  { id: 1, title: "Taklifnoma 1", link: "/create-visit-card/1", category: category[0], img: "/images/template/template1.jpg" },
  { id: 2, title: "Taklifnoma 2", link: "/create-visit-card/2", category: category[0], img: "/images/template/template1.jpg" },
  { id: 3, title: "Vizitka 1", link: "/images/template/template1.jpg", category: category[1], img: "/images/template/template1.jpg" },
]
