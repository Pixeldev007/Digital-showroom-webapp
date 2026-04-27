import { useState } from "react";
import { productEditor, products } from "../data/mockData";
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  ScreenFrame,
  SectionHeader,
  Table,
  TextArea,
} from "../components/ui";
import { AdminShell, PageCanvas, ProductCardPreview, StatusBadge } from "./shared";

export function ProductsSection() {
  const [screen, setScreen] = useState<"catalog" | "editor">("catalog");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState<"table" | "grid">("table");
  const [name, setName] = useState<string>(productEditor.name);
  const [price, setPrice] = useState<string>(productEditor.price);
  const [description, setDescription] = useState<string>(productEditor.description);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Ivory");

  const visibleProducts = products.filter((product) => {
    const matchesQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" ? true : product.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Products"
          title="Catalog management that stays quick even on mobile."
          body="The list screen focuses on search, filtering, and clear stock visibility. The editor keeps product basics, images, and variants in one fast form."
        />
        <ScreenFrame
          title={screen === "catalog" ? "Product List" : "Add / Edit Product"}
          route={screen === "catalog" ? "/products" : "/products/editor"}
        >
          <AdminShell
            activeId="products"
            title="Products"
            actions={
              <div className="stack-inline">
                <Button variant={screen === "catalog" ? "secondary" : "outline"} onClick={() => setScreen("catalog")}>
                  Catalog
                </Button>
                <Button variant={screen === "editor" ? "secondary" : "outline"} onClick={() => setScreen("editor")}>
                  Product Editor
                </Button>
              </div>
            }
          >
            {screen === "catalog" ? (
              <div className="dashboard-grid dashboard-grid--catalog">
                <Card className="showroom-card">
                  <div className="showroom-toolbar">
                    <Input placeholder="Search by product name or SKU" value={query} onChange={setQuery} />
                    <div className="filter-row">
                      {["All", "Published", "Draft", "Low Stock"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          className={`chip${statusFilter === status ? " chip--active" : ""}`}
                          onClick={() => setStatusFilter(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="tabs-row showroom-tabs">
                    <button
                      type="button"
                      className={view === "table" ? "segmented__active" : ""}
                      onClick={() => setView("table")}
                    >
                      Table View
                    </button>
                    <button
                      type="button"
                      className={view === "grid" ? "segmented__active" : ""}
                      onClick={() => setView("grid")}
                    >
                      Grid View
                    </button>
                  </div>
                  {view === "table" ? (
                    <Table
                      headers={["Product", "SKU", "Price", "Stock", "Status"]}
                      rows={visibleProducts.map((product) => [
                        <div className="showroom-table-cell">
                          <div className="showroom-table-cell__thumb" />
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.tag}</span>
                          </div>
                        </div>,
                        product.sku,
                        product.price,
                        product.stock,
                        <StatusBadge status={product.status} />,
                      ])}
                    />
                  ) : (
                    <div className="product-grid product-grid--mini showroom-grid-preview">
                      {visibleProducts.map((product) => (
                        <ProductCardPreview
                          key={product.sku}
                          name={product.name}
                          price={product.price}
                          tag={product.tag}
                        />
                      ))}
                    </div>
                  )}
                </Card>
                <Card className="showroom-card">
                  <div className="card-topline">
                    <div>
                      <strong>Catalog Snapshot</strong>
                      <span>{visibleProducts.length} visible products</span>
                    </div>
                    <Badge tone="primary">Dynamic</Badge>
                  </div>
                  <div className="product-grid product-grid--mini showroom-grid-preview">
                    {visibleProducts.slice(0, 4).map((product) => (
                      <ProductCardPreview
                        key={product.sku}
                        name={product.name}
                        price={product.price}
                        tag={product.tag}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <div className="editor-layout">
                  <Card className="showroom-card">
                    <div className="card-topline">
                      <div>
                        <strong>Product Details</strong>
                        <span>Name, price, images, and variants</span>
                      </div>
                      <StatusBadge status="Published" />
                    </div>
                    <div className="form-stack">
                      <Field label="Product name">
                        <Input value={name} onChange={setName} />
                      </Field>
                      <Field label="Price">
                        <Input value={price} onChange={setPrice} />
                      </Field>
                      <Field label="Images" hint="Drag to reorder">
                        <div className="showroom-upload-list">
                          {productEditor.images.map((image) => (
                            <div key={image} className="showroom-upload-item">
                              <div className="showroom-upload-item__thumb" />
                              <span>{image}</span>
                            </div>
                          ))}
                        </div>
                      </Field>
                      <Field label="Variants">
                        <div className="showroom-variant-grid">
                          <div>
                            <span className="showroom-field-label">Size</span>
                            <div className="filter-row">
                              {productEditor.sizes.map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  className={`chip${selectedSize === size ? " chip--active" : ""}`}
                                  onClick={() => setSelectedSize(size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="showroom-field-label">Color</span>
                            <div className="filter-row">
                              {productEditor.colors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  className={`chip${selectedColor === color ? " chip--active" : ""}`}
                                  onClick={() => setSelectedColor(color)}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Field>
                      <Field label="Description">
                        <TextArea value={description} onChange={setDescription} />
                      </Field>
                    </div>
                  </Card>
                  <div className="screen-stack">
                    <Card className="showroom-card">
                      <div className="card-topline">
                        <div>
                          <strong>Live Product Card</strong>
                          <span>{selectedSize} / {selectedColor}</span>
                        </div>
                      </div>
                      <ProductCardPreview name={name} price={price} tag="Preview" />
                    </Card>
                    <div className="modal-preview">
                      <strong>Quick edit modal</strong>
                      <p>Use this for minor stock or price changes without leaving the list screen.</p>
                      <div className="stack-inline">
                        <Button variant="outline" fullWidth>
                          Cancel
                        </Button>
                        <Button fullWidth onClick={() => setScreen("catalog")}>
                          Save
                        </Button>
                      </div>
                    </div>
                    <Card className="showroom-card">
                      <strong>Image upload state</strong>
                      <div className="skeleton-row">
                        <div className="skeleton skeleton--circle" />
                        <div className="skeleton-blocks">
                          <div className="skeleton" />
                          <div className="skeleton skeleton--short" />
                        </div>
                      </div>
                    </Card>
                    <div className="toast toast--success">Product form updates instantly as you edit.</div>
                  </div>
                </div>
                <div className="sticky-action-bar">
                  <Button variant="outline" fullWidth onClick={() => setScreen("catalog")}>
                    Back To Catalog
                  </Button>
                  <Button fullWidth>Publish Product</Button>
                </div>
              </>
            )}
          </AdminShell>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}
