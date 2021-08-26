import { Home } from './pages/Home';
import { MainLayout } from './component/MainLayout';


export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "campaigns", element: <Home /> },
      { path: "support", element: <Home /> }
    ]
  }
]