import React from 'react';
import { BrowserRouter, Route, Link ,DefaultRoute} from 'react-router-dom';
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
          <div className="api-doc-nav">
                <h3>Contents</h3>
            <Link to="/dev/docs/">
            <h5>Getting Started</h5>
            </Link>
            <Link to="/dev/docs/authorization">
            <h5>Authorization Guide</h5>
            </Link>
            <Link to="/dev/docs/endpoints">
            <h5>API Endpoint Reference</h5>
            </Link>
          </div>
          <Route exact path="/dev/docs/" component={GettingStarted}/>
          <Route exact path="/dev/docs/authorization" component={AuthorizationGuide}/>
          <Route exact path="/dev/docs/endpoints" component={EndpointReference}/>
        </div>
      </BrowserRouter>
    )
  }
};

export default ApiDoc
