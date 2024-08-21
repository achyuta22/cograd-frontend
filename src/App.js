import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./SignINUP/signin";
import SignUp from "./SignINUP/singup";
import AddEvent from "./Events/AddEvent";
import ShowEvent from "./Events/ShowEvent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./FooterHeader/Footer";
import Header from "./FooterHeader/Header";
import ImageAndDescription from "./Events/ImageDescription";
import ProfilePage from "./Profile/Profile";
import Home from "./Home/Home";
import UpdateEventPage from "./Events/updateEvent";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Redirect from the root path to the login page */}
        {/* Route for the login page */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/showevent" element={<ShowEvent />} />
        <Route path="/event/:id" element={<ImageAndDescription />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event/:id/update" element={<UpdateEventPage/>} />
        {/* <ToastContainer /> Place ToastContainer in your component tree */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
