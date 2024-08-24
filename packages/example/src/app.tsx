import ReactFly2Cart from '@jswork/react-fly2cart/src/main';
import '@jswork/react-fly2cart/src/style.scss';

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <ReactFly2Cart className="debug-red">
        abc
      </ReactFly2Cart>
    </div>
  );
}

export default App;
