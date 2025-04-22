import { Navigate } from "react-router-dom"; 


 const IsAuthunticated=(WrappedComponent)=>{

    return(props)=>{
        let Authunticated=localStorage.getItem("loggedInUser")
        if (Authunticated!= null||Authunticated!=""){
        Authunticated =JSON.parse(localStorage.getItem("loggedInUser"))?.isLoggedIn
        }
        if (!Authunticated) {
            return <Navigate to={"/"} replace />;
        }
        return <WrappedComponent {...props} />;

    };
}
export default IsAuthunticated;