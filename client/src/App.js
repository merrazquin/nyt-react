import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (

    <div>
        <Nav />
        <Router>
            <Switch>
                {/* switch ensures that at most, only 1 route will render */}
                <Route exact path="/" component={Articles} />
                {/* NoMatch becomes the default */}
                <Route component={NoMatch} />
            </Switch>
        </Router>
    </div>
);

export default App;
