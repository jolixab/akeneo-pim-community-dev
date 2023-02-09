import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Edit, List} from './controllers';
import {QueryClient, QueryClientProvider} from 'react-query';
import styled from 'styled-components';
import {getColor} from 'akeneo-design-system';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

const ContainerApp = styled.div`
  color: ${getColor('grey', 120)};
`;

const IdentifierGeneratorApp: React.FC = () => (
  <ContainerApp>
    <QueryClientProvider client={queryClient}>
      <Router basename="/configuration/identifier-generator">
        <Switch>
          <Route path="/:identifierGeneratorCode">
            <Edit />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  </ContainerApp>
);

export {IdentifierGeneratorApp};
