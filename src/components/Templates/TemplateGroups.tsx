import { Template } from '@/types/template'
import SingleTemplate from './SingleTemplate'

import { templatesData } from './templatesData'
import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  mode: "All" | "visit-card" | "invitation" | "banner";
}

const ITEMS_PER_PAGE = 6;

export default function TemplateGroups({ mode }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTemplates = templatesData.filter(
    (template: Template) => template.category === mode || mode === "All"
  );

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
              <PaginationPrevious className='hover:bg-gray-700 hover:cursor-pointer'/>
            </PaginationItem>
            <span className="px-4 py-2 bg-gray-700 rounded-lg">Page {currentPage} of {totalPages}</span>
            <PaginationItem onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))} hidden={currentPage === totalPages}>
              <PaginationNext className='hover:bg-gray-700 hover:cursor-pointer' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}