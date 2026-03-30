import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

/**
 * Profile component.
 *
 * Bug fix: The component was exported as `Home` but the file was `Profile.jsx`.
 * Renamed to match the file name.
 *
 * Bug fix: Replaced the `clipboard-copy` npm package with the native
 * navigator.clipboard API to eliminate an unnecessary dependency.
 */
const Profile = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const username = auth?.username || auth?.user || '';

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const goToPersonalPage = () => {
    navigate(`/vacation/${username}`);
  };

  const shareableLink = `${window.location.origin}/vacation/${username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      alert('Link copied to clipboard!');
    } catch {
      // Fallback for browsers that don't support clipboard API
      prompt('Copy this link:', shareableLink);
    }
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
  );
};

export default Profile;
