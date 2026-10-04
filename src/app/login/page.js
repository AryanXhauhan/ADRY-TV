'use client';
import { useState } from 'react';
import { Search, Bell, Play, Home, Compass, Library, User, Mail, Lock, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { 
  GoogleAuthProvider, signInWithPopup, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendSignInLinkToEmail 
} from 'firebase/auth';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'link'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const syncWithBackend = async (user) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      setStatus(`Logged in! Backend says: ${data.message}`);
    } catch (err) {
      setStatus('Firebase login succeeded, but backend sync failed.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setStatus('Firebase Login Success! Syncing with Backend...');
      await syncWithBackend(result.user);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleEmailPassAuth = async (e) => {
    e.preventDefault();
    try {
      if (authMode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setStatus('Account created! Syncing with Backend...');
        await syncWithBackend(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setStatus('Logged in! Syncing with Backend...');
        await syncWithBackend(result.user);
      }
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleEmailLink = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: window.location.href, // Redirects back to this page
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setStatus('Sign-in link sent to your email!');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <>
      <header className="main-header" style={{ paddingBottom: '1rem', boxShadow: 'none' }}>
        <div className="top-row">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="logo">ADRY TV</div>
          </Link>
        </div>
      </header>

      <div className="content-area flex flex-col items-center justify-center p-4" style={{ height: '70vh' }}>
        <div className="auth-card">
          <h1 className="auth-title">
            {authMode === 'login' ? 'Welcome Back' : 
             authMode === 'signup' ? 'Create Account' : 'Passwordless Login'}
          </h1>
          <p className="auth-subtitle">Get ready for premium stories</p>

          <button onClick={handleGoogleLogin} className="auth-btn google-btn hover-scale mt-4">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
            Continue with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {authMode === 'link' ? (
            <form className="auth-form" onSubmit={handleEmailLink}>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="auth-btn primary-btn hover-scale">Send Magic Link</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleEmailPassAuth}>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="auth-btn primary-btn hover-scale">
                {authMode === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            </form>
          )}

          {status && <div className="auth-status mt-4">{status}</div>}

          <div className="auth-links mt-4">
            {authMode !== 'login' && <span onClick={() => setAuthMode('login')}>Already have an account? Login</span>}
            {authMode !== 'signup' && <span onClick={() => setAuthMode('signup')}>New to ADRY TV? Sign Up</span>}
            {authMode !== 'link' && <span onClick={() => setAuthMode('link')}>Use Passwordless Magic Link</span>}
          </div>
        </div>
      </div>
    </>
  );
}
