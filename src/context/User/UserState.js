import UserContext from "./UserContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";

const UserState = (props) => {
  const [user, setUser] = useState({});
  const [cookies, setCookies] = useCookies();

  

  const getuser = async () => {

    const headers = {
      "Content-Type": "application/json",
      'token': cookies.token,
    };

    const res = await axios.get("http://localhost:4000/api/profile", {
      headers,
    });

    res.then((res) => {
      setUser(res.data.user);
      console.log(res);
    })
    .catch((err)=>{
      console.log(err.message);
    })
    // console.log(res)
  };

  return (
    <UserContext.Provider value={{ user, setUser, getuser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
