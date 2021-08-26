import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';


function App() {
  const pageRoutes = useRoutes(routes)
  return (
    <>
      {pageRoutes}
    </>
  );
}

export default App;
