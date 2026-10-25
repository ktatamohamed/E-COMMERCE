import { useMemo, useState, type FormEvent } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  label?: string;
  color: string;
};

const categories = ["Tout", "Maison", "Mode", "Accessoires"];

const products: Product[] = [
  {
    id: 1,
    name: "Vase Sable",
    category: "Maison",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85",
    label: "Nouveau",
    color: "sable",
  },
  {
    id: 2,
    name: "Sac Épure",
    category: "Mode",
    price: 64,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    color: "rose",
  },
  {
    id: 3,
    name: "Lampe Halo",
    category: "Maison",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    label: "Bestseller",
    color: "beige",
  },
  {
    id: 4,
    name: "Lunettes Sol",
    category: "Accessoires",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    color: "bleu",
  },
  {
    id: 5,
    name: "Tasse Nuage",
    category: "Maison",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    color: "vert",
  },
  {
    id: 6,
    name: "Chemise Lino",
    category: "Mode",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    label: "Édition limitée",
    color: "jaune",
  },
  {
    id: 7,
    name: "Bougie Cèdre",
    category: "Maison",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    color: "orange",
  },
  {
    id: 8,
    name: "Montre Minuit",
    category: "Accessoires",
    price: 118,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    color: "gris",
  },
  {
    id: 9,
    name: "Plaid Aurore",
    category: "Maison",
    price: 58,
    image:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=900&q=85",
    label: "Nouveau",
    color: "orange",
  },
  {
    id: 10,
    name: "Pendentif Lune",
    category: "Accessoires",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
    color: "jaune",
  },
  {
    id: 11,
    name: "Fauteuil Noma",
    category: "Maison",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85",
    color: "beige",
  },
  {
    id: 12,
    name: "Baskets Alba",
    category: "Mode",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    label: "Coup de cœur",
    color: "rose",
  },
  {
    id: 13,
    name: "Carnet Atelier",
    category: "Accessoires",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85",
    color: "vert",
  },
  {
    id: 14,
    name: "Miroir Arco",
    category: "Maison",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    color: "gris",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

export default function App() {
  const [category, setCategory] = useState("Tout");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [formMode, setFormMode] = useState<"order" | "reservation" | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formConfirmation, setFormConfirmation] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fr");

    return products.filter((product) => {
      const matchesCategory =
        category === "Tout" || product.category === category;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLocaleLowerCase("fr").includes(normalizedSearch) ||
        product.category.toLocaleLowerCase("fr").includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );
  const cartTotal = products.reduce(
    (total, product) => total + product.price * (cart[product.id] ?? 0),
    0,
  );

  function addToCart(productId: number) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }));
  }

  function openReservation(product: Product) {
    setSelectedProduct(product);
    setFormConfirmation("");
    setFormMode("reservation");
  }

  function openOrderForm() {
    setFormConfirmation("");
    setFormMode("order");
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formMode === "reservation" && selectedProduct) {
      setFormConfirmation(
        `Votre demande de réservation pour ${selectedProduct.name} est prête. Cette démonstration ne l'envoie pas à une boutique.`,
      );
    } else if (formMode === "order") {
      setFormConfirmation(
        "Votre récapitulatif de commande est prêt. Aucun paiement ni envoi de commande n'est effectué dans cette démonstration.",
      );
      setCart({});
    }
  }

  function closeRequestForm() {
    setFormMode(null);
    setSelectedProduct(null);
    setFormConfirmation("");
  }

  function changeQuantity(productId: number, change: number) {
    setCart((currentCart) => {
      const quantity = (currentCart[productId] ?? 0) + change;

      if (quantity <= 0) {
        const nextCart = { ...currentCart };
        delete nextCart[productId];
        return nextCart;
      }

      return { ...currentCart, [productId]: quantity };
    });
  }

  return (
    <div className="store">
      <div className="announcement">
        Livraison offerte dès 80 € d'achat <span aria-hidden="true">✳</span>{" "}
        Retours gratuits sous 30 jours
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Atelier, accueil">
          atelier<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Navigation principale">
          <a href="#collection">La sélection</a>
          <a href="#histoire">Notre histoire</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>
            <span className="visually-hidden">Rechercher un produit</span>
            <input
              type="search"
              placeholder="Rechercher"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <button
            className="cart-button"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Ouvrir le panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
          >
            Panier <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Des objets faits pour durer</p>
            <h1 id="hero-title">
              Le beau
              <br />
              du quotidien.
            </h1>
            <p className="hero-copy">
              Des essentiels choisis avec soin, pour une vie plus simple et
              plus belle.
            </p>
            <a className="button button-dark" href="#collection">
              Découvrir la sélection <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-note">
              <span className="note-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span>4,9/5 · aimé par notre communauté</span>
            </div>
          </div>
          <div
            className="hero-image"
            role="img"
            aria-label="Intérieur lumineux aux tons naturels"
          >
            <div className="hero-image-caption">
              <span>La maison, autrement</span>
              <span>01 / 03</span>
            </div>
          </div>
          <span className="hero-stamp" aria-hidden="true">
            FAIT AVEC
            <br />
            INTENTION
          </span>
        </section>

        <section className="benefits" aria-label="Nos engagements">
          <p>
            <span aria-hidden="true">✳</span> Une sélection responsable
          </p>
          <p>
            <span aria-hidden="true">↗</span> Livraison offerte dès 80 €
          </p>
          <p>
            <span aria-hidden="true">♡</span> Retours gratuits sous 30 jours
          </p>
        </section>

        <section className="collection section-wrap" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Choisis pour vous</p>
              <h2>La sélection du moment</h2>
            </div>
            <a className="text-link" href="#collection">
              Voir toute la sélection <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="filters" role="group" aria-label="Filtrer par catégorie">
            {categories.map((item) => (
              <button
                className={`filter-button${category === item ? " is-active" : ""}`}
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-image ${product.color}`}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.label && (
                      <span className="product-label">{product.label}</span>
                    )}
                    <button
                      className="quick-add"
                      type="button"
                      onClick={() => addToCart(product.id)}
                      aria-label={`Ajouter ${product.name} au panier`}
                    >
                      +
                    </button>
                  </div>
                  <div className="product-details">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                    </div>
                    <span className="product-price">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    className="reserve-button"
                    type="button"
                    onClick={() => openReservation(product)}
                  >
                    Réserver cet article
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-results">
              Aucun article ne correspond à votre recherche.
            </p>
          )}
        </section>

        <section className="story" id="histoire">
          <div className="story-image" role="img" aria-label="Atelier de création" />
          <div className="story-content">
            <p className="eyebrow">Moins, mais mieux</p>
            <h2>Des choix qui ont du sens.</h2>
            <p>
              Nous croyons aux objets bien pensés, aux matières honnêtes et aux
              belles choses que l'on garde longtemps. Chaque pièce est choisie
              pour trouver naturellement sa place chez vous.
            </p>
            <a className="text-link" href="#collection">
              En savoir plus sur Atelier <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#" aria-label="Atelier, accueil">
          atelier<span>.</span>
        </a>
        <p>De belles choses, simplement.</p>
        <span>© 2026 Atelier. Tous droits réservés.</span>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Votre panier"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">Votre sélection</p>
                <h2>Le panier ({cartCount})</h2>
              </div>
              <button
                className="close-button"
                type="button"
                aria-label="Fermer le panier"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>
            {cartCount > 0 ? (
              <>
                <div className="cart-items">
                  {products
                    .filter((product) => cart[product.id])
                    .map((product) => (
                      <div className="cart-item" key={product.id}>
                        <img src={product.image} alt="" />
                        <div className="cart-item-info">
                          <h3>{product.name}</h3>
                          <p>{formatPrice(product.price)}</p>
                          <div className="quantity-control">
                            <button
                              type="button"
                              aria-label={`Retirer un ${product.name}`}
                              onClick={() => changeQuantity(product.id, -1)}
                            >
                              −
                            </button>
                            <span>{cart[product.id]}</span>
                            <button
                              type="button"
                              aria-label={`Ajouter un ${product.name}`}
                              onClick={() => changeQuantity(product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="cart-summary">
                  <div>
                    <span>Sous-total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <p>
                    {cartTotal >= 80
                      ? "La livraison est offerte pour cette commande."
                      : `Plus que ${formatPrice(80 - cartTotal)} pour profiter de la livraison offerte.`}
                  </p>
                  <button
                    className="button button-dark checkout-button"
                    type="button"
                    onClick={openOrderForm}
                  >
                    Commander <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span aria-hidden="true">♡</span>
                <p>Votre panier attend ses premiers coups de cœur.</p>
                <button
                  className="button button-dark"
                  type="button"
                  onClick={() => setCartOpen(false)}
                >
                  Découvrir la sélection
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {formMode && (
        <div className="cart-overlay request-overlay" onClick={closeRequestForm}>
          <section
            className="request-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">
                  {formMode === "order" ? "Dernière étape" : "Un coup de cœur"}
                </p>
                <h2 id="request-title">
                  {formConfirmation
                    ? "Merci !"
                    : formMode === "order"
                      ? "Votre commande"
                      : "Réserver un article"}
                </h2>
              </div>
              <button
                className="close-button"
                type="button"
                aria-label="Fermer"
                onClick={closeRequestForm}
              >
                ×
              </button>
            </div>
            {formConfirmation ? (
              <div className="request-confirmation" role="status">
                <span aria-hidden="true">✓</span>
                <p>{formConfirmation}</p>
                <button
                  className="button button-dark"
                  type="button"
                  onClick={closeRequestForm}
                >
                  Continuer la visite
                </button>
              </div>
            ) : (
              <form className="request-form" onSubmit={submitRequest}>
                <p className="request-summary">
                  {formMode === "order"
                    ? `${cartCount} article${cartCount > 1 ? "s" : ""} · ${formatPrice(cartTotal)}`
                    : `${selectedProduct?.name ?? ""} · ${selectedProduct ? formatPrice(selectedProduct.price) : ""}`}
                </p>
                <label>
                  Nom complet
                  <input
                    autoComplete="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                  />
                </label>
                <label>
                  Adresse e-mail
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="vous@exemple.fr"
                    required
                    type="email"
                  />
                </label>
                {formMode === "order" && (
                  <label>
                    Adresse de livraison
                    <input
                      autoComplete="street-address"
                      name="address"
                      placeholder="Numéro et rue"
                      required
                    />
                  </label>
                )}
                <p className="demo-notice">
                  Démonstration : aucune donnée n'est envoyée et aucun paiement
                  réel n'est effectué.
                </p>
                <button className="button button-dark checkout-button" type="submit">
                  {formMode === "order"
                    ? "Confirmer la demande de commande"
                    : "Confirmer la réservation"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
