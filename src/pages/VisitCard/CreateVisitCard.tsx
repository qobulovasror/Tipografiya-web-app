import { useEffect, useRef, useState } from "react";
import { BreadcrumbMenu } from "@/components/Header/BreadcrumbMenu";
import { ModeToggle } from "@/components/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadIcon, MixIcon, TextIcon, TransparencyGridIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { BanIcon, ImageIcon, Redo, Trash, Trash2Icon, Undo } from "lucide-react";
import { useTheme } from "@/components/theme-provider"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FabricImage } from "fabric";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { BackgroundColors, BackgroundImages } from "./Backgrounds";
import { AddImages, AddShape, AddText } from "./AddImages";
import { Icons, IconRenderer } from "./Icons";
// import { useParams } from "react-router-dom";
import { CardElementType } from "@/types/CardElement"
import ElementSetting from "./ElementSetting";

import jsPDF from "jspdf";
import domtoimage from 'dom-to-image-more';
import FileSaver from 'file-saver';


export default function CreateVisitCard() {
  // const { id } = useParams();
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false);
  const [elements, setElements] = useState<CardElementType[]>([]);
  const [cardBackground, setCardBackground] = useState("#fff")
  const addElementHandler = (type: "text" | "image" | "icon", value: string) => {
    setElements([
      ...elements,
      {
        id: crypto.randomUUID(),
        type,
        content: type === "text" ? (value as string) : type === "image" ? "/images/img_for_cardImg/img1.png" : value,
        x: 50,
        y: 50,
        color: "#000000",
        fontSize: type == "text" ? 16 : 7,
        fontFamily: "Arial",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        resizble: type === "image" ? true : false
      }
    ]);
  };

  //selected element for edit
  const [selectedElement, setSelectedElement] = useState<CardElementType>({ id: "", type: "text", content: "", x: 0, y: 0 });

  const updateElement = (id: string, newProps: { x: number; y: number; }) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, ...newProps } : el
    );
    setElements(updatedElements);
    saveHistory(updatedElements);
  };

  const selectelementHandler = (el: CardElementType) => {
    setSelectedElement({ ...el });
  }

  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);

  const saveHistory = (newState: CardElementType[]) => {
    if (historyIndex.current < history.current.length - 1) {
      history.current = history.current.slice(0, historyIndex.current + 1);
    }
    history.current.push(JSON.stringify(newState));
    historyIndex.current++;
  };

  // **Ortga qaytarish (Ctrl + Z)**
  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setElements(JSON.parse(history.current[historyIndex.current]));
    }
  };

  // **Oldinga qaytarish (Ctrl + Y)**
  const redo = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++;
      setElements(JSON.parse(history.current[historyIndex.current]));
    }
  };

  const editElementDone = () => {
    const updatedElements = elements.map((el) => {
      if (el.id === selectedElement.id) {
        return { ...selectedElement }
      } else {
        return { ...el }
      }
    })
    setElements(updatedElements);

  };

  const downloadCardAsImage = async () => {
    editor?.canvas.renderAll();
    domtoimage.toBlob(document.getElementById('visit-card-preview')).then(function (blob: string | Blob) {
      FileSaver.saveAs(blob, "my-visit-card.png");
    });
  };

  const downloadCardAsPDF = async () => {
    editor?.canvas.renderAll();

    domtoimage.toCanvas(document.getElementById('visit-card-preview')).then(function (canvas) {
      const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
      pdf.save("visit-card.pdf");
    });
  };

  const renderCard = () => {
    editor?.canvas.renderAll();
  }

  const { editor, onReady } = useFabricJSEditor();

  const AddShapeHandler = (text: "rectangle" | "circle" | "line") => {
    switch (text) {
      case "rectangle":
        editor?.addRectangle();
        break;
      case "circle":
        editor?.addCircle();
        break;
      case "line":
        editor?.addLine();
        break;
    }
  };

  const onRemoveShape = (type: "selected" | "all") => {
    const resultOfConfirm = window.confirm("Are you sure you want to delete?");
    if (!resultOfConfirm) return;
    if (type === "selected") {
      editor?.deleteSelected();
    } else {
      editor?.deleteAll();
    }
  }

  const onAddImage = async (imgUrl: string) => {
    const image = await FabricImage.fromURL(imgUrl);
    image.scaleToWidth(100);
    image.scaleToHeight(100);
    editor?.canvas.add(image);
  };

  const clearCanvas = () => {
    const resultOfConfirm = window.confirm("Are you sure you want to delete?");
    if (!resultOfConfirm) return;
    editor?.canvas.clear();
    editor?.deleteAll();
    setElements([]);
  }

  const [openEditElem, setOpenEditElem] = useState(false)

  const onRemoveElement = (id: string) => {
    const resultOfConfirm = window.confirm("Are you sure you want to delete?");
    if (!resultOfConfirm) return;
    const updatedElements = elements.filter((el) => el.id !== id);
    setElements(updatedElements);
    saveHistory(updatedElements);
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  //keydown handler
  useEffect(() => {
    const handleKeyDown = (e: { ctrlKey: unknown; key: string; preventDefault: () => void; }) => {
      // Ctrl + Y
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }//Ctrl + Z
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        const resultOfConfirm = window.confirm("Are you sure you want to delete?");
        if (!resultOfConfirm) return;
        editor?.deleteSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor]);

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
          <ResizablePanel minSize={25} maxSize={25} defaultSize={25}>
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
                    <AddText addElementHandler={addElementHandler} />
                  </TabsContent>

                  {/* icon */}
                  <TabsContent value="addicon" className="flex flex-col justify-center px-3">
                    <Icons addElementHandler={addElementHandler} />
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
                        <AddImages onAddImage={onAddImage} />
                      </CardContent>
                    </Card>
                    <Label className="mt-2">select shape</Label>
                    <Card className="my-2">
                      <CardContent className="flex flex-row flex-wrap justify-center gap-2 scroll-auto" >
                        <AddShape AddShapeHandler={AddShapeHandler} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* dowmload */}
                  <TabsContent value="export" className="flex flex-col justify-center px-3">
                    <h4 className="text-2xl text-center">Download visit card</h4>
                    <Button onClick={downloadCardAsImage} className="p-3 m-2 bg-blue-500 rounded flex"><DownloadIcon />Download card as a image</Button>
                    <Button onClick={downloadCardAsPDF} className="p-3 m-2 bg-blue-500 rounded flex"><DownloadIcon />Download card as a PDF</Button>
                    <Button onClick={renderCard} className="p-3 m-2 bg-blue-500 rounded flex"><DownloadIcon />render</Button>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle className="cursor-ew-resize bg-black" />
          {/* playground */}
          <ResizablePanel>
            <div className="w-full h-full flex justify-center items-center py-10 bg-gray-300 dark:bg-gray-500">
              <Card id="visit-card-preview" className="relative rounded-lg p-2 border border-gray-300 overflow-hidden w-full h-full" style={{ width: "577.612px", height: "324.800px", background: cardBackground.startsWith("url") ? `${cardBackground} center/cover no-repeat` : cardBackground }}>
                <FabricJSCanvas className="absolute top-0 left-0 w-[577px] h-full" onReady={onReady} />
                {elements.map((el) => (
                  <Rnd
                    key={el.id}
                    onDragStop={(_, d) => updateElement(el.id, { x: d.x, y: d.y })}
                    default={{ x: el.x, y: el.y, width: "auto", height: "auto" }}
                    bounds="parent"
                    enableResizing={el.resizble}
                    className="absolute w-[577.612px] h-[324.800px]"
                    style={{ zIndex: 2, position: "absolute" }}
                  >
                    {el.type === "text" && <span style={{ color: el.color, fontSize: el.fontSize, fontFamily: el.fontFamily, fontWeight: el.fontWeight, fontStyle: el.fontStyle, textDecoration: el.textDecoration, backgroundColor: "transparent", border: "nonde" }}>{el.content}</span>}
                    {el.type === "image" && <img src={el.content} alt="Image" className="w-12 h-12" />}
                    {el.type === "icon" && <IconRenderer iconName={el.content} color={el.color} size={el.fontSize} className="bg-transparent border-none" />}
                  </Rnd>
                ))}
              </Card>
            </div>
          </ResizablePanel>
          <ResizableHandle className="cursor-ew-resize bg-black" />
          {/* left panet shows all texts */}
          <ResizablePanel minSize={17} maxSize={17} defaultSize={17} className="flex-col" >
            <Drawer open={openEditElem} onOpenChange={setOpenEditElem}>
              <div className="flex-col h-100">
                <h4 className="text-2xl text-center">Control</h4>
                <div className="flex-col border-b">
                  <div className="flex justify-between">
                    <div className="flex">
                      <Button onClick={undo} title="Undo (Ctrl + Z)" className="p-1 m-1 bg-blue-400"><Undo /></Button>
                      <Button onClick={redo} title="Redo (Ctrl + Y)" className="p-1 m-1 bg-blue-400"><Redo /></Button>
                    </div>
                    <div className="flex">
                      <Button className="my-2 mx-1 bg-red-500" onClick={() => onRemoveShape("selected")} title="Remove selected shape or image"><BanIcon /></Button>
                      <Button className="my-2 mx-1 bg-red-500" onClick={() => onRemoveShape("all")} title="Remove all shape and image"><Trash /></Button>
                      <Button onClick={clearCanvas} className="my-2 bg-red-500" title="Clear All elements"><Trash2Icon /></Button>
                    </div>
                  </div>
                </div>
                <div className="flex-col p-2 justify-center">
                  {
                    elements.map((el, index) => (
                      <div className="flex w-full my-2" key={index}>
                        <Label>
                          {
                            el.type == "text" ? "Text" : "Icon"
                          }
                        </Label>
                        {
                          el.type === "text" ?
                            <Input type="text" className="mx-2" disabled value={el.content} /> :
                            <div className="my-2 mx-4">
                              <IconRenderer iconName={el.content} color={theme == "dark" ? "#fff" : "#000"} size={5} className={""} />
                            </div>
                        }
                        <DrawerTrigger className="hover:cursor-pointer"><Pencil2Icon className="text-sky-500" onClick={() => selectelementHandler(el)} /></DrawerTrigger>
                        <Button className="hover:cursor-pointer" onClick={() => onRemoveElement(el.id)}><Trash2Icon className="text-red-800" /></Button>
                      </div>
                    ))
                  }
                </div>

              </div>
              {/* Drawer window for open element settings */}
              <ElementSetting editElementDone={editElementDone} selectedElement={selectedElement} setSelectedElement={setSelectedElement} openEditElem={openEditElem} />
            </Drawer>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
