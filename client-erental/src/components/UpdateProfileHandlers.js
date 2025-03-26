import { message } from "antd";
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE } from "../redux/actions/ProfileActions";
import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "../redux/actions/ProfileActions";

export const fetchProfile = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });

  try {
    const response = await fetch(`https://localhost:5001/api/Users/profile/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }

    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
  }
};


export const updateProfile = (values, navigate) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
  
    try {
      const response = await fetch(`https://localhost:5001/api/Users/update-profile/${values.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
  
      const data = await response.json();
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  
      message.success("Profile updated successfully!");
      navigate(`/Users/profile/${values.userId}`); 
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
      message.error(error.message || "Update failed!");
    }
  };
