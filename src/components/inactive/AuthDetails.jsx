import React, { useEffect, useState } from 'react';
import { logOut } from '../../firebase';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';

export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user ? user : null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userSignOut = () => {
    logOut()
      .then(() => {
        console.log("Logout successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
