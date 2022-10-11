import React from "react";
function Footer() {
    let today = new Date();
  return (
    <div className="footer">
      <p>©opyright {today.getFullYear()}</p>
    </div>
  );
}
export default Footer;