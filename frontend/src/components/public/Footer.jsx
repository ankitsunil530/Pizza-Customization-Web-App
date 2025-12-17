function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PizzaApp · Fresh & Custom Pizzas 🍕
      </div>
    </footer>
  );
}

export default Footer;
