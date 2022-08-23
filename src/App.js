// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigurStore } from './Redux/Store';
import MiniDrawer from './componente/Layout';
import { Route } from 'react-router-dom';
import Counter from './componente/Counter/Counter';
import { Switch } from 'react-router-dom';
import Doctor from './container/Doctor';
import { PersistGate } from 'redux-persist/integration/react'



function App() {

  let {store, persistor} = ConfigurStore()

  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MiniDrawer>
          <Switch>
            <Route exact to path={"/Doctor"} component={Doctor} />
            <Route exact to path={"/Counter"} component={Counter} />
          </Switch>
        </MiniDrawer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
