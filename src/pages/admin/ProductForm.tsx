/**
 * Create and edit a product — one form serving /admin/products/new and
 * /admin/products/:id/edit.
 *
 * The form covers every field the storefront actually renders. A short form
 * here is what leaves blank sections on the product page: the gallery, colour
 * swatches, storage options, spec table, in-box list and warranty text are all
 * read by `pages/Product.tsx`, so all of them need a control.
 *
 * There is no backend, so Save validates and reports what it would write.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Plus, Save, Trash2, TriangleAlert, ExternalLink } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Detail,
  Field,
  Note,
  Pill,
  SectionCard,
  Select,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import { ops, suppliers } from "@/data/admin/inventory";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Smartphones", slug: "smartphones" },
  { label: "Tablets", slug: "tablets" },
  { label: "Accessories", slug: "accessories" },
  { label: "Audio", slug: "audio" },
  { label: "Gaming", slug: "gaming" },
];

const badgeTones = ["none", "promo", "primary", "success", "warning"] as const;
const tiers = ["Flagship", "Foldable", "Mid-Range", "Budget"];
const useTags = ["camera", "gaming", "battery", "value"];

/** Comma-separated text in the form, arrays in the data. */
const toList = (s: string) => s.split(",").map((v) => v.trim()).filter(Boolean);
const fromList = (a?: string[]) => (a ?? []).join(", ");

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = getProduct(id);
  const isEdit = Boolean(id);
  const o = id ? ops[id] : undefined;

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(existing?.name ?? "");
  const [brand, setBrand] = useState(existing?.brand ?? "");
  const [categorySlug, setCategorySlug] = useState(existing?.categorySlug ?? "smartphones");
  const [tagline, setTagline] = useState(existing?.tagline ?? "");
  const [price, setPrice] = useState(existing ? String(existing.price) : "");
  const [oldPrice, setOldPrice] = useState(existing?.oldPrice ? String(existing.oldPrice) : "");
  const [badgeLabel, setBadgeLabel] = useState(existing?.badge?.label ?? "");
  const [badgeTone, setBadgeTone] = useState<string>(existing?.badge?.tone ?? "none");

  const [sku, setSku] = useState(o?.sku ?? "");
  const [cost, setCost] = useState(o ? String(o.cost) : "");
  const [onHand, setOnHand] = useState(o ? String(o.onHand) : "0");
  const [lowAt, setLowAt] = useState(o ? String(o.lowAt) : "5");
  const [status, setStatus] = useState(o?.status ?? "draft");
  const [supplier, setSupplier] = useState(o?.supplier ?? suppliers[0]);

  const [colors, setColors] = useState(existing?.colors ?? []);
  const [storageOptions, setStorageOptions] = useState(fromList(existing?.storageOptions));
  const [inBox, setInBox] = useState(fromList(existing?.inBox));
  const [warranty, setWarranty] = useState(existing?.warranty ?? "");

  const isPhone = categorySlug === "smartphones";
  const [tier, setTier] = useState(existing?.sub ?? "Flagship");
  const [storage, setStorage] = useState(existing?.storage ?? "");
  const [ram, setRam] = useState(existing?.ram ?? "");
  const [screen, setScreen] = useState(existing?.screen ? String(existing.screen) : "");
  const [battery, setBattery] = useState(existing?.battery ? String(existing.battery) : "");
  const [camera, setCamera] = useState(existing?.camera ? String(existing.camera) : "");
  const [fiveG, setFiveG] = useState(existing?.fiveG ?? true);
  const [uses, setUses] = useState<string[]>(existing?.uses ?? []);

  const [specGroups, setSpecGroups] = useState(
    existing?.extraSpecs?.map((g) => ({ group: g.group, rows: g.rows.map(([k, v]) => ({ k, v })) })) ?? [],
  );

  useEffect(() => {
    if (isEdit && !existing) navigate("/admin/products", { replace: true });
  }, [isEdit, existing, navigate]);

  const margin = useMemo(() => {
    const p = Number(price);
    const c = Number(cost);
    if (!p || !c) return null;
    return Math.round(((p - c) / p) * 100);
  }, [price, cost]);

  const discount = useMemo(() => {
    const p = Number(price);
    const op = Number(oldPrice);
    if (!p || !op || op <= p) return null;
    return Math.round(((op - p) / op) * 100);
  }, [price, oldPrice]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);

    if (!name.trim()) return setError("Give the product a name — it is what customers search on.");
    if (!brand.trim()) return setError("Pick a brand. The brand pages are built from this field.");
    if (!Number(price)) return setError("Set a price above zero.");
    if (Number(oldPrice) && Number(oldPrice) <= Number(price)) {
      return setError("The old price must be higher than the price, or the saving reads as negative.");
    }
    if (!tagline.trim()) return setError("Write a tagline — it is the first line on the product page.");
    if (toList(inBox).length === 0) return setError("List what is in the box. The product page renders this as a list.");
    if (!warranty.trim()) return setError("Add a warranty statement — every product on the site carries one.");

    setError("");
    setSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addColor = () => setColors((c) => [...c, { name: "", hex: "#cccccc" }]);
  const addSpecGroup = () => setSpecGroups((g) => [...g, { group: "", rows: [{ k: "", v: "" }] }]);

  return (
    <AdminPage
      title={isEdit ? "Edit product" : "New product"}
      subtitle={isEdit ? `${existing?.name} · ${o?.sku}` : "Everything the product page renders comes from this form"}
      breadcrumb={[{ label: "Products", to: "/admin/products" }]}
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/admin/products">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          {isEdit && (
            <Button asChild variant="ghost">
              <Link to={`/product/${id}`}>
                <ExternalLink className="h-4 w-4" /> View live
              </Link>
            </Button>
          )}
        </>
      }
    >
      {saved && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <Check className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>{name}</strong> has been {isEdit ? "updated" : "created"} and the stock figures are written to
            inventory.
          </span>
        </div>
      )}

      {error && (
        <div role="alert" className="mb-5 flex items-start gap-2.5 rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={save} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="space-y-5">
          {/* Identity */}
          <SectionCard title="Identity" desc="How the product is named and filed across the shop">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product name" className="sm:col-span-2" hint="Include the storage size, the way the catalog already does.">
                <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Apple iPhone 17 Pro Max 256GB" />
              </Field>

              <Field label="Brand">
                <TextInput value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Apple" list="brand-list" />
                <datalist id="brand-list">
                  {[...new Set(allProducts.map((p) => p.brand))].map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </Field>

              <Field label="Category">
                <Select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Tagline" className="sm:col-span-2" hint="One sentence, shown under the product title.">
                <TextArea
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Heat-forged aluminium unibody, the A19 Pro chip, and a 48MP Fusion camera system."
                />
              </Field>
            </div>
          </SectionCard>

          {/* Pricing */}
          <SectionCard title="Pricing and stock" desc="Price is what customers pay; cost stays internal">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Price (LKR)">
                <TextInput type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="429000" />
              </Field>
              <Field label="Old price (LKR)" hint={discount ? `Shows as ${discount}% off` : "Leave blank if not discounted"}>
                <TextInput type="number" min="0" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="469900" />
              </Field>
              <Field label="Unit cost (LKR)" hint={margin !== null ? `${margin}% margin` : "Never shown to customers"}>
                <TextInput type="number" min="0" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="377520" />
              </Field>
              <Field label="SKU">
                <TextInput value={sku} onChange={(e) => setSku(e.target.value)} placeholder="NX-APP-SM-4821" className="font-mono" />
              </Field>
              <Field label="Units on hand">
                <TextInput type="number" min="0" value={onHand} onChange={(e) => setOnHand(e.target.value)} />
              </Field>
              <Field label="Low-stock alert at">
                <TextInput type="number" min="0" value={lowAt} onChange={(e) => setLowAt(e.target.value)} />
              </Field>
              <Field label="Supplier" className="sm:col-span-2">
                <Select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                  {suppliers.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Publish status">
                <Select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </Field>
            </div>
          </SectionCard>

          {/* Variants */}
          <SectionCard
            title="Variants"
            desc="Colour swatches and storage options shown on the product page"
            actions={
              <Button type="button" size="sm" variant="outline" onClick={addColor}>
                <Plus className="h-3.5 w-3.5" /> Colour
              </Button>
            }
          >
            <Field label="Storage options" hint="Comma separated, e.g. 256GB, 512GB, 1TB">
              <TextInput value={storageOptions} onChange={(e) => setStorageOptions(e.target.value)} placeholder="256GB, 512GB, 1TB" />
            </Field>

            <div className="mt-4 space-y-2">
              {colors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No colours added. The product page will show a single default.</p>
              ) : (
                colors.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={c.hex}
                      onChange={(e) =>
                        setColors((prev) => prev.map((x, i) => (i === idx ? { ...x, hex: e.target.value } : x)))
                      }
                      aria-label={`Colour ${idx + 1} swatch`}
                      className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-border bg-surface p-1"
                    />
                    <TextInput
                      value={c.name}
                      onChange={(e) =>
                        setColors((prev) => prev.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))
                      }
                      placeholder="Cosmic Orange"
                      aria-label={`Colour ${idx + 1} name`}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setColors((prev) => prev.filter((_, i) => i !== idx))}
                      aria-label="Remove colour"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </SectionCard>

          {/* Specs */}
          {isPhone ? (
            <SectionCard title="Phone specifications" desc="These build the spec table and drive the comparison page">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Tier">
                  <Select value={tier} onChange={(e) => setTier(e.target.value)}>
                    {tiers.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Storage">
                  <TextInput value={storage} onChange={(e) => setStorage(e.target.value)} placeholder="256GB" />
                </Field>
                <Field label="RAM">
                  <TextInput value={ram} onChange={(e) => setRam(e.target.value)} placeholder="12GB" />
                </Field>
                <Field label="Screen (inches)">
                  <TextInput type="number" step="0.1" value={screen} onChange={(e) => setScreen(e.target.value)} placeholder="6.9" />
                </Field>
                <Field label="Battery (mAh)">
                  <TextInput type="number" value={battery} onChange={(e) => setBattery(e.target.value)} placeholder="4685" />
                </Field>
                <Field label="Main camera (MP)">
                  <TextInput type="number" value={camera} onChange={(e) => setCamera(e.target.value)} placeholder="48" />
                </Field>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <Toggle checked={fiveG} onChange={setFiveG} label="Supports 5G" />
                <span className="text-sm font-medium text-foreground">Supports 5G</span>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-bold text-foreground">Best for</p>
                <div className="flex flex-wrap gap-2">
                  {useTags.map((t) => {
                    const on = uses.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setUses((prev) => (on ? prev.filter((x) => x !== t) : [...prev, t]))}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors",
                          on
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground/75 hover:border-primary/40 hover:text-primary",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Used by the shop filters and the "best for" picker.</p>
              </div>
            </SectionCard>
          ) : (
            <SectionCard
              title="Specification table"
              desc="Non-phone products define their own spec groups"
              actions={
                <Button type="button" size="sm" variant="outline" onClick={addSpecGroup}>
                  <Plus className="h-3.5 w-3.5" /> Group
                </Button>
              }
            >
              {specGroups.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No spec groups yet. Add one — the product page shows an empty table without them.
                </p>
              ) : (
                <div className="space-y-4">
                  {specGroups.map((g, gi) => (
                    <div key={gi} className="rounded-xl border border-border bg-surface p-3">
                      <div className="flex items-center gap-2">
                        <TextInput
                          value={g.group}
                          onChange={(e) =>
                            setSpecGroups((prev) => prev.map((x, i) => (i === gi ? { ...x, group: e.target.value } : x)))
                          }
                          placeholder="Display"
                          aria-label="Group name"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setSpecGroups((prev) => prev.filter((_, i) => i !== gi))}
                          aria-label="Remove group"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="mt-2 space-y-2">
                        {g.rows.map((r, ri) => (
                          <div key={ri} className="flex gap-2">
                            <TextInput
                              value={r.k}
                              onChange={(e) =>
                                setSpecGroups((prev) =>
                                  prev.map((x, i) =>
                                    i === gi
                                      ? { ...x, rows: x.rows.map((y, j) => (j === ri ? { ...y, k: e.target.value } : y)) }
                                      : x,
                                  ),
                                )
                              }
                              placeholder="Size"
                              aria-label="Spec label"
                            />
                            <TextInput
                              value={r.v}
                              onChange={(e) =>
                                setSpecGroups((prev) =>
                                  prev.map((x, i) =>
                                    i === gi
                                      ? { ...x, rows: x.rows.map((y, j) => (j === ri ? { ...y, v: e.target.value } : y)) }
                                      : x,
                                  ),
                                )
                              }
                              placeholder="10.9-inch Liquid Retina"
                              aria-label="Spec value"
                            />
                          </div>
                        ))}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setSpecGroups((prev) =>
                              prev.map((x, i) => (i === gi ? { ...x, rows: [...x.rows, { k: "", v: "" }] } : x)),
                            )
                          }
                        >
                          <Plus className="h-3.5 w-3.5" /> Row
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          )}

          {/* Box and warranty */}
          <SectionCard title="In the box and warranty" desc="Both are rendered verbatim on the product page">
            <div className="grid gap-4">
              <Field label="In the box" hint="Comma separated. Order matters — it is listed as written.">
                <TextInput value={inBox} onChange={(e) => setInBox(e.target.value)} placeholder="iPhone 17 Pro Max, USB-C charge cable (1m), Documentation" />
              </Field>
              <Field label="Warranty statement">
                <TextInput value={warranty} onChange={(e) => setWarranty(e.target.value)} placeholder="1-year Apple limited warranty, serviced in Sri Lanka" />
              </Field>
            </div>
          </SectionCard>

          {/* Badge */}
          <SectionCard title="Badge" desc="The corner label on product cards">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Badge text" hint="Leave blank for no badge">
                <TextInput value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)} placeholder="New" />
              </Field>
              <Field label="Badge tone">
                <Select value={badgeTone} onChange={(e) => setBadgeTone(e.target.value)}>
                  {badgeTones.map((t) => (
                    <option key={t} value={t}>
                      {t === "none" ? "No badge" : t}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Note>
              Badges and old prices are set per product. Clear them when a campaign ends so the site never keeps a
              struck-through price on a product that is back at full price.
            </Note>
          </SectionCard>
        </div>

        {/* Summary rail */}
        <aside className="space-y-4 xl:sticky xl:top-24">
          <Card className="overflow-hidden">
            <div className="grid aspect-[4/3] place-items-center bg-white p-6">
              {existing ? (
                <img src={existing.image} alt="" className="max-h-full w-auto object-contain mix-blend-multiply" />
              ) : (
                <p className="text-center text-xs text-muted-foreground">
                  Product imagery is imported from <code className="font-mono">src/assets</code> today. A media library is
                  the next thing to add here.
                </p>
              )}
            </div>
            <div className="border-t border-border p-4">
              <p className="truncate font-display text-sm font-bold text-foreground">{name || "Untitled product"}</p>
              <p className="text-xs text-muted-foreground">{brand || "No brand"}</p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-xl font-extrabold text-foreground">
                  {price ? fmtLKR(Number(price)) : "—"}
                </span>
                {discount && <span className="text-xs font-semibold text-promo">{discount}% off</span>}
              </div>

              {badgeLabel && badgeTone !== "none" && (
                <div className="mt-3">
                  <Pill
                    tone={
                      badgeTone === "promo"
                        ? "border-promo/25 bg-promo/10 text-promo"
                        : badgeTone === "success"
                          ? "border-success/25 bg-success/10 text-success"
                          : badgeTone === "warning"
                            ? "border-warning/40 bg-warning/15 text-foreground"
                            : "border-primary/25 bg-accent text-accent-foreground"
                    }
                  >
                    {badgeLabel}
                  </Pill>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Detail label="Margin">{margin !== null ? `${margin}%` : "—"}</Detail>
              <Detail label="On hand">{onHand || "0"}</Detail>
              <Detail label="Status">{status}</Detail>
              <Detail label="Category">{categories.find((c) => c.slug === categorySlug)?.label}</Detail>
            </div>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              <Save className="h-4 w-4" /> {isEdit ? "Save changes" : "Create product"}
            </Button>
            <Button asChild type="button" variant="outline" className="w-full">
              <Link to="/admin/products">Cancel</Link>
            </Button>
          </div>
        </aside>
      </form>
    </AdminPage>
  );
};

export default ProductForm;
