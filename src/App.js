 import Home from './pages/Home';
 import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
 import Login from './pages/Login'
 import Askquestios from './pages/Askquestion'
 import Answers from './pages/Answers'
import About from './components/About';
import { UserProvider } from './Usercontext';
import Registration from './pages/Regstration';
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login />
    },
    {
      path:"/questions",
      element:<Home />
    },
    {
      path:"/users/login",
      element:<Login />
    },
    {
      path:"/users/register",
      element:<Registration />
    },
    {
      path:"/questions/ask",
      element:<Askquestios />
    },
    {
      path:"/answers/questions/:questionid/answers",
      element:<Answers />
    },
    {
      path:"/aboutus",
      element:<About />
    }
  ])
  return (
     <UserProvider>
       <RouterProvider router={router}/>
     </UserProvider>
  );
}

export default App;
