function Footer() {
  const date = new Date();
  return (
    <footer className="mt-auto py-5 bg-dark">
      <div className="container d-flex justify-content-center">
        <span className="text-muted"><b>Zühre Tuz Ürünleri ÇANKIRI @{date.getFullYear()}</b></span>
      </div>
    </footer>
  );
}

export default Footer;
