import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiconnector } from "../apiconnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
    LOGIN_API,
    SIGNUP_API,
    SEND_OTP_API
} = endpoints;


export function login(email,password,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try{    
            
            const data = {
                email:email,
                password:password,
            };

            const response = await apiconnector("POST",LOGIN_API,data);
            console.log("Response Of Login",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
            toast.success("Login Success!");
        } catch(error){
            console.log(error.message);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function sendOtp(email,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiconnector("POST",SEND_OTP_API,{
                email
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully!");
            navigate("/verifyOtp");
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiconnector("POST",SIGNUP_API,{
                firstName,lastName,email,password,confirmPassword,otp
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Signup Success!");
            navigate("/login");
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out Successfully!");
        navigate("/");
    }
}