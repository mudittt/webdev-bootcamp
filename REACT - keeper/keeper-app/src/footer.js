let today = new Date();

function Footer() {
  return (
    <div className="footer">
      <p>©opyright {today.getFullYear()}</p>
    </div>
  );
}
export default Footer;
