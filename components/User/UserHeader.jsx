"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────────────────────

// The hardcoded USER is now replaced by the prop passed from layout

const NAV_LINKS = [
  { href: "/user/account", icon: "fa-user", label: "My account", active: true },
  {
    href: "/user/stays",
    icon: "fa-calendar",
    label: "My stays",
    active: false,
  },
  {
    href: "/user/messages",
    icon: "fa-comments",
    label: "My messages",
    active: false,
  },
];

const SPORTS = [
  { href: "/sp-alpinisme", label: "Mountaineering" },
  { href: "/sp-voile", label: "Sailing cruise" },
  { href: "/sp-decouverte", label: "Discovery" },
  { href: "/sp-escalade", label: "Escalation" },
  { href: "/sp-kitesurf", label: "Kitesurf" },
  { href: "/sp-multi-activites-montagne", label: "Mountain multi-activity" },
  { href: "/sp-multi-activites-neige", label: "Multi-activity snow" },
  { href: "/sp-safari", label: "Safari" },
  { href: "/sp-ski-de-randonnee", label: "Ski touring / Freeride" },
  { href: "/sp-stage-de-survie", label: "Survival course" },
  { href: "/sp-surf", label: "Surf" },
  { href: "/sp-trail", label: "Trail" },
  { href: "/sp-trek", label: "Trekking / Hiking" },
  { href: "/sp-voyage-velo", label: "Bike" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const LoggedInMenu = ({ dropdownId, user, arrowVariant = "" }) => (
  <ul className="dropdown-menu logged-in-menu" aria-labelledby={dropdownId}>
    <div className="arrow-container">
      <div className={`arrow dropped ${arrowVariant}`} />
    </div>
    <li>
      <Link href="/user/account" className="no-decoration">
        <i className="fa fa-user-o icon" aria-hidden="true" />
        {user?.user_metadata?.full_name || user?.email}
      </Link>
    </li>
    <li>
      <form action="/logout" method="post" name="logout-form" id="logout-form">
        <button
          type="submit"
          className="btn custom-button white stretch-width no-border"
        >
          <i className="fa fa-power-off" aria-hidden="true" /> Logout
        </button>
      </form>
    </li>
  </ul>
);

const NavLinks = ({ className = "", navLinks = NAV_LINKS }) => (
  <ul className={`menu-list section ${className}`}>
    {navLinks.map(({ href, icon, label, active }) => (
      <li
        key={href}
        className={`submenu-item with-link with-pre-icon${active ? " active" : ""}`}
      >
        <Link href={href} className="no-decoration">
          <i className={`icon fa ${icon} pre-icon`} aria-hidden="true" />
          {label}
          <i className="fa fa-angle-right icon" aria-hidden="true" />
        </Link>
      </li>
    ))}
  </ul>
);

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

const MobileMenu = ({
  isOpen,
  onClose,
  mobileAccountOpen,
  onToggleMobileAccount,
  navLinks = NAV_LINKS,
  user,
}) => (
  <nav
    id="mobile-menu"
    className={`navmenu navmenu-default navmenu-mobile navmenu-fixed-left offcanvas-md${isOpen ? " in" : ""}`}
  >
    <ul className="nav navmenu-nav">
      <li className="menu-container">
        {/* Login zone */}
        <ul id="mobile-login-zone" className="menu-list section">
          <li className="menu-header">
            <Link
              href="/"
              className="logo-container no-decoration"
              onClick={onClose}
            >
              <img
                className="photo"
                src="/assets/images/home/logo.png"
                alt=""
                title="Adventure weekends and trips, organized by local experts"
                width="38"
                height="32"
              />
            </Link>
            <button
              type="button"
              className="btn custom-button white no-border login-button"
              onClick={onToggleMobileAccount}
              aria-expanded={mobileAccountOpen}
              aria-controls="mobileAccountButton"
            >
              My account
            </button>
            <div className="menu-fold-toogle-button" onClick={onClose}>
              <i className="fa fa-times fold-icon" aria-hidden="true" />
              <i className="fa fa-bars unfold-icon" aria-hidden="true" />
            </div>
          </li>
          {mobileAccountOpen && (
            <li id="mobileAccountButton">
              <ul className="logged-in-menu" aria-labelledby="">
                <div className="arrow-container">
                  <div className="arrow dropped" />
                </div>
                <li>
                  <Link
                    href="/user/account"
                    className="no-decoration"
                    onClick={onClose}
                  >
                    <i className="fa fa-user-o icon" aria-hidden="true" />{" "}
                    {user?.user_metadata?.full_name || user?.email}
                  </Link>
                </li>
                <li>
                  <form action="/logout" method="post">
                    <button
                      type="submit"
                      className="btn custom-button white stretch-width no-border"
                    >
                      <i className="fa fa-power-off" aria-hidden="true" />{" "}
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </li>
          )}
        </ul>

        {/* Nav links */}
        <NavLinks navLinks={navLinks} />
      </li>
    </ul>

    {/* Our stays section */}
  </nav>
);

// ─── Main Top Nav ─────────────────────────────────────────────────────────────

const MainNav = ({
  staysMenuOpen,
  onToggleStaysMenu,
  userMenuOpen,
  onToggleUserMenu,
  user,
}) => {
  // Split sports into 4 columns
  const columns = [[], [], [], []];
  SPORTS.forEach((sport, i) => columns[i % 4].push(sport));

  return (
    <nav
      id="main-menu"
      className="navbar navbar-default front white top-bar"
      role="navigation"
    >
      <div className="navbar-container full-page">
        {/* Logo */}
        <div className="logo-container">
          <Link href="/" className="no-decoration">
            <div className="full-logo">
              <img
                src="/assets/images/home/logo.png"
                id="white-logo"
                alt="Kazaden"
                width="203"
                height="28"
              />
              <img
                src="/assets/images/home/logo.png"
                id="blue-logo"
                alt="Kazaden"
                width="203"
                height="28"
              />
            </div>
            <div className="picto-logo">
              <img
                src="/assets/picto_logo_yellow-de20b1577dea226a55ad8742836fa81e.svg"
                alt="Kazaden logo"
                width="38"
                height="32"
              />
            </div>
          </Link>
        </div>

        {/* Menu items */}
        <div className="menu-items-container hidden-xs hidden-sm">
          <div className="menu-link-items">
            {/* Our stays dropdown */}
            <div className="menu-large">
              <div className="arrow-container">
                <div className="arrow" />
              </div>
              <div
                className="menu-title menu-cat"
                data-target="sub-menu-0"
                onClick={onToggleStaysMenu}
              >
                Our stays
              </div>
              {staysMenuOpen && (
                <div className="sub-menu-large">
                  <div id="sub-menu-1" className="sub-sub-menu-large">
                    <div className="sub-menu-cols-zone">
                      {columns.map((col, colIdx) => (
                        <div key={colIdx} className="col-zone">
                          {col.map(({ href, label }) => (
                            <div key={href} className="sport-menu-item">
                              <Link
                                href={href}
                                className="no-decoration sport-link"
                              >
                                {label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right-side buttons */}
          <div className="menu-button-items">
            {/* Phone */}
            <div className="menu-large">
              <div className="menu-title tel-zone">
                <i className="fa fa-phone icon" aria-hidden="true" />
                01 79 75 71 72
              </div>
            </div>

            {/* User dropdown */}
            <div className="menu-large">
              <div id="login-zone" className="menu-title login-zone">
                <button
                  id="loggedInMenuDrop"
                  className="btn custom-button negative-blue no-border"
                  type="button"
                  onClick={onToggleUserMenu}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  <div className="portrait small">
                    <div className="generic-portrait ROLE_USER_STANDARD">
                      {user?.user_metadata?.full_name
                        ?.substring(0, 2)
                        .toUpperCase() ||
                        user?.email?.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </button>
                {userMenuOpen && (
                  <LoggedInMenu
                    dropdownId="loggedInMenuDrop"
                    user={user}
                    arrowVariant="icon-only"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ─── Client Side Nav ──────────────────────────────────────────────────────────

const ClientNav = ({ onOpenMobileMenu, navLinks = NAV_LINKS }) => (
  <nav
    id="main-menu-client"
    className="navmenu navmenu-default navmenu-left white client"
  >
    <div id="navbar-container" className="navbar-container">
      {/* Hamburger */}
      <div
        id="nav-icon-container"
        className="pull-left"
        onClick={onOpenMobileMenu}
      >
        <div id="nav-icon">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Logo */}
      <div className="logo-container">
        <Link href="/" className="no-decoration">
          <div className="full-logo">
            <img
              src="/assets/logo-no-baseline-blue-abc3847e7a269ad6eb2fe448ac7640a1.svg"
              id="blue-logo"
              alt="Kazaden"
              width="203"
              height="28"
            />
          </div>
          <div className="picto-logo">
            <img
              src="/assets/picto_logo_yellow_32px.png"
              alt="Kazaden logo"
              width="38"
              height="32"
            />
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <ul className="nav navmenu-nav">
        <li className="menu-container">
          <ul className="menu-list">
            {navLinks.map(({ href, icon, label, active }, idx) => (
              <li
                key={href}
                className={`submenu-item with-link with-pre-icon${active ? " active" : ""}`}
              >
                <Link href={href} className="no-decoration">
                  <i
                    className={`icon fa ${icon} pre-icon`}
                    aria-hidden="true"
                  />
                  <span className="navmenu-link-label">{label}</span>
                  <i
                    className="fa fa-angle-right icon submenu-link-icon"
                    aria-hidden="true"
                  />
                </Link>
                <ul
                  className="nested-menu-list collapse"
                  id={`nested-menu-list-${idx}`}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  </nav>
);

// ─── Root Component ───────────────────────────────────────────────────────────

const UserHeader = ({ user }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [staysMenuOpen, setStaysMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Update NAV_LINKS active status based on current pathname
  const updatedNavLinks = NAV_LINKS.map((link) => ({
    ...link,
    active: pathname === link.href,
  }));

  return (
    <header>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        mobileAccountOpen={mobileAccountOpen}
        onToggleMobileAccount={() => setMobileAccountOpen((v) => !v)}
        navLinks={updatedNavLinks}
        user={user}
      />
      <MainNav
        staysMenuOpen={staysMenuOpen}
        onToggleStaysMenu={() => setStaysMenuOpen((v) => !v)}
        userMenuOpen={userMenuOpen}
        onToggleUserMenu={() => setUserMenuOpen((v) => !v)}
        user={user}
      />
      <ClientNav
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        navLinks={updatedNavLinks}
      />
    </header>
  );
};

export default UserHeader;
