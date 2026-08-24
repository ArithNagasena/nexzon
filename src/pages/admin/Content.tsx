/**
 * Content and merchandising.
 *
 * The homepage is twelve components rendered in a fixed order by
 * `pages/Index.tsx`. Giving a merchandiser control of that order, of which
 * sections show, and of the banners and copy inside them is what turns a
 * launch campaign from a code change into an afternoon's work.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutTemplate,
  Image,
  MessageSquareQuote,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  Star,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Note,
  Pill,
  SectionCard,
  StatCard,
  TableShell,
  Tabs,
  Td,
  Th,
  Toggle,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import {
  banners,
  faqEntries,
  homepageSections,
  slotMeta,
  subscriberCount,
  testimonials,
  type Section,
} from "@/data/admin/content";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "homepage", label: "Homepage" },
  { id: "banners", label: "Banners" },
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
];

const Content = () => {
  const [tab, setTab] = useState("homepage");
  const [sections, setSections] = useState<Section[]>(homepageSections);
  const [done, setDone] = useState("");

  const move = (id: string, dir: -1 | 1) => {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const i = sorted.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= sorted.length) return prev;
      [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      return sorted.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
    setDone("Section order changed. The homepage would re-render in this order.");
  };

  const toggle = (id: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)));
    setDone("Section visibility changed.");
  };

  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const hidden = sections.filter((s) => !s.visible).length;
  const liveBanners = banners.filter((b) => b.live);

  return (
    <AdminPage
      title="Content"
      subtitle="Homepage layout, campaign banners, FAQ answers and the testimonials wall"
      actions={
        <Button asChild variant="outline">
          <Link to="/">
            <ExternalLink className="h-4 w-4" /> View the storefront
          </Link>
        </Button>
      }
    >
      {done && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{done}</span>
          </span>
          <button type="button" onClick={() => setDone("")} aria-label="Dismiss" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Homepage sections" value={String(sections.length)} sub={hidden ? `${hidden} hidden` : "All visible"} icon={LayoutTemplate} tone="primary" />
        <StatCard label="Live banners" value={String(liveBanners.length)} sub={`${banners.length} scheduled in total`} icon={Image} tone="promo" />
        <StatCard label="FAQ answers" value={String(faqEntries.length)} sub={`${faqEntries.filter((f) => f.onHomepage).length} shown on the homepage`} icon={HelpCircle} tone="success" />
        <StatCard label="Newsletter list" value={subscriberCount.toLocaleString()} sub="Active subscribers" icon={MessageSquareQuote} tone="warning" />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { ...tabs[0], count: sections.length },
            { ...tabs[1], count: banners.length },
            { ...tabs[2], count: faqEntries.length },
            { ...tabs[3], count: testimonials.length },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* Homepage */}
      {tab === "homepage" && (
        <div className="mt-5 space-y-4">
          <SectionCard
            title="Section order"
            desc="Top to bottom, exactly as the homepage renders them"
            bodyClassName="p-0"
          >
            <ul className="divide-y divide-border">
              {ordered.map((s, i) => (
                <li key={s.id} className={cn("flex flex-wrap items-center gap-4 p-4", !s.visible && "bg-surface/60")}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary font-display text-xs font-extrabold tabular-nums text-foreground">
                    {s.order}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-sm font-semibold", s.visible ? "text-foreground" : "text-muted-foreground")}>
                      {s.label}
                      {!s.visible && <span className="ml-2 text-xs font-normal">(hidden)</span>}
                    </span>
                    <span className="block text-xs text-muted-foreground">{s.description}</span>
                    <code className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
                      components/NexZon/{s.component}.tsx
                    </code>
                  </span>

                  {s.picks && (
                    <Pill tone="border-primary/25 bg-accent text-accent-foreground">{s.picks} products</Pill>
                  )}

                  <span className="flex shrink-0 items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => move(s.id, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${s.label} up`}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => move(s.id, 1)}
                      disabled={i === ordered.length - 1}
                      aria-label={`Move ${s.label} down`}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggle(s.id)}
                      aria-label={s.visible ? `Hide ${s.label}` : `Show ${s.label}`}
                    >
                      {s.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

        </div>
      )}

      {/* Banners */}
      {tab === "banners" && (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>Slot</Th>
                <Th>Headline</Th>
                <Th>Links to</Th>
                <Th>Runs</Th>
                <Th>State</Th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <Tr key={b.id}>
                  <Td>
                    <Pill tone="border-border bg-secondary text-muted-foreground">{slotMeta[b.slot]}</Pill>
                  </Td>
                  <Td>
                    <span className="block max-w-[22rem] text-sm font-semibold text-foreground">{b.headline}</span>
                    {b.sub && <span className="block text-xs text-muted-foreground">{b.sub}</span>}
                  </Td>
                  <Td>
                    <Link to={b.link} className="font-mono text-xs text-primary hover:underline">
                      {b.link}
                    </Link>
                  </Td>
                  <Td className="whitespace-nowrap text-xs">
                    {b.starts}
                    <span className="block text-muted-foreground">to {b.ends}</span>
                  </Td>
                  <Td>
                    <Pill
                      tone={
                        b.live
                          ? "border-success/25 bg-success/10 text-success"
                          : "border-border bg-secondary text-muted-foreground"
                      }
                    >
                      {b.live ? "Live" : "Scheduled"}
                    </Pill>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </TableShell>
        </div>
      )}

      {/* FAQ */}
      {tab === "faq" && (
        <div className="mt-5 space-y-4">
          {faqEntries.map((f) => (
            <SectionCard
              key={f.id}
              title={f.question}
              desc={f.topic}
              actions={
                f.onHomepage ? (
                  <Pill tone="border-primary/25 bg-accent text-accent-foreground">On homepage</Pill>
                ) : (
                  <Pill tone="border-border bg-secondary text-muted-foreground">FAQ page only</Pill>
                )
              }
              bodyClassName="p-5"
            >
              <p className="max-w-3xl text-sm text-foreground/80">{f.answer}</p>
            </SectionCard>
          ))}
        </div>
      )}

      {/* Testimonials */}
      {tab === "testimonials" && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
                <span className="flex shrink-0 gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-3.5 w-3.5", i < t.rating ? "fill-warning text-warning" : "text-border")} />
                  ))}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{t.quote}"</p>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <Pill
                  tone={
                    t.approved
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-promo/25 bg-promo/10 text-promo"
                  }
                >
                  {t.approved ? "Approved" : "Awaiting approval"}
                </Pill>
                {t.featured && <Pill tone="border-primary/25 bg-accent text-accent-foreground">Featured</Pill>}
                <span className="ml-auto flex items-center gap-2">
                  <Toggle
                    checked={t.featured}
                    onChange={() => setDone(`${t.name}'s testimonial ${t.featured ? "removed from" : "added to"} the homepage.`)}
                    label={`Feature ${t.name}'s testimonial`}
                  />
                  <span className="text-xs text-muted-foreground">Feature</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminPage>
  );
};

export default Content;
