import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../component/useAuth";
import Loading from "../component/Loading";

const PrivateRouter = ({ children }) => {
    const location = useLocation();
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return <Loading />
    }
    if (user) {
        return children
    }

    return <Navigate
        to='/login'
        state={{ from: location }}
        replace>
    </Navigate>
};

export default PrivateRouter;