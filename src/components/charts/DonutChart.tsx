import React from 'react';

export interface DonutSegment {
  label: string;
  count: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  title?: string;
  subtitle?: string;
  centerText?: string;
  centerSub?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  subtitle,
  centerText,
  centerSub,
}) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  // SVG calculations for donut
  let cumulativePercent = 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h4 className="text-sm font-bold text-slate-900">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-6 justify-around py-2">
        {/* Donut SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-100"
              strokeWidth="14"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Segments */}
            {data.map((item, idx) => {
              const percent = total > 0 ? (item.count / total) * 100 : 0;
              const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += percent;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={item.color}
                  strokeWidth="14"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  className="transition-all duration-700 hover:opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xl font-bold text-slate-900 leading-none">
              {centerText || total}
            </span>
            <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">
              {centerSub || 'Total'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 w-full sm:w-auto max-w-xs">
          {data.map((item, idx) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={idx} className="flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium truncate max-w-[130px]">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-normal">{item.count}</span>
                  <span className="font-semibold text-slate-900 w-8 text-right">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
