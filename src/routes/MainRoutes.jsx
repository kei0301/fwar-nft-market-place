import Loadable from 'components/Loadable';
import MainLayout from 'layouts/Mainlayout';
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Farm = Loadable(lazy(() => import('pages/farm')));
const Chest = Loadable(lazy(() => import('pages/chest')));
const Pvp = Loadable(lazy(() => import('pages/pvp')));
const ScreenGame = Loadable(lazy(() => import('pages/pvp/ScreenGame.jsx')));
const MarketPlace = Loadable(lazy(() => import('pages/market-place')));
const MarketPlaceDetail = Loadable(lazy(() => import('pages/card-detail')));
const Transaction = Loadable(lazy(() => import('pages/transaction')));
const Card = Loadable(lazy(() => import('pages/my-card')));
const Ticket = Loadable(lazy(() => import('pages/ticket')));
const LeaderBoard = Loadable(lazy(() => import('pages/leader-board')));
const CombatHistory = Loadable(lazy(() => import('pages/combat-history')));
const CombatReward = Loadable(lazy(() => import('pages/combat-reward')));
const PrivateSales = Loadable(lazy(() => import('pages/private-sales')));
const Minting = Loadable(lazy(() => import('pages/minting')));
const Stand = Loadable(lazy(() => import('pages/stand')));
const MainRoutes = (props) => {
  return (
    <Route
      path={[
        '/farm',
        '/chest',
        '/market-place',
        '/market-place/shop',
        '/card/detail',
        '/ticket',
        '/zoo-market',
        '/transactions',
        '/cards',
        '/leaderboard',
        '/buyback',
        '/pvp',
        '/game',
        '/combat-history',
        '/combat-reward',
        '/private-sales',
        '/minting',
        '/stand'
      ]}
    >
      {/* <Suspense fallback={<div>Loading ...</div>}> */}
      <Switch>
        <Route path="/game" component={ScreenGame} />
        <MainLayout>
          {/* <Route exact path="/"> */}
          {/* <Redirect from="/" to="/farm" /> */}
          {/* </Route> */}

          <Route path="/farm" component={Farm} />
          <Route path="/chest" component={Chest} />
          <Route path="/pvp" component={Pvp} />
          <Route path="/card/detail/:id" component={MarketPlaceDetail} />
          <Route path="/stand" component={Stand} />
          <Route exact path="/market-place" component={MarketPlace} />
          <Route path="/ticket" component={Ticket} />
          <Route path="/transactions" component={Transaction} />
          <Route path="/cards" component={Card} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/combat-history" component={CombatHistory} />
          <Route path="/combat-rewards" component={CombatReward} />
          <Route path="/private-sales" component={PrivateSales} />
          <Route path="/minting" component={Minting} />
        </MainLayout>
      </Switch>
      {/* </Suspense> */}
    </Route>
  );
};
export default MainRoutes;
