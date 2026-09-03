"use client";

interface PlaygroundFilterProps {
  filters: string[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  totalCount: number;
  isReversed: boolean;
}

export default function PlaygroundFilter({
  filters,
  activeFilter,
  onSelectFilter,
  totalCount,
  isReversed,
}: PlaygroundFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-14">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onSelectFilter(f)}
          className={`px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.12em] uppercase border transition-all duration-200 ${
            activeFilter === f
              ? isReversed
                ? "bg-white text-zinc-950 border-white font-semibold"
                : "bg-zinc-900 text-white border-zinc-900 font-semibold"
              : isReversed
              ? "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              : "border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
          }`}
        >
          {f === "All" ? `all (${totalCount})` : f}
        </button>
      ))}
    </div>
  );
}
