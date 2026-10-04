import { Search, Bell, Play, Home, Compass, Library, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header className="main-header">
        <div className="top-row">
          <div className="logo">ADRY TV</div>
          <div className="header-actions">
            <Bell size={22} className="hover-scale" />
          </div>
        </div>
        <div className="search-container">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search for stories, shows, or podcasts..." />
          </div>
        </div>
      </header>

      <div className="content-area">
        <div className="hero">
          <div className="hero-content">
            <div className="badge">New Release</div>
            <h1 className="hero-title">Shiva Trilogy</h1>
            <p className="hero-desc">Experience the epic journey of a mortal turning into Mahadev.</p>
            <button className="play-btn hover-scale">
              <Play fill="white" size={20} />
              Play Now
            </button>
          </div>
        </div>

        <div className="section mt-4">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <span className="see-all hover-scale">See All</span>
          </div>
          <div className="scroll-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card hover-scale">
                <div className="card-img" style={{ backgroundImage: `url('https://picsum.photos/seed/${i * 10}/200/300')` }}></div>
                <div className="card-info">
                  <h3 className="card-title">Story Title {i}</h3>
                  <p className="card-subtitle">Thriller • 1.2M Listens</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Premium Shows</h2>
            <span className="see-all hover-scale">See All</span>
          </div>
          <div className="scroll-list">
            {[5, 6, 7, 8].map((i) => (
              <div key={i} className="card hover-scale">
                <div className="card-img" style={{ backgroundImage: `url('https://picsum.photos/seed/${i * 10}/200/300')` }}></div>
                <div className="card-info">
                  <h3 className="card-title">Premium Story {i}</h3>
                  <p className="card-subtitle">Romance • 500k Listens</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Continue Listening</h2>
          </div>
          <div className="scroll-list">
            {[9, 10, 11].map((i) => (
              <div key={i} className="card hover-scale">
                <div className="card-img" style={{ backgroundImage: `url('https://picsum.photos/seed/${i * 10}/200/300')` }}></div>
                <div className="card-info">
                  <h3 className="card-title">Episode {i}</h3>
                  <p className="card-subtitle">Sci-Fi • 75% Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="bottom-nav">
        <div className="nav-item active">
          <Home size={22} />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <Compass size={22} />
          <span>Discover</span>
        </div>
        <div className="nav-item">
          <Library size={22} />
          <span>Library</span>
        </div>
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <div className="nav-item">
            <User size={22} />
            <span>Profile</span>
          </div>
        </Link>
      </nav>
    </>
  );
}
