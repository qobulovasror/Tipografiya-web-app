import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TemplatesTitle } from './TemplateTitle'

import TemplateGroups from "./templateGroups"


export default function Templates() {
  return (
    <section id="templates" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <TemplatesTitle
          title="Templates"
          paragraph="There are many variations of templates to use without create a new project."
          center
        />

        <div className="flex justify-center">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-1/3 grid-cols-4 gap-3 mx-auto my-2" style={{ boxShadow: "0 0 4px #555" }}>
              <TabsTrigger value="All" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md" >All</TabsTrigger>
              <TabsTrigger value="visit-card" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Visit card</TabsTrigger>
              <TabsTrigger value="invitation" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">invitation</TabsTrigger>
              <TabsTrigger value="banner" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">banner</TabsTrigger>
            </TabsList>

            <TabsContent value="All">
              <TemplateGroups mode="All" />
            </TabsContent>
            <TabsContent value="visit-card">
              <TemplateGroups mode="visit-card" />
            </TabsContent>
            <TabsContent value="invitation">
              <TemplateGroups mode="invitation" />
            </TabsContent>
            <TabsContent value="banner">
              <TemplateGroups mode="banner" />
            </TabsContent>
          </Tabs>

        </div>


      </div>
    </section>
  )
}