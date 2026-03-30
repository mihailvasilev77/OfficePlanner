import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

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
      prompt('Copy this link:', shareableLink);
    }
  };

  return (
    <section>
      <h1>Profile</h1>
      <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-800)', marginTop: 'var(--space-2)' }}>
        Hello, <strong>{username}</strong>
      </p>

      <div className="profile-actions">
        <button onClick={goToPersonalPage}>See your vacations</button>
        <button onClick={copyToClipboard}>Copy shareable link</button>
      </div>

      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Profile;
