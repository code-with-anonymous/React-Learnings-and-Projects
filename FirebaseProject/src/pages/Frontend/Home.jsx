import React, { useEffect, useState } from "react";
import { auth } from "../../Config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import HeroSection from './HeroSection';
import Menu from './Menu';
import Services from './Services';
import Testimonial from './testimonial';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <main>
        {/* <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="text-center mt-4">Home</h1>
              {user ? (
                <>
                  <h2>Email: {user.email}</h2>
                  <h2>Uid: {user.uid}</h2>
                </>
              ) : (
                <h2 className="text-center py-3">No user is signed in</h2>
              )}
            </div>
          </div>
        </div> */}

   
      <HeroSection/>
      <Menu/>
       <div style={{ padding: '30px' }}></div>
      <Services/>
      <Testimonial/>
      
      </main>
    </div>
  );
}
