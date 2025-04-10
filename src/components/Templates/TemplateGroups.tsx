import { Template } from '@/types/template'
import SingleTemplate from './SingleTemplate'
import { useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useTheme } from '../theme-provider';

type Props = {
  mode: "All" | "visit-card" | "invitation" | "greeting-card";
}

const ITEMS_PER_PAGE = 6;

export default function TemplateGroups({ mode }: Props) {
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredTemplates = templates.filter((template: Template) => template.type === mode || mode === "All");

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { theme } = useTheme()

  useEffect(() => {
    fetch("/templates/visit_card.json")
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
      });
  }, []);
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((template: Template) => (
          <SingleTemplate key={template.id} template={template} />
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))} hidden={currentPage === 1}>
              <PaginationPrevious className={`${theme == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"} hover:cursor-pointer`} />
            </PaginationItem>
            <span className={`px-4 py-2 ${theme == "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}>{currentPage} / {totalPages}</span>
            <PaginationItem onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))} hidden={currentPage === totalPages || totalPages == 0}>
              <PaginationNext className={`${theme == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"} hover:cursor-pointer`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}