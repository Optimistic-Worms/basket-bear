import React from 'react';
import { BrowserRouter, Route, Link ,DefaultRoute} from 'react-router-dom';
import GettingStarted from './GettingStarted.jsx';
import AuthorizationGuide from './AuthorizationGuide.jsx';

class ApiDoc extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="api-doc">
          <div className="api-doc-nav">
            <Link to="/api/docs/">
            <h5>Getting Started</h5>
            </Link>
            <Link to="/api/docs/authorization">
            <h5>Authorization Guide</h5>
            </Link>
            <Link to="/api/docs">
            <h5>API Endpoint Reference</h5>
            </Link>
          </div>
          <Route exact path="/api/docs/" component={GettingStarted}/>
          <Route exact path="/api/docs/authorization" component={AuthorizationGuide}/>
        </div>
      </BrowserRouter>
    )
  }
};

export default ApiDoc
