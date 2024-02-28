import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/request">Go to the Request page</Link>
            <br />
            <Link to="/calendar">Go to the Calendar page</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <br />
            <Link to="/pendings">Go to the Pendings page</Link>
            <br />
            <Link to="/edit">Go to the Edit page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home