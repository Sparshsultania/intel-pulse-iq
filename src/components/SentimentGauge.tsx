import { useMemo } from "react";

interface SentimentGaugeProps {
  sentiment: number; // Value from -100 to 100 (-100 = extremely bearish, 0 = neutral, 100 = extremely bullish)
  size?: number;
  className?: string;
}

export const SentimentGauge = ({ sentiment, size = 200, className = "" }: SentimentGaugeProps) => {
  const gaugeData = useMemo(() => {
    // Normalize sentiment to 0-180 degrees (semi-circle)
    const normalizedAngle = ((sentiment + 100) / 200) * 180;
    const pointerAngle = Math.max(0, Math.min(180, normalizedAngle));
    
    // Determine sentiment label and color
    let label = "Neutral";
    let color = "hsl(var(--muted-foreground))";
    
    if (sentiment > 60) {
      label = "Extremely Bullish";
      color = "hsl(142, 76%, 36%)"; // Strong green
    } else if (sentiment > 20) {
      label = "Bullish";
      color = "hsl(142, 71%, 45%)"; // Green
    } else if (sentiment > -20) {
      label = "Neutral";
      color = "hsl(var(--muted-foreground))";
    } else if (sentiment > -60) {
      label = "Bearish";
      color = "hsl(0, 84%, 60%)"; // Red
    } else {
      label = "Extremely Bearish";
      color = "hsl(0, 84%, 45%)"; // Strong red
    }
    
    return { pointerAngle, label, color };
  }, [sentiment]);

  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Calculate pointer position
  const pointerLength = radius - 10;
  const pointerAngleRad = (gaugeData.pointerAngle * Math.PI) / 180;
  const pointerX = centerX + pointerLength * Math.cos(Math.PI - pointerAngleRad);
  const pointerY = centerY - pointerLength * Math.sin(Math.PI - pointerAngleRad);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
        {/* Background arc segments */}
        <defs>
          <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 84%, 45%)" />
            <stop offset="100%" stopColor="hsl(0, 84%, 60%)" />
          </linearGradient>
          <linearGradient id="neutralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" />
          </linearGradient>
          <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142, 71%, 45%)" />
            <stop offset="100%" stopColor="hsl(142, 76%, 36%)" />
          </linearGradient>
        </defs>
        
        {/* Bearish section (0-72 degrees) */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX - radius * 0.3} ${centerY - radius * 0.95}`}
          fill="none"
          stroke="url(#bearishGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Neutral section (72-108 degrees) */}
        <path
          d={`M ${centerX - radius * 0.3} ${centerY - radius * 0.95} A ${radius} ${radius} 0 0 1 ${centerX + radius * 0.3} ${centerY - radius * 0.95}`}
          fill="none"
          stroke="url(#neutralGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Bullish section (108-180 degrees) */}
        <path
          d={`M ${centerX + radius * 0.3} ${centerY - radius * 0.95} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="url(#bullishGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Tick marks */}
        {[0, 45, 90, 135, 180].map((angle) => {
          const tickAngleRad = (angle * Math.PI) / 180;
          const tickX1 = centerX + (radius - 15) * Math.cos(Math.PI - tickAngleRad);
          const tickY1 = centerY - (radius - 15) * Math.sin(Math.PI - tickAngleRad);
          const tickX2 = centerX + (radius - 5) * Math.cos(Math.PI - tickAngleRad);
          const tickY2 = centerY - (radius - 5) * Math.sin(Math.PI - tickAngleRad);
          
          return (
            <line
              key={angle}
              x1={tickX1}
              y1={tickY1}
              x2={tickX2}
              y2={tickY2}
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Pointer */}
        <line
          x1={centerX}
          y1={centerY}
          x2={pointerX}
          y2={pointerY}
          stroke={gaugeData.color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill={gaugeData.color}
          stroke="hsl(var(--background))"
          strokeWidth="2"
        />
        
        {/* Labels */}
        <text
          x={centerX - radius + 10}
          y={centerY + 15}
          textAnchor="middle"
          className="text-xs fill-muted-foreground font-medium"
        >
          Bearish
        </text>
        <text
          x={centerX}
          y={centerY - radius + 15}
          textAnchor="middle"
          className="text-xs fill-muted-foreground font-medium"
        >
          Neutral
        </text>
        <text
          x={centerX + radius - 10}
          y={centerY + 15}
          textAnchor="middle"
          className="text-xs fill-muted-foreground font-medium"
        >
          Bullish
        </text>
      </svg>
      
      {/* Sentiment details */}
      <div className="text-center mt-2">
        <p className="text-lg font-semibold" style={{ color: gaugeData.color }}>
          {gaugeData.label}
        </p>
        <p className="text-sm text-muted-foreground">
          Sentiment Score: {sentiment > 0 ? '+' : ''}{sentiment}
        </p>
      </div>
    </div>
  );
};