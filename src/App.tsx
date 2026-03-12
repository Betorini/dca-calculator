import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface Stock {
  id: string;
  name: string;
  value: number;
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const addStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    const newStock = {
      id: Date.now().toString(),
      name,
      value: parseFloat(value),
    };
    setStocks([...stocks, newStock]);
    setName('');
    setValue('');
  };

  const chartData = stocks.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.name);
    if (existing) existing.value += curr.value;
    else acc.push({ name: curr.name, value: curr.value });
    return acc;
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Portfolio Tracker</h1>
      <form
        onSubmit={addStock}
        style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
      >
        <input
          placeholder="ชื่อหุ้น"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="จำนวนเงิน"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">เพิ่ม</button>
      </form>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" label>
              {chartData.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
