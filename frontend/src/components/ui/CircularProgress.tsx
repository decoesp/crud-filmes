import { COLORS, RATING } from '@/lib/constants';

interface CircularProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CONFIG = {
  sm: {
    width: 98,
    height: 98,
    radius: 45,
    strokeWidth: 6,
    textSize: 'text-xl',
    percentSize: 'text-sm',
  },
  md: {
    width: 144,
    height: 144,
    radius: 67,
    strokeWidth: 10,
    textSize: 'text-2xl',
    percentSize: 'text-base',
  },
  lg: {
    width: 200,
    height: 200,
    radius: 90,
    strokeWidth: 12,
    textSize: 'text-4xl',
    percentSize: 'text-xl',
  },
} as const;

export function CircularProgress({ 
  percentage, 
  size = 'md',
  className = '' 
}: CircularProgressProps) {
  const config = SIZE_CONFIG[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getRingColor = (pct: number) => {
    if (pct >= RATING.excellent) return COLORS.status.success;
    if (pct >= RATING.good) return COLORS.status.warning;
    return COLORS.status.error;
  };
  
  const ringColor = getRingColor(percentage);
  const center = config.width / 2;

  return (
    <svg 
      width={config.width} 
      height={config.height} 
      viewBox={`0 0 ${config.width} ${config.height}`}
      className={`backdrop-blur-[2px] rounded-full ${className}`}
    >
      <circle 
        className="fill-none stroke-[#FFFFFF45]" 
        cx={center} 
        cy={center} 
        r={config.radius} 
        strokeWidth={`${config.strokeWidth}px`}
      />
      <circle 
        className="fill-none transition-all" 
        cx={center} 
        cy={center} 
        r={config.radius} 
        strokeLinecap="square" 
        strokeWidth={`${config.strokeWidth}px`}
        stroke={ringColor}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center'
        }}
      />
      <text 
        x="50%" 
        y="50%" 
        dy=".3em" 
        textAnchor="middle" 
        className={`${config.textSize} font-semibold`}
        fill={ringColor}
      >
        {percentage}
        <tspan 
          textAnchor="middle" 
          className={`${config.percentSize} fill-white`}
        >
          %
        </tspan>
      </text>
    </svg>
  );
}
