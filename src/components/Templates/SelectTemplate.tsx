import { useState, useEffect } from "react";

export default function TemplateSelector({ onSelectTemplate }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("/template/templates.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="border p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectTemplate(template)}
        >
          <h3 className="text-lg font-bold">{template.name}</h3>
          <div className="h-24 w-full" style={{ backgroundColor: template.background }}></div>
        </div>
      ))}
    </div>
  );
}
