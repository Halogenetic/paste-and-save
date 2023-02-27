import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className='navbar'>
      <Link href={"/"} className='navbar__title'>Paste Save</Link>
      <Link href={"/"} className='navbar__item'>Sign Up</Link>
      <Link href={"/signin"} className='navbar__item navbar__last'>Sign In</Link>
    </header>
  );
};
