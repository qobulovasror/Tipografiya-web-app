import { BreadcrumbMenu } from "@/components/Header/BreadcrumbMenu";
import { ModeToggle } from "@/components/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadIcon, MixIcon, TextIcon, TransparencyGridIcon } from "@radix-ui/react-icons"
import { ImageIcon } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "@/components/ui/input";
import { PersonIcon,  EnvelopeClosedIcon, MobileIcon, GlobeIcon } from "@radix-ui/react-icons";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export default function CreateVisitCard() {
  const [customText, setCustomText] = useState("Your Visit Card");
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const fonts = [
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Lato",
    "Poppins",
    "Playfair Display",
    "Raleway",
  ];
  return (
    <>
      {/* header */}
      <div className="header border-b">
        <div className="container mx-auto p-2">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-body-color dark:text-body-color-dark">Visit Card Creator</h1>
            <div className="justify-center mr-4 items-center mt-2">
              <BreadcrumbMenu currentPage="Create Visit Card" />
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* main workspace */}


      <div className="w-full flex" style={{ height: "calc(100vh - 100px)" }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={27} maxSize={50} defaultSize={30}>
            {/* menu */}
            <Tabs defaultValue="addtext" className="w-full">
              <div className="flex">
                <TabsList className="w-20 h-full flex-col my-2 mx-0 p-0">
                  <TabsTrigger value="addtext" className="w-full h-full p-2 flex-col data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"><TextIcon /> Text</TabsTrigger>
                  <TabsTrigger value="addicon" className="w-full h-full p-2 flex-col data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"><MixIcon /> Icon</TabsTrigger>
                  <TabsTrigger value="addbg" className="w-full h-full p-2 flex-col data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"><TransparencyGridIcon /> Background</TabsTrigger>
                  <TabsTrigger value="addimg" className="w-full h-full p-2 flex-col data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"><ImageIcon /> Image</TabsTrigger>
                  <TabsTrigger value="export" className="w-full h-full p-2 flex-col data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"><DownloadIcon /> Download</TabsTrigger>
                </TabsList>
                <div className="flex-1 p-2">
                  {/* text */}
                  <TabsContent value="addtext" className="flex flex-col justify-center px-3">
                    <h4 className="text-2xl text-center">Add new text</h4>
                    <Label>Text</Label>
                    <Input type="text" placeholder="type here" className="my-2" />
                    <Label>Color</Label>
                    <Input type="color" />
                    <Button className="my-2 bg-blue-500">Add</Button>
                  </TabsContent>

                  {/* icon */}
                  <TabsContent value="addicon" className="flex flex-col justify-center px-3">
                    <h4 className="text-2xl text-center">Add icon</h4>
                    <Label>select icon</Label>
                    <Card className="my-2">
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <PersonIcon /> <span>John Doe</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                          <BriefcaseIcon /> <span>Software Engineer</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                          <EnvelopeClosedIcon /> <span>john@example.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MobileIcon /> <span>+123 456 7890</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GlobeIcon /> <span>www.johndoe.com</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                          <PinIcon /> <span>New York, USA</span>
                        </div> */}
                      </CardContent>
                    </Card>
                    <Button className="my-2 bg-blue-500">Add</Button>
                  </TabsContent>

                </div>
              </div>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle className="cursor-ew-resize bg-black" />
          <ResizablePanel>Two</ResizablePanel>
        </ResizablePanelGroup>


      </div>
    </>
  );
}




