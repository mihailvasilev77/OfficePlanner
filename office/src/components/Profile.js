import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';
import React, { useEffect, useState } from "react";
import copy from 'clipboard-copy';

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(auth?.username || auth?.user);
      }, [auth?.username, auth?.user]);

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const goToPersonalPage = () => {
        navigate(`/vacation/${username}`);
      };
    
    const shareableLink = `${window.location.origin}/vacation/${username}`;

    const copyToClipboard = () => {
        copy(shareableLink);
        alert('Link copied to clipboard!');
    };

    return (
        <section>
            <h1>Profile</h1>
            <br />
            <p>Hello, {username}</p>
            <br />
            <button onClick={goToPersonalPage}>See your vacations</button>
            <br />
            <p>Share your vacations</p>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
