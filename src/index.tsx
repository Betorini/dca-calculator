import { useState, useEffect } from 'react'

interface Stock { name: string; shares: number; totalCost: number }
interface Portfolio { id: string; name: string; stocks: Stock[] }

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem('myPortfolios')
    return saved ? JSON.parse(saved) : [{ id: '1', name: 'พอร์ตหลัก', stocks: [] }]
  })
  const [activeId, setActiveId] = useState(portfolios[0].id)
  const [stockName, setStockName] = useState('')
  const [shares, setShares] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => { localStorage.setItem('myPortfolios', JSON.stringify(portfolios)) }, [portfolios])

  const addStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stockName || !shares || !price) return
    const newShares = parseFloat(shares); const newCost = newShares * parseFloat(price)
    setPortfolios(prev => prev.map(p => p.id === activeId ? {
      ...p, stocks: p.stocks.find(s => s.name === stockName) 
        ? p.stocks.map(s => s.name === stockName ? {...s, shares: s.shares + newShares, totalCost: s.totalCost + newCost} : s)
        : [...p.stocks, { name: stockName, shares: newShares, totalCost: newCost }]
    } : p))
    setStockName(''); setShares(''); setPrice('')
  }

  const activePort = portfolios.find(p => p.id === activeId)

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', fontFamily: "'Kanit', sans-serif", background: '#f0f2f5', borderRadius: '20px', minHeight: '90vh' }}>
      <h2 style={{ textAlign: 'center', color: '#1a202c' }}>💼 Portfolio Tracker</h2>
      
      <select onChange={(e) => setActiveId(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {portfolios.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      
      <form onSubmit={addStock} style={{ display: 'grid', gap: '10px', background: '#fff', padding: '20px', borderRadius: '15px' }}>
        <input placeholder="ชื่อหุ้น (เช่น PTT)" value={stockName} onChange={e => setStockName(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="จำนวนหุ้น" value={shares} onChange={e => setShares(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="ราคาต่อหุ้น" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} />
        <button type="submit" style={{ padding: '12px', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>บันทึกรายการ</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {activePort?.stocks.map((s, i) => (
          <div key={i} style={{ background: '#fff', padding: '15px', borderRadius: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{s.name}</div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>รวม {s.shares} หุ้น</div>
            </div>
            <div style={{ color: '#4f46e5', fontWeight: 'bold' }}>{(s.totalCost / s.shares).toFixed(2)} ฿</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }