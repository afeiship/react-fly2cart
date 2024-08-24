import ReactFly2Cart from '@jswork/react-fly2cart/src/main';
import '@jswork/react-fly2cart/src/style.scss';
import { useState } from 'react';
import { useCommand } from '@jswork/react-fly2cart/src/main';

function App() {
  const [num, setNum] = useState(0);
  const { fly2cart } = useCommand('minus');
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 h-100 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <div
        className="the-cart bg-green-400 size-16 rounded-full flex justify-center items-center corner-r top-10 right-10 abs">List:
        {num}
      </div>
      <ReactFly2Cart target=".the-cart" className="abs top-100 left-100" onClick={() => setNum(num + 1)}>
        <button className="btn btn-sm btn-primary">Buy Now</button>
      </ReactFly2Cart>
      <ReactFly2Cart name="minus" target=".the-cart" manually className="abs top-50 right-100"
                     onClick={() => {
                       setNum(num - 1);
                       setTimeout(() => {
                         console.log('fly2cart');
                         fly2cart();
                       }, 1000);
                     }}>
        <button className="btn btn-sm btn-secondary">Buy immediately(-1)</button>
      </ReactFly2Cart>
    </div>
  );
}

export default App;
