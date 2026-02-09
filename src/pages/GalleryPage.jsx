import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./GalleryPageStyle.css";
import { Image } from "antd";
import { GalleryImages } from "../Components/Data";

const GalleryPage = () => {
  return (
    <div className="GalleryPageBody">
      <Header />
      <div className="GalleryPageContainer">
        <section className="gallery-section">
          <header className="GalleryPageHeader">
            <h1>Gallery and Community Hub</h1>
          </header>
          <p className="GalleryPageDescription">Welcome to our Impact Hub</p>
          <p className="GalleryPageContent">
            This is where our mission comes to life. Explore our gallery to
            witness the real-world difference we are making together through
            YatiCare's humanitarian initiatives. Here, you can also access and
            download a curated collection of marketing materials, including
            brochures and fact sheets, to help you share the YatiCare story
            accurately and powerfully. This hub is your window into our
            collective impact and your toolkit for empowering your community.
          </p>
        </section>

        <section className="media-resources-section">
          {GalleryImages.map((image, index) => (
            <Image key={index} width={200} src={image} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
