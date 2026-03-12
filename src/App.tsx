import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(0);

  // คำนวณเงินรวมใน 1 ปี (สมมติออมทุกเดือน)
  const totalAfterOneYear = amount * 12;

  return (
    <div style={{ padding: '20px' }}>
      <h1>DCA Calculator</h1>
      <input 
        type="number" 
        placeholder="ใส่จำนวนเงินต่อเดือน..." 
        onChange={(e) => setAmount(Number(e.target.value))} 
      />
      <p>คุณจะออมเงิน: {amount} บาทต่อเดือน</p>
      <p><strong>รวม 1 ปี คุณจะมีเงิน: {totalAfterOneYear} บาท</strong></p>
    </div>
  );
}
export default App;