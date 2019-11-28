import React from "react";
import Link from "next/link";

import "../../styles/nav.css";

const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/signin">
            <a>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        li {
          display: inline-block;
          color: tomato;
          margin-right: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default NavBar;
