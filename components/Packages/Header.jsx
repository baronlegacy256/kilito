"use client";

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [desktopHover, setDesktopHover] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    }
  };

  const showLoginModal = () => {
    window.dispatchEvent(new CustomEvent('show-login-modal'));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false);
        setActiveSubMenu(null);
        setActiveSubSubMenu(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!hasSupabaseBrowserEnv()) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <header>
      {isMobileMenuOpen && (
        <div 
          className="offcanvas-backdrop fade in" 
          onClick={toggleMobileMenu}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 1045
          }}
        />
      )}
      <div
        id="front-menu-mobile"
        className={`navmenu navmenu-default navmenu-mobile navmenu-fixed-left offcanvas-md ${isMobileMenuOpen ? 'active' : ''}`}
        style={{ display: isMobileMenuOpen ? 'block' : undefined, zIndex: 1050 }}
      >
        <ul className="nav navmenu-nav">
          <li className="menu-container" style={{ display: activeSubMenu ? 'none' : 'block' }}>
            <ul id="mobile-login-zone" className="menu-list">
              <li className="menu-header">
                <Link href="/" className="logo-container no-decoration">
                  <div className="photo-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/assets/images/home/logo.png"
                        alt="Kili to Savanna logo" title="Africa Safari: Tailor-made Trips and Stays - Kili to Savanna"
                        style={{ maxHeight: '32px', width: 'auto', objectFit: 'contain' }} />
                  </div>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn custom-button white no-border login-button"
                    onClick={isAuthenticated ? handleLogout : showLoginModal}
                    style={{ width: 'auto', padding: '0 10px' }}
                  >
                    {isAuthenticated ? "Log out" : "Log in"}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      padding: '0 10px', 
                      color: 'black', 
                      fontSize: '20px', 
                      cursor: 'pointer' 
                    }}
                    aria-label="Close menu"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
              </li>
            </ul>
            <ul className="menu-list">
              <li className="link-to-sub-menu" onClick={() => setActiveSubMenu('submenu-1')}>
                Destinations
                <i className="fa fa-angle-right icon" aria-hidden="true"></i>
              </li>
            </ul>

            <ul className="menu-list">
              <li className="link-to-sub-menu" onClick={() => setActiveSubMenu('submenu-2')}>
                About Us
                <i className="fa fa-angle-right icon" aria-hidden="true"></i>
              </li>
            </ul>

            <div className="tel-zone">
              <i className="fa fa-phone icon" aria-hidden="true"></i>
              <a href="tel:+255 734 970 891" className="no-decoration">+255 734 970 891</a>
            </div>
          </li>

          <li className="submenu-container" style={{ display: activeSubMenu && !activeSubSubMenu ? 'block' : 'none' }}>
            <ul id="submenu-1" className={`menu-list submenu ${activeSubMenu === 'submenu-1' ? 'active' : ''}`} style={{ display: activeSubMenu === 'submenu-1' ? 'block' : 'none' }}>
              <li className="submenu-backlink" onClick={() => setActiveSubMenu(null)}>Back</li>
              <li className="link-to-sub-sub-menu" style={{ padding: 0 }}>
                <Link href="/packages?category=Safari+tour" onClick={toggleMobileMenu} style={{ color: "black", display: "block", padding: "10px 15px", textDecoration: "none" }}>
                  Safari Tour <i className="fa fa-angle-right icon" aria-hidden="true" style={{ float: "right" }}></i>
                </Link>
              </li>
              <li className="link-to-sub-sub-menu" style={{ padding: 0 }}>
                <Link href="/packages?category=Cultural+tour" onClick={toggleMobileMenu} style={{ color: "black", display: "block", padding: "10px 15px", textDecoration: "none" }}>
                  Cultural Tour <i className="fa fa-angle-right icon" aria-hidden="true" style={{ float: "right" }}></i>
                </Link>
              </li>
              <li className="link-to-sub-sub-menu" style={{ padding: 0 }}>
                <Link href="/packages?category=Climbing+and+Trekking" onClick={toggleMobileMenu} style={{ color: "black", display: "block", padding: "10px 15px", textDecoration: "none" }}>
                  Climbing and Trekking <i className="fa fa-angle-right icon" aria-hidden="true" style={{ float: "right" }}></i>
                </Link>
              </li>
            </ul>

            <ul id="submenu-2" className={`menu-list submenu ${activeSubMenu === 'submenu-2' ? 'active' : ''}`} style={{ display: activeSubMenu === 'submenu-2' ? 'block' : 'none' }}>
              <li className="submenu-backlink" onClick={() => setActiveSubMenu(null)}>Back</li>
              <li className="submenu-item with-link">
                <Link href="/who-we-are" className="no-decoration" style={{ color: 'black' }}>Who we are</Link>
              </li>
              <li className="submenu-item with-link">
                <Link href="/customer-reviews" className="no-decoration" style={{ color: 'black' }}>Customer reviews</Link>
              </li>
              <li className="submenu-item with-link">
                <Link href="/press" className="no-decoration" style={{ color: 'black' }}>Press</Link>
              </li>
              <li className="submenu-item with-link">
                <Link href="/jobs" className="no-decoration" style={{ color: 'black' }}>Jobs</Link>
              </li>
              <li className="submenu-item with-link">
                <Link href="/faq" className="no-decoration" style={{ color: 'black' }}>FAQ</Link>
              </li>
              <li className="submenu-item with-link">
                <Link href="/contact" className="no-decoration" style={{ color: 'black' }}>Contact</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div id="main-menu" className="navbar navbar-default white front" role="navigation">
        <div id="navbar-container" className="navbar-container full-page ">
          <div
            id="nav-icon-container"
            className={`pull-left visible-xs visible-sm ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
          >
            <div id="nav-icon" className={isMobileMenuOpen ? 'open' : ''}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="logo-container ">
            <Link href="/" className="no-decoration">
                <img src="/assets/images/home/logo.png"
                    alt="Kili to Savanna logo"
                    title="Adventure weekends and stays, organized by local experts" width="203"
                    height="28" />
            </Link>
          </div>

          <div id="main-menu-desktop-items-container" className="hidden-xs hidden-sm">
            <div className="menu-items-container hidden-xs hidden-sm">
              <div className="menu-link-items">
                <div 
                  className="menu-large"
                  onMouseEnter={() => setDesktopHover('about')}
                  onMouseLeave={() => setDesktopHover(null)}
                  style={{ position: 'relative' }}
                >
                  <div className="menu-title menu-cat" style={{ color: 'black' }}>About Us</div>
                  {desktopHover === 'about' && (
                    <ul className="menu-list submenu active" style={{ 
                      position: 'absolute', 
                      top: '100%', 
                      left: 0, 
                      display: 'block', 
                      minWidth: '200px',
                      background: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      padding: '10px 0',
                      listStyle: 'none'
                    }}>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/who-we-are" style={{ color: 'black', textDecoration: 'none' }}>Who we are</Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/customer-reviews" style={{ color: 'black', textDecoration: 'none' }}>Customer reviews</Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/press" style={{ color: 'black', textDecoration: 'none' }}>Press</Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/jobs" style={{ color: 'black', textDecoration: 'none' }}>Jobs</Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/faq" style={{ color: 'black', textDecoration: 'none' }}>FAQ</Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/contact" style={{ color: 'black', textDecoration: 'none' }}>Contact</Link>
                      </li>
                    </ul>
                  )}
                </div>

                <div 
                  className="menu-large"
                  onMouseEnter={() => setDesktopHover('destinations')}
                  onMouseLeave={() => setDesktopHover(null)}
                  style={{ position: 'relative' }}
                >
                  <div className="menu-title menu-cat" style={{ color: 'black' }}>Destinations</div>
                  {desktopHover === 'destinations' && (
                    <ul className="menu-list submenu active" style={{ 
                      position: 'absolute', 
                      top: '100%', 
                      left: 0, 
                      display: 'block', 
                      minWidth: '200px',
                      background: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      padding: '10px 0',
                      listStyle: 'none'
                    }}>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/packages?category=Safari+tour" style={{ color: "black", textDecoration: "none", display: "block" }}>
                          Safari Tour
                        </Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/packages?category=Cultural+tour" style={{ color: "black", textDecoration: "none", display: "block" }}>
                          Cultural Tour
                        </Link>
                      </li>
                      <li className="submenu-item with-link" style={{ padding: '10px 20px' }}>
                        <Link href="/packages?category=Climbing+and+Trekking" style={{ color: "black", textDecoration: "none", display: "block" }}>
                          Climbing and Trekking
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="menu-button-items">
                <div className="menu-large">
                  <div className="menu-title tel-zone">+255 734 970 891</div>
                </div>
                <div className="menu-large">
                  <div id="login-zone" className="menu-title login-zone">
                    <button
                      type="button"
                      className="btn custom-button negative-blue no-border"
                      onClick={isAuthenticated ? handleLogout : showLoginModal}
                    >
                      {isAuthenticated ? "Log out" : "Log in"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;