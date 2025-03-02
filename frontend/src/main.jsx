import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import AdminRoute from './pages/admin/AdminRoute.jsx'
import UserList from './pages/admin/UserList.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import EngineeringDisciplines from './pages/courses/Courses.jsx'
import Progress from './components/Progress.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import About from './components/About.jsx'
import AddQuestion from './pages/admin/questions/CreateQuestions.jsx'
import QuestionList from './pages/admin/questions/QuestionsList.jsx'
import EditQuestion from './pages/admin/questions/EditQuestions.jsx'
import MockTest from './pages/courses/MockTest.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route index={true} path="/" element={<Home />} />
    <Route path='/about' element={<About/>}/>
    

{/* privacy route */}
<Route path='' element={<PrivateRoute/>}>
< Route path='/courses' element={<EngineeringDisciplines/>}/>
<Route path='/progress' element={<Progress/>}/>
<Route path='/leaderboard' element={<Leaderboard/>}/>
<Route path='/test/:category' element={<MockTest/>}/>

</Route>



    {/* admin route */}

    <Route path='/admin' element={<AdminRoute/>}>
    <Route path="userlist" element={<UserList />} />
    <Route path='create-questions' element={<AddQuestion/>}/>
    <Route path='manage-questions' element={<QuestionList/>}/>
    <Route path='edit-question/:id' element={<EditQuestion/>}/>

    </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
   <RouterProvider router={router} />
     </Provider>,
)