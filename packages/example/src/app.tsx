import ReactFly2Cart from '@jswork/react-fly2cart/src/main';
import '@jswork/react-fly2cart/src/style.scss';

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 h-100 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <div className="the-cart bg-green-400 size-16 rounded-full flex justify-center items-center corner-r right-10 abs">List: 0</div>
      <ReactFly2Cart target=".the-cart" className="abs top-100 left-100">
        <button className="btn btn-sm btn-primary">Buy Now</button>
      </ReactFly2Cart>
    </div>
  );
}

export default App;
