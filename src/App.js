import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/page/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Components/common/Header';
import YTSubscriber from './Components/page/ytSubscriber';
import YTViews from './Components/page/ytViews';
import YTSubscriberStat from './Components/page/ytSubscriberStat';
import YTViewsStat from './Components/page/ytViewsStat';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/youtube-live-subscriber-counter" component={YTSubscriber} />
        <Route exact path="/youtube-live-subscriber-counter/:id" component={YTSubscriberStat} />
        <Route exact path="/youtube-live-views-counter" component={YTViews} />
        <Route exact path="/youtube-live-views-counter/:id" component={YTViewsStat} />
      </Switch> 
    </Router>
  );
}

export default App;
