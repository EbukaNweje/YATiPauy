import React, { useEffect, useState } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Check if launch date is already stored
    let storedLaunchDate = localStorage.getItem("launchDate");

    if (!storedLaunchDate) {
      const newLaunchDate = new Date();
      newLaunchDate.setDate(newLaunchDate.getDate() + 7);
      localStorage.setItem("launchDate", newLaunchDate.toISOString());
      storedLaunchDate = newLaunchDate.toISOString();
    }

    const launchDate = new Date(storedLaunchDate);

    const interval = setInterval(() => {
      const now = new Date();
      const distance = launchDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({});
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Coming Soon</h1>
        <p style={styles.subtitle}>
          We're launching something amazing in just:
        </p>
        <div style={styles.timer}>
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} style={styles.timeBox}>
              <span style={styles.timeValue}>{timeLeft[unit] ?? "00"}</span>
              <span style={styles.timeLabel}>{unit.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <p style={styles.footer}>Stay tuned. We’re almost there!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #0D2D13, #0D2D13, #0D2D13)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    maxWidth: "500px",
    width: "90%",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#ccc",
  },
  timer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
  },
  timeBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timeValue: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  timeLabel: {
    fontSize: "12px",
    marginTop: "5px",
    color: "#ccc",
  },
  footer: {
    fontSize: "16px",
    marginTop: "20px",
    color: "#ddd",
  },
};

export default ComingSoon;
