import React from 'react';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface ChartProps {
  data: ChartData;
  type: 'bar' | 'line' | 'pie';
  title?: string;
  className?: string;
}

// This is a simplified chart component that renders a basic SVG chart
// In a real project, you might want to use a library like Chart.js or Recharts
const Chart: React.FC<ChartProps> = ({ data, type, title, className }) => {
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
  const barWidth = 40;
  const barSpacing = 20;
  const chartHeight = 200;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + barSpacing;

  const getBarPath = (x: number, value: number) => {
    const height = (value / maxValue) * chartHeight;
    const y = chartHeight - height;
    return `M${x} ${chartHeight} V${y} H${x + barWidth} V${chartHeight} Z`;
  };

  const getLinePath = (values: number[]) => {
    const points = values.map((value, index) => {
      const x = index * (barWidth + barSpacing) + barSpacing + barWidth / 2;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  };

  return (
    <div className={className}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <svg
        width="100%"
        height={chartHeight + 40}
        viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
        className="bg-white rounded-lg"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <line
            key={index}
            x1="0"
            y1={chartHeight * ratio}
            x2={chartWidth}
            y2={chartHeight * ratio}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* Chart content based on type */}
        {type === 'bar' && data.datasets.map((dataset, datasetIndex) =>
          dataset.data.map((value, index) => {
            const x = index * (barWidth + barSpacing) + barSpacing;
            return (
              <path
                key={`${datasetIndex}-${index}`}
                d={getBarPath(x, value)}
                fill={dataset.backgroundColor as string || '#3b82f6'}
                opacity="0.8"
              />
            );
          })
        )}

        {type === 'line' && data.datasets.map((dataset, index) => (
          <path
            key={index}
            d={getLinePath(dataset.data)}
            fill="none"
            stroke={dataset.borderColor as string || '#3b82f6'}
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {data.labels.map((label, index) => {
          const x = index * (barWidth + barSpacing) + barSpacing + barWidth / 2;
          return (
            <text
              key={index}
              x={x}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{
                backgroundColor: dataset.backgroundColor as string || '#3b82f6'
              }}
            />
            <span className="text-sm text-gray-600">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;