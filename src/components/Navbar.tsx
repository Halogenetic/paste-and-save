import Link from "next/link";
import React, { useEffect, useState } from "react";

type NavbarProps = {
  token: string;
  handleSignOut: () => void;
};

export const Navbar = ({ token, handleSignOut }: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(token));
  }, [token]);

  return (
    <header className="navbar">
      <Link href={"/"} className="navbar__title">
        Paste & Save
      </Link>
      {!isLoggedIn && (
        <>
          <Link href={"/"} className="navbar__item">
            Sign Up
          </Link>
          <Link href={"/signin"} className="navbar__item navbar__last">
            Sign In
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link href={"/myteams"} className="navbar__item">
            My Teams
          </Link>
          <Link href={"/createteam"} className="navbar__item">
            Create A Team
          </Link>
          <Link
            href={"/"}
            className="navbar__item navbar__last"
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        </>
      )}
    </header>
  );
};
