import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import NavBar from "@/components/shared/NavBar";
import React from "react";

const ImageCredit = () => {
  return (
    <>
      <Header />
      <section className="max-w-3xl p-5 md:px-10 lg:mx-24 lg:my-16">
        <h1 className="mb-4">Credit for Images</h1>
        <p>
          I got the graphics that I used for this site free from
          www.flaticon.com. In order to use them, I have to provide the source
          of the images. Below is a list of the sources for the images that I
          used throughout the site:
        </p>
        <div className="mt-4">
          <h3>Smiling Calculator:</h3>
          <p className="mb-3">
            <a
              href="https://www.flaticon.com/free-stickers/people"
              title="people stickers"
            >
              People stickers created by Stickers - Flaticon
            </a>
          </p>

          <h3>Satisfied Person Image:</h3>
          <p className="mb-3">
            <a
              href="https://www.flaticon.com/free-icons/satisfaction"
              title="satisfaction icons"
            >
              Satisfaction icons created by Freepik - Flaticon
            </a>
          </p>
          <h3>Landing Page Background Image:</h3>
          <p className="mb-3">
            <a href="https://www.vecteezy.com/free-photos/landing-page-background">
              Landing Page Background Stock photos by Vecteezy
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ImageCredit;
