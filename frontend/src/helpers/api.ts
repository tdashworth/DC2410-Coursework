import axios from "axios";
import { getAuthHeaders } from "./session";
import { User } from "./types";

export const getUserProfile = async () => {
  try {
    return (await axios.get<User>("/api/users/profile", {
      headers: getAuthHeaders()
    })).data;
  } catch (error) {
    console.log(error);
    // this.setState({ error: 'Something went wrong' });
  } finally {
    // this.setState({ isRequesting: false });
  }
};
