import React from 'react';

interface TrendPoint {
  day: string;
  hours: number;
}

interface TrendChartProps {
  data: TrendPoint[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  title = 'Capacity Hours Delivered',
  subtitle = 'Weekly aggregate learning time across departments',
  badge = '+18.4% vs last week',
}) => {
  const maxHours = Math.max(...data.map(d => d.hours), 1);
  const minHours = 0;
  const width = 450;
  const height = 140;
  const paddingX = 25;
  const paddingY = 20;

  // Compute SVG path coordinates
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.hours - minHours) / (maxHours - minHours)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const linePath = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`
    : '';

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="w-full overflow-hidden mt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                className="fill-white stroke-blue-600 stroke-2 group-hover:r-6 transition-all"
              />
              {/* Text label above point */}
              <text
                x={pt.x}
                y={pt.y - 10}
                textAnchor="middle"
                className="text-[10px] fill-slate-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {pt.hours}h
              </text>
              {/* X Axis Label */}
              <text
                x={pt.x}
                y={height - 4}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {pt.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
