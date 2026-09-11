import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor} ring-1 ring-black/5`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
        {subtitle && (
          <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center font-semibold ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend.value}
          </span>
          <span className="text-slate-400 font-normal">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
