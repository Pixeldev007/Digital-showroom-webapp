import { useState } from "react";
import {
  cartItems,
  paymentMethods,
  productEditor,
  storefrontCategories,
  storefrontProducts,
} from "../data/mockData";
import { Button, Field, Input, ScreenFrame, SectionHeader, TextArea } from "../components/ui";
import { PageCanvas, ProductCardPreview, StorefrontPreview } from "./shared";

export function StorefrontSection() {
  const [preview, setPreview] = useState<"home" | "listing" | "pdp" | "cart" | "checkout" | "success">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("Women");
  const [selectedPayment, setSelectedPayment] = useState<string>("UPI");
  const [mobile, setMobile] = useState<string>("+91 98765 43210");
  const [address, setAddress] = useState<string>("B-208, Lakeview Residency, Pune 411045");

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Storefront"
          title="A user-side journey that keeps browsing, cart, and checkout fast on mobile."
          body="The storefront is intentionally simple: a strong homepage, clear product discovery, a direct PDP, and a friction-light checkout sequence."
        />
        <ScreenFrame title="Storefront Preview" route="/storefront">
          <div className="filter-row showroom-preview-nav">
            {[
              ["home", "Homepage"],
              ["listing", "Listing"],
              ["pdp", "PDP"],
              ["cart", "Cart"],
              ["checkout", "Checkout"],
              ["success", "Success"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`chip${preview === key ? " chip--active" : ""}`}
                onClick={() => setPreview(key as typeof preview)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="screen-grid screen-grid--three showroom-phone-gallery">
            <StorefrontPreview title="Live Mobile Screen">
              {preview === "home" ? (
                <div className="store-mobile">
                  <div className="announcement-bar">Free shipping above Rs 999</div>
                  <div className="store-mobile__header">Digital Showroom</div>
                  <div className="store-mobile__banner" />
                  <div className="pill-row">
                    {storefrontCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={selectedCategory === category ? "pill-row__active" : ""}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="product-grid product-grid--mini">
                    {storefrontProducts.slice(0, 4).map((product) => (
                      <ProductCardPreview
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        tag={product.tag}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {preview === "listing" ? (
                <div className="store-mobile">
                  <div className="store-mobile__header">{selectedCategory} / New Arrivals</div>
                  <div className="filter-row">
                    <span className="chip chip--active">All</span>
                    <span className="chip">Under Rs 2K</span>
                    <span className="chip">Ready to ship</span>
                  </div>
                  <div className="product-grid product-grid--mini">
                    {storefrontProducts.map((product) => (
                      <ProductCardPreview
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        tag={product.tag}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {preview === "pdp" ? (
                <div className="store-mobile">
                  <div className="pdp-gallery" />
                  <strong>{productEditor.name}</strong>
                  <span className="price-lg">{productEditor.price}</span>
                  <div className="filter-row">
                    <span className="chip chip--active">M</span>
                    <span className="chip">L</span>
                    <span className="chip">XL</span>
                  </div>
                  <div className="sticky-action-bar sticky-action-bar--column">
                    <Button fullWidth onClick={() => setPreview("cart")}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ) : null}

              {preview === "cart" ? (
                <div className="store-mobile">
                  <div className="store-mobile__header">Your Cart</div>
                  <div className="showroom-cart-list">
                    {cartItems.map((item) => (
                      <div key={item.name} className="order-item">
                        <div className="order-item__thumb" />
                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.meta}</span>
                        </div>
                        <strong>{item.amount}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="sticky-action-bar sticky-action-bar--column">
                    <Button fullWidth onClick={() => setPreview("checkout")}>
                      Checkout
                    </Button>
                  </div>
                </div>
              ) : null}

              {preview === "checkout" ? (
                <div className="store-mobile">
                  <div className="store-mobile__header">Checkout</div>
                  <div className="form-stack">
                    <Field label="Mobile number">
                      <Input value={mobile} onChange={setMobile} />
                    </Field>
                    <Field label="Delivery address">
                      <TextArea value={address} onChange={setAddress} />
                    </Field>
                    <Field label="Payment method">
                      <div className="payment-options">
                        {paymentMethods.map((method) => (
                          <button
                            key={method}
                            type="button"
                            className={`chip${selectedPayment === method ? " chip--active" : ""}`}
                            onClick={() => setSelectedPayment(method)}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>
                  <div className="sticky-action-bar sticky-action-bar--column">
                    <Button fullWidth onClick={() => setPreview("success")}>
                      Place Order
                    </Button>
                  </div>
                </div>
              ) : null}

              {preview === "success" ? (
                <div className="success-screen">
                  <div className="success-icon brand-mark">OK</div>
                  <h3>Order confirmed</h3>
                  <p>Payment via {selectedPayment}. Tracking details will be sent by SMS and WhatsApp.</p>
                  <Button onClick={() => setPreview("home")}>Continue Shopping</Button>
                </div>
              ) : null}
            </StorefrontPreview>
            <StorefrontPreview title="Browse Reference">
              <div className="store-mobile">
                <div className="store-mobile__header">Focused flow</div>
                <div className="info-list">
                  <div>
                    <span>Current step</span>
                    <strong>{preview}</strong>
                  </div>
                  <div>
                    <span>Selected category</span>
                    <strong>{selectedCategory}</strong>
                  </div>
                  <div>
                    <span>Payment choice</span>
                    <strong>{selectedPayment}</strong>
                  </div>
                </div>
              </div>
            </StorefrontPreview>
          </div>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}
