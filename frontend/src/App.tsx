import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Wishlist from './pages/Wishlist';
import MyGarden from './pages/MyGarden';
import Profile from './pages/Profile';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/catalog" element={<SignedIn><Catalog /></SignedIn>} />
          <Route path="/wishlist" element={<SignedIn><Wishlist /></SignedIn>} />
          <Route path="/my-garden" element={<SignedIn><MyGarden /></SignedIn>} />
          <Route path="/profile" element={<SignedIn><Profile /></SignedIn>} />
          <Route path="*" element={<div>404 Not Found</div>} />

          {/* Redirect for unauthenticated users */}
          <Route path="/catalog" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
          <Route path="/wishlist" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
          <Route path="/my-garden" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
          <Route path="/profile" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <AppRoutes />
      </Router>
    </ClerkProvider>
  );
}

export default App;
