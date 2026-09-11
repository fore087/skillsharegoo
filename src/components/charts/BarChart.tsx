import React, { useState } from 'react';

export interface BarChartItem {
  label: string;
  value: number;
  secondaryValue?: number;
  highlight?: boolean;
}

interface BarChartProps {
  data: BarChartItem[];
  title?: string;
  subtitle?: string;
  height?: number;
  unit?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  subtitle,
  height = 200,
  unit = '%',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(...data.map(d => d.value), 100);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h4 className="text-sm font-bold text-slate-900">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      {/* Chart container */}
      <div 
        className="relative flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2" 
        style={{ height }}
      >
        {/* Background grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-slate-300 w-full" />
          <div className="border-b border-slate-300 w-full" />
          <div className="border-b border-slate-300 w-full" />
          <div className="border-b border-slate-400 w-full" />
        </div>

        {data.map((item, idx) => {
          const heightPercent = Math.min(100, Math.max(8, (item.value / maxValue) * 100));
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-7 z-20 bg-slate-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap transition-all">
                  {item.value} {unit}
                </div>
              )}

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 rounded-t-md overflow-hidden flex flex-col justify-end h-full">
                <div
                  className={`w-full transition-all duration-500 rounded-t-md ${
                    item.highlight 
                      ? 'bg-blue-600 group-hover:bg-blue-700' 
                      : 'bg-slate-700 group-hover:bg-blue-600'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* X-axis label */}
              <span className="mt-2 text-[10px] sm:text-[11px] font-medium text-slate-600 truncate max-w-[64px] text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
