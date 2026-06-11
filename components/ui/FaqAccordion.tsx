"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {groups.map((group, gi) => (
        <div key={group.category}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#2657f2] mb-4">
            {group.category}
          </p>
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const isOpen = openKey === key;
              return (
                <div key={key} className="border-b border-gray-100 last:border-b-0">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-gray-900 text-sm leading-snug">{item.q}</span>
                    <ChevronDown
                      className="w-4 h-4 text-[#2657f2] flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
