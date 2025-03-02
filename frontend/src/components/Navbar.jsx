import { Link, NavLink} from 'react-router-dom';
import '../styles/Navbar.css'; // Import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/user/userApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {userInfo} = useSelector(state=>state.auth)

  const [userLogout] = useLogoutMutation()
  const dispatch = useDispatch()
  const logoutHandler = async()=>{
      try {
       await userLogout()
          dispatch(logout())
      } catch (error) {
          console.log(error);
          toast.error(error.data.message)
          
      }
  }
  return (
    <nav className="navbar">
      <div className="navbar-content"> {/* Container for navbar content */}
        <NavLink to="/" className="navbar-brand">ELM</NavLink> {/* Replace with your logo/brand */}
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Courses
            </NavLink>
          </li>
          <li className=' text-center'>
            <NavLink
              to="/progress"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Progression Graph
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Leaderboard
            </NavLink>
          </li>
          <li className=' text-center'>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>
        </ul>
       
        <div className="navbar-end">
      {
        userInfo ? (
            <div className=' '>

        {
           userInfo.isAdmin ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1]  w-52 p-2 shadow">
              <li><Link to="/admin/create-questions">Create Questions</Link></li>
              <li><Link to="/admin/userlist">UserList</Link></li>
              <li><Link to="/admin/manage-questions">manage-questions</Link></li>
              <li><button onClick={logoutHandler}>Logout</button></li>

            </ul>
            </div>
            ) : ( <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                
                <li><button onClick={logoutHandler}>Logout</button></li>
              </ul>
              
            </div>)
         }

        
       
       </div>
        ) : (
 <div className="login-signup-container gap-3">
          <NavLink to="/login">
            <button className="login-button">Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="signup-button" >Sign Up</button>
          </NavLink>
        </div> 
        )
      }
    </div>
        </div>
    
    </nav>
  );
};

export default Navbar;





// const Navigation = () => {
//     const {userInfo} = useSelector(state=>state.auth)

//     const [userLogout] = useLogoutMutation()
//     const dispatch = useDispatch()
//     const logoutHandler = async()=>{
//         try {
//          await userLogout()
//             dispatch(logout())
//         } catch (error) {
//             console.log(error);
//             toast.error(error.data.message)
            
//         }
//     }
//   return (
//     <div className="navbar bg-base-100">
//     <div className="navbar-start">
//       <div className="dropdown">
//         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h8m-8 6h16" />
//           </svg>
//         </div>
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//           <li><Link to="/">Home</Link></li>
          
//           <li>
//             <Link>Shop by category</Link>
//             <ul className="p-2">
//               <li><a>Submenu 1</a></li>
//               <li><a>Submenu 2</a></li>
//             </ul>
//           </li>
//           <li><Link to="/special">Special offer</Link></li>
//           <li><Link to="/about">About Us</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//         </ul>
//       </div>
//       <Link to="/" className="btn btn-ghost text-xl">GIFT SHOP</Link>
//     </div>
//     <div className="navbar-center hidden lg:flex font-bold">
//       <ul className="menu menu-horizontal px-1">
//         <li><Link to="/">Home</Link></li>
//         <li>
//           <Link to="/shop">Shop</Link>
//         </li>
//         <li><Link to="/special">Special offer</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/contact">Contact Us</Link></li>
//       </ul>
//     </div>
//     <div className="navbar-end">
//       {
//         userInfo ? (
//             <div className=' '>

//         {
//            userInfo.isAdmin ? (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li><Link to="/settings">Settings</Link></li>
//               <li><Link to="/admin/dashboard">Dashboard</Link></li>
//               <li><Link to="/admin/categorylist">create Category</Link></li>
//               <li><Link to="/admin/createproduct">Create product</Link></li>
//               <li><Link to="/admin/userlist">UserList</Link></li>
//               <li><button onClick={logoutHandler}>Logout</button></li>

//             </ul>
//             </div>
//             ) : ( <div className="dropdown dropdown-end">
//               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="Tailwind CSS Navbar component"
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                 <li>
//                   <Link to="/profile" className="justify-between">
//                     Profile
//                     <span className="badge">New</span>
//                   </Link>
//                 </li>
//                 <li><Link to="/settings">Settings</Link></li>
//                 <li><button onClick={logoutHandler}>Logout</button></li>
//               </ul>
              
//             </div>)
//          }

        
       
//        </div>
//         ) : (
// <ul className=' flex items-center justify-center gap-4'>
//     <li><Link to="/login">Login</Link></li>
// <li><Link to="/signup">Sign up</Link></li>
// </ul>
//         )
//       }
//     </div>
//   </div>
//   )
// }

// export default Navigation

