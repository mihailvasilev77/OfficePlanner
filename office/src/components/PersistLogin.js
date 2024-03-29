import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import NavbarHook from "./NavbarHook";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [auth?.accessToken, persist, refresh])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading, auth?.accessToken])

    return (
        <>
            {!persist
                ? 
                <main>
                <NavbarHook/>
                <Outlet />
                </main>
                : isLoading
                    ? <p>Loading...</p>
                    : <main>
                    <NavbarHook/>
                    <Outlet />
                    </main>
            }
        </>
    )
}

export default PersistLogin