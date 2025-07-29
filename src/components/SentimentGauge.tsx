import React from 'react';

interface SentimentGaugeProps {
  sentiment: number; // 0-100 scale
  size?: number;
}

export function SentimentGauge({ sentiment, size = 120 }: SentimentGaugeProps) {
  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'hsl(var(--success))';
    if (value >= 30) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getSentimentLabel = (value: number) => {
    if (value >= 80) return 'Very Bullish';
    if (value >= 60) return 'Bullish';
    if (value >= 40) return 'Neutral';
    if (value >= 20) return 'Bearish';
    return 'Very Bearish';
  };

  const radius = (size - 20) / 2;
  const strokeWidth = 8;
  const center = size / 2;
  const circumference = Math.PI * radius;
  
  // Calculate the angle for the arrow (180 degrees for semi-circle)
  const angle = (sentiment / 100) * 180 - 90; // -90 to start from left
  const arrowLength = radius - strokeWidth;
  
  // Calculate arrow tip position
  const arrowX = center + arrowLength * Math.cos((angle * Math.PI) / 180);
  const arrowY = center + arrowLength * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg
          width={size}
          height={size / 2 + 20}
          className="transform"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
            fill="none"
            stroke={getSentimentColor(sentiment)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (sentiment / 100) * circumference}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Center dot */}
          <circle
            cx={center}
            cy={center}
            r={4}
            fill="hsl(var(--foreground))"
          />
          
          {/* Arrow */}
          <line
            x1={center}
            y1={center}
            x2={arrowX}
            y2={arrowY}
            stroke="hsl(var(--foreground))"
            strokeWidth={3}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Arrow tip */}
          <circle
            cx={arrowX}
            cy={arrowY}
            r={3}
            fill="hsl(var(--foreground))"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Scale marks */}
          {[0, 25, 50, 75, 100].map((mark) => {
            const markAngle = (mark / 100) * 180 - 90;
            const markX1 = center + (radius - strokeWidth - 5) * Math.cos((markAngle * Math.PI) / 180);
            const markY1 = center + (radius - strokeWidth - 5) * Math.sin((markAngle * Math.PI) / 180);
            const markX2 = center + (radius - strokeWidth - 15) * Math.cos((markAngle * Math.PI) / 180);
            const markY2 = center + (radius - strokeWidth - 15) * Math.sin((markAngle * Math.PI) / 180);
            
            return (
              <line
                key={mark}
                x1={markX1}
                y1={markY1}
                x2={markX2}
                y2={markY2}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
              />
            );
          })}
        </svg>
      </div>
      
      <div className="text-center space-y-1">
        <div className="text-2xl font-bold" style={{ color: getSentimentColor(sentiment) }}>
          {sentiment}%
        </div>
        <div className="text-sm text-muted-foreground">
          {getSentimentLabel(sentiment)}
        </div>
      </div>
    </div>
  );
}