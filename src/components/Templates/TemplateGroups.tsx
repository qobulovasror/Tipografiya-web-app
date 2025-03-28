import { Template } from '@/types/template'
import SingleTemplate from './SingleTemplate'

import { templatesData } from './templatesData'

type Props = {
  mode: "All" | "visit-card" | "invitation" | "banner";
}


export default function TemplateGroups({mode}: Props) {
  // console.log(templatesData.filter);
  
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {templatesData.filter((template: Template) => template.category === mode || mode=="All").map((template: Template) => (
        <SingleTemplate key={template.id} template={template} />
      ))}
    </div>
  )
}
