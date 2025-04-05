import { useEffect, useState } from "react";
import { BreadcrumbMenu } from "@/components/Header/BreadcrumbMenu";
import { ModeToggle } from "@/components/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadIcon, MixIcon, TextIcon, TransparencyGridIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { BoldIcon, ImageIcon, ItalicIcon, Sun, Trash2Icon, UnderlineIcon } from "lucide-react";
import {useTheme} from "@/components/theme-provider"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FabricImage, FabricText } from "fabric";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";

import { BackgroundColors, BackgroundImages } from "./Backgrounds";
import AddImages from "./AddImages";
import Icons from "./Icons";
import { useParams } from "react-router-dom";


export default function CreateVisitCard() {
  const { id } = useParams();
  const {theme} = useTheme()
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  // const fonts = [
  //   "Roboto",
  //   "Open Sans",
  //   "Montserrat",
  //   "Lato",
  //   "Poppins",
  //   "Playfair Display",
  //   "Raleway",
  // ];

  const [elements, setElements] = useState([
    { id: 1, type: "text", content: "John Doe", x: 20, y: 30 },
    { id: 2, type: "image", content: "/images/img_for_cardImg/img1.png", x: 100, y: 50 },
    { id: 3, type: "icon", content: "☎", x: 50, y: 100 }
  ]);
  const [cardBackground, setCardBackground] = useState("#fff")

  const addElement = (type) => {
    setElements([
      ...elements,
      {
        id: elements.length + 1,
        type,
        content: type === "text" ? "New Text" : type === "image" ? "/images/img_for_cardImg/img1.png" : "★",
        x: 50,
        y: 50
      }
    ]);
  };

  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = async () => {
    // editor.addCircle();
    const textF = await FabricText.fromObject({
      left: 100,
      top: 100,
      fill: "#000",
      fontFamily: selectedFont,
      fontSize: 16,
    })
    editor?.addText(textF);
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };

  const onAddImage = async () => {
    const image = await FabricImage.fromURL(
      "https://www.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png"
    );
    editor.canvas.add(image);
  };

  

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>⚠️ Please use this app on a desktop device.</div>;
  }

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
      <div className="w-full flex" style={{ height: "calc(100vh - 60px)" }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={27} maxSize={27} defaultSize={27}>
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
                    <Icons />
                  </TabsContent>

                  {/* bg */}
                  <TabsContent value="addbg" className="flex flex-col justify-center px-3">
                    <h4 className="text-2xl text-center">Change background</h4>
                    <Label className="mt-2">select color</Label>
                    <Card className="my-2">
                      <CardContent className="flex flex-row flex-wrap justify-center gap-2 scroll-auto" >
                        <BackgroundColors setCardBackground={setCardBackground} />
                      </CardContent>
                    </Card>
                    <Label className="mt-2">select imgages</Label>
                    <Card className="my-2 h-85" style={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                      <CardContent className="flex flex-row flex-wrap justify-center gap-2 scroll-auto" >
                        <BackgroundImages setCardBackground={setCardBackground} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* addimg */}
                  <TabsContent value="addimg" className="flex flex-col justify-center px-3">
                    <h4 className="text-2xl text-center">Add image</h4>
                    <Label className="mt-2">select img</Label>
                    <Card className="my-2">
                      <CardContent className="flex flex-row flex-wrap justify-center gap-2 scroll-auto" >
                        <AddImages />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle className="cursor-ew-resize bg-black" />
          {/* playground */}
          <ResizablePanel>
            <div className="w-full h-full flex justify-center items-center py-10 bg-gray-300 dark:bg-gray-500">
              <Card className="rounded-lg p-2 border border-gray-300" style={{ width: "577.612px", height: "324.800px", background: cardBackground.startsWith("url") ? `${cardBackground} center/cover no-repeat` : cardBackground }}>
                <FabricJSCanvas className="sample-canvas w-full h-full" onReady={onReady} />
                {elements.map((el) => (
                  <Rnd
                    key={el.id}
                    default={{ x: el.x, y: el.y, width: "auto", height: "auto" }}
                    bounds="parent"
                    enableResizing={false}>
                    {el.type === "text" && <span className="text-lg text-black font-bold">{el.content}</span>}
                    {el.type === "image" && <img src={el.content} alt="Image" className="w-12 h-12" />}
                    {el.type === "icon" && <span className="text-xl">{el.content}</span>}
                  </Rnd>
                ))}
              </Card>
            </div>
          </ResizablePanel>
          <ResizableHandle className="cursor-ew-resize bg-black" />
          {/* left panet shows all texts */}
          <ResizablePanel minSize={20} maxSize={22} defaultSize={22} className="flex-col" >
            <Drawer>
              <div className="flex p-2 items-center justify-center">
                <Label>T1</Label>
                <Input type="text" className="mx-2" />
                <DrawerTrigger className="hover:cursor-pointer"><Pencil2Icon className="text-sky-500" /></DrawerTrigger>
                <Button className="hover:cursor-pointer"><Trash2Icon className="text-red-800" /></Button>
              </div>

              <DrawerContent className={`w-full ${theme=="dark"? "bg-gray-800":"bg-gray-200"}`}>
                <DrawerHeader className="flex flex-col justify-center mx-auto ">
                  <DrawerTitle>Edit element parameters</DrawerTitle>
                  <DrawerDescription hidden={true}></DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="w-1/3 mx-auto">
                  <div className="flex justify-between items-center">
                    <Label>Font</Label>
                    <Input type="text" className="w-2/3" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Font size</Label>
                    <Input type="number" className="w-2/3" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Color</Label>
                    <Input type="color" className="w-2/3" />
                  </div>

                  <div className="flex justify-between items-center">
                    <Label>Style</Label>
                    <div className="flex gap-4">
                      <div className="flex">
                        <Checkbox id="bold" className="rounded-full" />
                        <BoldIcon className="text-lg" />
                        <Label htmlFor="bold" className="sr-only">Bold</Label>
                      </div>
                      <div className="flex">
                        <Checkbox id="italic" className="rounded-full" />
                        <ItalicIcon className="text-lg" />
                        <Label htmlFor="italic" className="sr-only">Italic</Label>
                      </div>
                      <div className="flex">
                        <Checkbox id="underline" className="rounded-full" />
                        <UnderlineIcon className="text-lg" />
                        <Label htmlFor="underline" className="sr-only">Underline</Label>
                      </div>
                    </div>
                  </div>

                  <DrawerClose className="hover:cursor-pointer rounded mx-auto px-4 py-2 bg-green-700">Done</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
