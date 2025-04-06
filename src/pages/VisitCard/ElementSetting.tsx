import { useTheme } from "@/components/theme-provider";
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useRef, useState } from "react";
import { CardElementType } from "@/types/CardElement";
import { Button } from "@/components/ui/button";
import { IconRenderer } from "./Icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const fonts = [
  {
    value: "Arial",
    label: "Arial",
  },
  {
    value: "Roboto",
    label: "Roboto",
  },
  {
    value: "Open Sans",
    label: "Open Sans",
  },
  {
    value: "Montserrat",
    label: "Montserrat",
  },
  {
    value: "Lato",
    label: "Lato",
  },
  {
    value: "Poppins",
    label: "Poppins",
  },
  {
    value: "Playfair Display",
    label: "Playfair Display",
  },
  {
    value: "Raleway",
    label: "Raleway",
  },
]

interface ElementSettingProps {
  selectedElement: CardElementType;
  setSelectedElement: (el: CardElementType) => void;
  setElements: (els: CardElementType[]) => void;
  elements: CardElementType[];
  openEditElem: boolean;
}

export default function ElementSetting(props: ElementSettingProps) {
  const { selectedElement, setSelectedElement, setElements, elements, openEditElem } = props;
  const [openSelectFont, setOpenSelectFont] = useState(false)
  const { theme } = useTheme();


  const selectFontHandler = (font: string) => {
    setSelectedElement({
      ...selectedElement,
      fontFamily: font
    })
    setOpenSelectFont(false)
  }

  const doneHandler = () => {
    const updatedElements = elements.filter((el) => {
      if (el.id === selectedElement.id) {
        return { ...selectedElement }
      } else {
        return el
      }
    })
    setElements(updatedElements);
    console.log(updatedElements);
    
  }

  const firstFocusableRef = useRef(null);

  useEffect(() => {
    if (openEditElem && firstFocusableRef.current) {
      (firstFocusableRef.current as HTMLButtonElement).focus();
    }
  }, [openEditElem]);

  return (
    <DrawerContent className={`w-full ${theme == "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
      <DrawerHeader className="flex flex-col justify-center mx-auto ">
        <DrawerTitle>Edit element parameters</DrawerTitle>
        <DrawerDescription hidden={true}></DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="w-1/3 mx-auto">
        <div className="flex justify-between items-center">
          <Label>Text</Label>
          {
            selectedElement?.type === "icon" ?
              <IconRenderer iconName={selectedElement.content} color={theme == "dark" ? "#fff" : "#000"} size={30} className={"mt-3 mx-2"} /> :
              <Input type="text" value={selectedElement?.content} onChange={v => setSelectedElement({ ...selectedElement, content: v.target.value })} className="w-2/3" />
          }
        </div>
        <div className="flex justify-between items-center">
          <Label>Font</Label>
          <Popover open={openSelectFont} onOpenChange={setOpenSelectFont}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSelectFont}
                className="w-2/3 justify-between"
              >
                {selectedElement?.fontFamily
                  ? fonts.find((font) => font.value === selectedElement?.fontFamily)?.label
                  : "Select font..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[200px] p-0 ${theme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <Command>
                <CommandInput placeholder="Search font..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No font found.</CommandEmpty>
                  <CommandGroup>
                    {fonts.map((font) => (
                      <CommandItem
                        key={font.value}
                        value={font.value}
                        onSelect={selectFontHandler}
                      >
                        <span style={{ fontFamily: font.value }}>
                          {font.label}
                        </span>
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedElement?.fontFamily === font.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

        </div>
        <div className="flex justify-between items-center">
          <Label>Font size</Label>
          <Input ref={firstFocusableRef} type="number" className="w-2/3" value={selectedElement?.fontSize} onChange={v => setSelectedElement({ ...selectedElement, fontSize: Number(v.target.value) })} />
        </div>
        <div className="flex justify-between items-center">
          <Label>Color</Label>
          <Input type="color" className="w-2/3" value={selectedElement?.color} onChange={v => setSelectedElement({ ...selectedElement, color: v.target.value })} />
        </div>

        <div className="flex justify-between items-center">
          <Label>Style</Label>
          <Select>
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Select a font style" />
            </SelectTrigger>
            <SelectContent className={`w-2/3 ${theme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <SelectGroup defaultValue={selectedElement?.fontStyle}>
                <SelectItem value="normal" style={{ fontStyle: "normal" }}>Normal</SelectItem>
                <SelectItem value="italic" style={{ fontStyle: "italic" }}>Italic</SelectItem>
                <SelectItem value="oblique" style={{ fontStyle: "oblique" }}>Oblique</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <Label>Font Weight</Label>
          <Select>
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Select a font weight" />
            </SelectTrigger>
            <SelectContent className={`${theme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <SelectGroup defaultValue={selectedElement?.fontWeight}>
                <SelectItem value="normal" style={{ fontWeight: "normal" }}>Normal</SelectItem>
                <SelectItem value="bold" style={{ fontWeight: "bold" }}>bold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <Label>Text decoration</Label>
          <Select>
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Select a font weight" />
            </SelectTrigger>
            <SelectContent className={`${theme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <SelectGroup defaultValue={selectedElement?.textDecoration}>
                <SelectItem value="normal" style={{ textDecoration: "normal" }}>none</SelectItem>
                <SelectItem value="underline" style={{ textDecoration: "underline" }}>underline</SelectItem>
                <SelectItem value="overline" style={{ textDecoration: "overline" }}>overline</SelectItem>
                <SelectItem value="line-through" style={{ textDecoration: "line-through" }}>line-through</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DrawerClose asChild>
          <Button onClick={()=>doneHandler()} className="w-1/2 hover:cursor-pointer rounded mx-auto px-4 py-2 bg-green-700" variant={"outline"}>Save</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}
