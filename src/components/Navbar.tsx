import Link from "next/link";
import React from "react";

type NavbarProps = {
  token: string;
  handleSignOut: () => void;
};

export const Navbar = ({ token, handleSignOut }: NavbarProps) => {
  return (
    <header className='navbar'>
      <Link href={"/"} className='navbar__title'>Paste Save</Link>
      {!token && <Link href={"/"} className='navbar__item'>Sign Up</Link>}
      {!token && <Link href={"/signin"} className='navbar__item navbar__last'>Sign In</Link>}
      {token && (
        <Link href={"/"} className='navbar__item navbar__last' onClick={handleSignOut}>
          Sign Out
        </Link>
      )}
    </header>
  );
};