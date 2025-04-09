import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TemplatesTitle } from './TemplateTitle'

import TemplateGroups from "./TemplateGroups"


export default function Templates() {
  return (
    <section id="templates" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <TemplatesTitle
          title="Shablonlar"
          paragraph="Uzingizga kerakli bo'lgan shablonni tanlang va uni o'zingiz uchun moslang."
          center
        />

        <div className="flex justify-center">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-1/3 grid-cols-4 gap-3 mx-auto my-2" style={{ boxShadow: "0 0 4px #555" }}>
              <TabsTrigger value="All" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md" >Barchasi</TabsTrigger>
              <TabsTrigger value="visit-card" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Tashrifnoma</TabsTrigger>
              <TabsTrigger value="invitation" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Taklifnoma</TabsTrigger>
              <TabsTrigger value="greeting-card" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Tabriknoma</TabsTrigger>
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
            <TabsContent value="greeting-card">
              <TemplateGroups mode="greeting-card" />
            </TabsContent>
          </Tabs>

        </div>


      </div>
    </section>
  )
}