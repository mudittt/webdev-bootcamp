let today = new Date();

function Footer() {
  return (
    <footer>
      <div className="footer">
        <p>©opyright {today.getFullYear()}</p>
      </div>
    </footer>
  );
}
export default Footer;
