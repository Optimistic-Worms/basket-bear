import React from 'react';
import { BrowserRouter, Route, Link ,DefaultRoute, NavLink} from 'react-router-dom';
import GettingStarted from './GettingStarted.jsx';
import AuthorizationGuide from './AuthorizationGuide.jsx';
import EndpointReference from './EndpointReference.jsx';

class ApiDoc extends React.Component {

  componentDidMount() {
    window.scrollTo(0,0);
  }


  render() {
    return (
      <BrowserRouter>
        <div className="api-doc">
          <div className="api-doc-body">
            <Route exact path="/dev/docs/start" component={GettingStarted}/>
            <Route path="/dev/docs/authorization" component={AuthorizationGuide}/>
            <Route path="/dev/docs/endpoints" component={EndpointReference}/>
          </div>
          <div className="api-doc-nav">
            <h3>Contents</h3>
            <NavLink to="/dev/docs/start" activeClassName="selected">
              <h5>Getting Started</h5>
            </NavLink>
            <NavLink to="/dev/docs/authorization" activeClassName="selected">
            <h5>Authorization Guide</h5>
            </NavLink>
            <NavLink to="/dev/docs/endpoints" activeClassName="selected">
            <h5>API Endpoint Reference</h5>
            </NavLink>
          </div>
        </div>
      </BrowserRouter>
    )
  }
};

export default ApiDoc
