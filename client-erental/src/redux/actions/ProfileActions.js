export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

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
