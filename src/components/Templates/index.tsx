import { Template } from '@/types/template'
import SingleTemplate from './SingleTemplate'
import { TemplatesTitle } from './TemplateTitle'
import { templatesData } from './templatesData'


export default function Templates() {
  return (
    <section id="templates" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <TemplatesTitle
          title="Templates"
          paragraph="There are many variations of templates to use without create a new project."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {templatesData.map((template: Template) => (
            <SingleTemplate key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  )
}