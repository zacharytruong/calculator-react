import './App.css';

function App() {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">1234 +</div>
        <div className="current-operand">321</div>
      </div>
      <button>AC</button>
      <button>±</button>
      <button>%</button>
      <button>÷</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button className='span-two bottom-right'>0</button>
      <button>.</button>
      <button className='bottom-left'>=</button>
    </div>
  );
}

export default App;
