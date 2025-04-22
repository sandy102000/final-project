import { useState,useEffect } from "react";
import { UserContext } from "../Context/Usercontext";

const UserProvider=({children})=>{
const [user,setUser]=useState({
    User_name:"",
    Email:"",
    LoggedIn:false

})
const [loading,setLoading]=useState(false);
  // useEffect(()=>{
  //   const storedUser = localStorage.getItem("loggedInUser");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // },[])};
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newDate) => {
    setUser((prev) => ({
      ...prev,
      ...newDate,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser ,loading,setLoading}}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;