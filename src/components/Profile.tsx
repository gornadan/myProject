import { useEffect } from "react";
import { authThunk } from "../bll/authReducer";
import { useDispatch } from "react-redux";
import { AuthRedirectComponent } from "../hoc/AuthRedirectComponent";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  return <div>Profile</div>;
}

export default AuthRedirectComponent(Profile);
