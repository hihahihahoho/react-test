
import Header from './components/Header'
import Counter from './components/Counter'
import CounterHooks from './components/CounterHooks'

function App() {
  return (
    <>
      <div className="container">
        <Header number={4} />
      </div>
      <Counter initialCount={1} />
      <CounterHooks initialCount={0} />
    </>
  );
}

export default App;
