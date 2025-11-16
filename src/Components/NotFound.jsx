// import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>404</h1>
          <p style={styles.subtitle}>
            Oops! The page you're looking for doesn't exist.
          </p>
          <button style={styles.button} onClick={() => navigate("/")}>
            Go Back Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#0D2D13",
    fontFamily: "Arial, sans-serif",
  },

  wrapper: {
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "72px",
    color: "#dc3545",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#0D2D13",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default NotFound;
