import { Redirect, Switch, Route } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <>
        <MainRoutes />
        <Route exact path="/">
          <Redirect from="/" to="/market-place" />
        </Route>

        {/* <Redirect from="/" to="/farm" /> */}
      </>
    </Switch>
  );
};

export default Routes;
