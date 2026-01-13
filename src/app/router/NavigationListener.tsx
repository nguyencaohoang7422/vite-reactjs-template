import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectPath } from "../store/appSelector";
import { clearPath } from "../store/appSlice";

 function NavigationListener() {
  const navigate = useNavigate();
  const path = useSelector(selectPath);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!path) return;
    navigate(path);
    dispatch(clearPath());
  }, [path, navigate, dispatch]);
  return <Outlet/>; 
}
export default NavigationListener;