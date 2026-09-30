"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

type FilterOption = {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  multiple?: boolean;
};

type SelectedFilters = Record<string, string | string[]>;

function valuesFor(selected: SelectedFilters, name: string) {
  const value = selected[name];
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function ProductFilters({
  filters,
  selected,
  activeCount,
  productCount
}: {
  filters: FilterOption[];
  selected: SelectedFilters;
  activeCount: number;
  productCount: number;
}) {
  const [open, setOpen] = useState(false);

  const resetHref = (filterName: string) => {
    const query = new URLSearchParams();

    Object.entries(selected).forEach(([name, value]) => {
      if (name === filterName) return;

      (Array.isArray(value) ? value : [value]).forEach((entry) => {
        if (entry) query.append(name, entry);
      });
    });

    const queryString = query.toString();
    return queryString ? `/products?${queryString}` : "/products";
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring relative inline-flex h-11 items-center gap-2 rounded-full border border-clay/15 bg-white px-4 text-sm font-semibold text-clay shadow-soft transition hover:border-clay/35 hover:bg-linen"
          aria-label="Open product filters"
        >
          <SlidersHorizontal size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Filters</span>
          {activeCount > 0 ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] text-white">{activeCount}</span> : null}
        </button>

        <form method="get" className="flex items-center gap-2">
          {Object.entries(selected).flatMap(([name, value]) =>
            name === "sort" ? [] : (Array.isArray(value) ? value : [value]).map((entry) => (
              <input key={`${name}-${entry}`} type="hidden" name={name} value={entry} />
            ))
          )}
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">Sort by</label>
          <select
            name="sort"
            defaultValue={typeof selected.sort === "string" ? selected.sort : "featured"}
            onChange={(event) => event.currentTarget.form?.requestSubmit()}
            className="focus-ring h-11 rounded-sm border border-clay/15 bg-white px-3 text-sm text-ink shadow-soft"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </form>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Product filters">
          <button type="button" className="absolute inset-0 bg-ink/35" onClick={() => setOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-[460px] flex-col bg-white shadow-2xl">
            <header className="flex min-h-28 items-center justify-between border-b border-clay/15 px-6 sm:px-9">
              <h2 className="text-3xl font-semibold uppercase">Filters</h2>
              <button type="button" onClick={() => setOpen(false)} className="focus-ring grid h-12 w-12 place-items-center rounded-full" aria-label="Close filters"><X size={34} strokeWidth={1.8} /></button>
            </header>

            <form method="get" className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-6 sm:px-9">
                {filters.map((filter) => {
                  const selectedValues = valuesFor(selected, filter.name);
                  return (
                    <fieldset key={filter.name} className="border-b border-clay/15 py-7">
                      <div className="mb-5 flex items-center justify-between">
                        <legend className="text-lg font-semibold">{filter.label}</legend>
                        {selectedValues.length > 0 ? <a href={resetHref(filter.name)} className="focus-ring rounded-sm text-sm font-semibold underline underline-offset-4">Reset</a> : null}
                      </div>
                      <div className="grid gap-4">
                        {filter.options.map((option) => (
                          <label key={option.value} className="flex cursor-pointer items-center gap-4 text-lg">
                            <input
                              type={filter.multiple ? "checkbox" : "radio"}
                              name={filter.name}
                              value={option.value}
                              defaultChecked={selectedValues.includes(option.value)}
                              className="h-7 w-7 border-clay/25 accent-clay"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  );
                })}
                <input type="hidden" name="sort" value={typeof selected.sort === "string" ? selected.sort : "featured"} />
              </div>

              <footer className="border-t border-clay/15 bg-white px-6 py-6 sm:px-9">
                <button type="submit" className="focus-ring min-h-14 w-full bg-ink px-5 text-base font-semibold uppercase text-white">
                  Show {productCount} {productCount === 1 ? "result" : "results"}
                </button>
                <a href="/products" className="focus-ring mx-auto mt-4 block w-fit rounded-sm text-base font-semibold uppercase underline underline-offset-4">Clear all</a>
              </footer>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
