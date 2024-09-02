import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { profileEndpoints } from "../apis";
import { endpoints } from "../apis";
import { apiconnector } from "../apiconnector";
import { logout } from "./authAPI";

const {
    UPDATE_PROFILE_API,
    DELETE_ACCOUNT_API
} = profileEndpoints;

const {
    CHANGE_PASSWORD_API
} = endpoints;


export function updateDetails(data,token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiconnector("POST",UPDATE_PROFILE_API,data,{
                Authorization : `Bearer ${token}`
            });

            console.log(response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.updatedUser));
            localStorage.setItem("user",JSON.stringify(response.data.updatedUser));
            toast.success("Details Updated Successfully!");
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function ChangePasswordHandler(data,token,setFormData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{    
            const response = await apiconnector("POST",CHANGE_PASSWORD_API,data,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password Updated Successfully!");
            setFormData({
                oldPassword: "",
                newPassword: ""
            });
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function deleteAccount(token,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiconnector("DELETE",DELETE_ACCOUNT_API,null,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted Successfully!");
            dispatch(logout(navigate));
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}