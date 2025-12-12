import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FunctionScores, Language } from '../types';
import { translations } from '../translations';

interface FunctionChartProps {
  scores: FunctionScores;
  language: Language;
}

const FunctionChart: React.FC<FunctionChartProps> = ({ scores, language }) => {
  const t = translations[language];
  
  const data = [
    { name: t.chart.escape, score: scores.escape, key: 'escape' },
    { name: t.chart.attention, score: scores.attention, key: 'attention' },
    { name: t.chart.tangible, score: scores.tangible, key: 'tangible' },
    { name: t.chart.sensory, score: scores.sensory, key: 'sensory' },
  ];

  // Colors for each bar
  const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa'];

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 5]} hide />
          <YAxis dataKey="name" type="category" width={90} tick={{fontSize: 12}} />
          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-500 text-center mt-2 flex justify-center gap-4">
        <span>0: {t.chart.low}</span>
        <span>5: {t.chart.high}</span>
      </div>
    </div>
  );
};

export default FunctionChart;