import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HOME } from './navigation/navigation.routes';
import HomeRoute from './navigation/home';

import { Layout } from './components/layout';

function App() {
  return (
    <Router>
      <Layout>

        <Route path={HOME} exact component={HomeRoute} />
        
      </Layout>
    </Router>
  );
}

export default App;
