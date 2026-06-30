'use client';

import { ReactNode } from 'react';

interface AccordionSectionProps {
  title: string;
  sectionKey: string;
  openSections: Record<string, boolean>;
  setOpenSections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  children: ReactNode;
}
export default function AccordionSection({
  title,
  sectionKey,
  openSections,
  setOpenSections,
  children,
}: AccordionSectionProps) {
const isOpen = openSections[sectionKey];

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() =>
  setOpenSections((prev) => ({
    ...prev,
    [sectionKey]: !prev[sectionKey],
  }))
}
        className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition"
      >
        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

        <span className="text-2xl font-light text-gray-500">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}
    </section>
  );
}