import React from 'react'
import backgroundImage from "../../assets/bg-hero.jpg";
import Menu from './Menu';


function LayoutMenu() {
  return (
    <main>
       <div
        className="contact-section"
        style={styles.headerSection}
      >
        <div style={styles.overlay}>
          <h2 style={styles.headerText}>Food Menu</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={styles.breadcrumb}>
              <li className="breadcrumb-item">
                <a href="#" style={styles.breadcrumbLink}>
                  Home /
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" style={styles.breadcrumbLink}>
                  Pages /
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={styles.activeBreadcrumb}>
                Food Menu
              </li>
            </ol>
          </nav>
        </div>
      </div>
        <Menu/>
    </main>
  )
}

export default LayoutMenu

const styles = {
    headerSection: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "60vh",
      color: "#fff",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    headerText: {
      fontSize: "3rem",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    breadcrumb: {
      backgroundColor: "transparent",
      padding: "10px 20px",
      borderRadius: "5px",
      fontSize: "1.2rem",
    },
    breadcrumbLink: {
      color: "#FFA500",
      textDecoration: "none",
    },
    activeBreadcrumb: {
      color: "#fff",
    },
    
  };