import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";


export default function CreateVisitCard() {
  const [template, setTemplate] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const templates = [
    { id: 1, name: "Simple Blue", bg: "bg-blue-500" },
    { id: 2, name: "Elegant Black", bg: "bg-black text-white" },
    { id: 3, name: "Modern Green", bg: "bg-green-500" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Visit Card Creator</h1>
      <div className="flex gap-6">
        {/* Templates List */}
        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-2">Choose a Template</h2>
          <Select onValueChange={(value) => setTemplate(value)}>
            <SelectContent>
              {templates.map((temp) => (
                <SelectItem key={temp.id} value={temp.id.toString()}>
                  {temp.name}
                </SelectItem>
              ))}

            </SelectContent>
          </Select>
          <h2 className="text-xl font-semibold mt-4">Or Create Your Own</h2>
          <Input
            placeholder="Enter custom text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
        </div>
        {/* Preview Area */}
        <div className="w-2/3 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <Card className={`w-80 h-48 flex items-center justify-center ${template ? templates.find(t => t.id === parseInt(template))?.bg : "bg-gray-200"}`}>
            <CardContent>
              <p className="text-lg font-semibold">{customText || "Your Visit Card"}</p>
            </CardContent>
          </Card>
          <Button className="mt-4">Download</Button>
        </div>
      </div>
    </div>
  );
}
