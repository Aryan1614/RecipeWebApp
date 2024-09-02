import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/common/NavBar';
import Home from './pages/Home';
import Error from './pages/Error';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OpenRoute from './components/core/Auth/OpenRoute';
import VerifyOtp from './pages/VerifyOtp';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import UserRecipes from './components/core/Dashboard/UserRecipes';
import AddRecipe from './components/core/Dashboard/AddRecipe';
import Settings from './components/core/Dashboard/Settings';
import LinkedRecipes from './components/core/Dashboard/LinkedRecipes';
import AllRecipes from './pages/AllRecipes';
import RecipeType from './pages/RecipeType';
import Recipe from './pages/Recipe';
import UpdateRecipe from './components/core/Dashboard/UpdateRecipe';

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 font-inter text-[#3a2b30]'>
      <NavBar className="" />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/recipe' element={<AllRecipes/>} />
        <Route path='/recipeType/:RecipeName' element={<RecipeType/>} />
        <Route path='/recipe/:recipeId' element={<Recipe/>} />

        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>} />
        <Route path='/signup' element={<OpenRoute><SignUp/></OpenRoute>} />
        <Route path='/verifyOtp' element={<OpenRoute><VerifyOtp/></OpenRoute>} />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path={"/dashboard/my-profile"} element={<PrivateRoute><MyProfile/></PrivateRoute>} />
          <Route path={"/dashboard/AddRecipe"} element={<PrivateRoute><AddRecipe/></PrivateRoute>} />
          <Route path={"/dashboard/userRecipe"} element={<PrivateRoute><UserRecipes/></PrivateRoute>} />
          <Route path={"/dashboard/Settings"} element={<PrivateRoute><Settings/></PrivateRoute>} />
          <Route path={"/dashboard/Liked"} element={<PrivateRoute><LinkedRecipes/></PrivateRoute>} />
          <Route path={"/dashboard/editRecipe/:recipeId"} element={<PrivateRoute><UpdateRecipe/></PrivateRoute>} />
        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;