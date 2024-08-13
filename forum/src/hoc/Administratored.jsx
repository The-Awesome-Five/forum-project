import {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AppContext} from "../state/app.context.js";

export default function Administrated ({children}) {

    const { userData } = useContext(AppContext);
    const location = useLocation();

    if (!userData || userData.role !== 'Admin') {
        return <Navigate replace to="/login" state={{ from: location }} />
    }

    return (
        <>
            {children}
        </>
    )

}
