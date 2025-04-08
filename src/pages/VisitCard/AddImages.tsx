import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleIcon } from "@radix-ui/react-icons"
import { LucideScanLine, RectangleHorizontal } from "lucide-react"
import { useState } from "react"

export function AddImages({ onAddImage }: { onAddImage: (url: string) => void }) {
  return (
    <>
      <div className="grid grid-cols-5">
        {Array(10).fill(1).map((_, index) => (
          <img
            key={index}
            onClick={() => onAddImage(`/images/img_for_cardImg/img${index + 1}.png`)}
            src={`/images/img_for_cardImg/img${index + 1}.png`}
            className="w-full h-10 object-cover rounded-lg shadow-md m-1 px-1"
          />
        ))}
      </div>
    </>
  )
}

export function AddShape({ AddShapeHandler }: { AddShapeHandler: (text: "rectangle" | "circle" | "line") => void }) {
  return (
    <>
      <div className="flex-col">
        <Button onClick={() => AddShapeHandler("rectangle")} className="p-3 m-2 bg-blue-500 rounded flex"><CircleIcon />Add Rectangle</Button>
        <Button onClick={() => AddShapeHandler("circle")} className="p-3 m-2 bg-blue-500 rounded flex"><RectangleHorizontal />Add Circle</Button>
        <Button onClick={() => AddShapeHandler("line")} className="p-3 m-2 bg-blue-500 rounded flex"><LucideScanLine />Add Line</Button>
      </div>
    </>
  )
}


export function AddText({ addElementHandler }: { addElementHandler: (text: "text" | "image" | "icon", value: string) => void }) {
  const [input, setInput] = useState("");
  const addHandler = () => {
    if (!input) return;
    addElementHandler("text", input);
    setInput("");
  }
  return (
    <>
      <Label>Text</Label>
      <Input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="type here" className="my-2" />
      <Button className="my-2 bg-blue-500" onClick={addHandler}>Add</Button>
    </>
  )
}