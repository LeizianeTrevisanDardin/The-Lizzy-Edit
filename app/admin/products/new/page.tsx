"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const skinToneOptions = [
  "Fair",
  "Light",
  "Light-Medium",
  "Medium",
  "Medium-Deep",
  "Deep",
];

const undertoneOptions = [
  "Cool",
  "Neutral-Cool",
  "Neutral",
  "Neutral-Warm",
  "Warm",
];

const concernOptions = [
  "Dryness",
  "Sensitivity",
  "Breakouts",
  "Fine Lines",
  "Dark Spots",
  "Dullness",
];

const categoryOptions = [
  "Skincare",
  "Makeup",
  "Self-Care",
  "Fragrance",
];

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [whyILikeIt, setWhyILikeIt] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [homeTag, setHomeTag] = useState("");
  const [tags, setTags] = useState("");

  const [skinTones, setSkinTones] = useState<string[]>([]);
  const [undertones, setUndertones] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);

  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleValue(
    value: string,
    current: string[],
    setter: (values: string[]) => void
  ) {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
    } else {
      setter([...current, value]);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (!brand.trim() || !name.trim()) {
        throw new Error("Brand and product name are required.");
      }

      const slug = createSlug(`${brand}-${name}`);

      let imageUrl: string | null = null;

      if (image) {
        const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${extension}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("products")
        .insert({
          slug,
          brand: brand.trim(),
          name: name.trim(),
          category,
          type: type.trim() || null,
          image_url: imageUrl,
          description: description.trim() || null,

          why_i_like_it: whyILikeIt
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

          affiliate_url: affiliateUrl.trim() || null,

          featured,
          home_tag: homeTag.trim() || null,

          skin_tones: skinTones,
          undertones,
          concerns,

          tags: tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          status,
        });

      if (insertError) {
        throw insertError;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving the product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/products"
          className="text-xs text-stone-500 transition hover:text-[#b77b72]"
        >
          ← Products
        </Link>

        <div className="mt-6 border-b border-stone-200 pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Catalog
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Add Product
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Add a new beauty recommendation to The Lizzy Edit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8 rounded-[28px] border border-stone-200 bg-white p-5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Brand">
              <input
                required
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="input"
                placeholder="La Roche-Posay"
              />
            </Field>

            <Field label="Product Name">
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input"
                placeholder="Cicaplast Baume B5+"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Category">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="input"
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>

            <Field label="Type">
              <input
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="input"
                placeholder="Moisturizer"
              />
            </Field>
          </div>

          <Field label="Product Image">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) =>
                setImage(event.target.files?.[0] ?? null)
              }
              className="block w-full rounded-2xl border border-stone-200 bg-[#fffaf7] p-3 text-sm"
            />

            <p className="mt-2 text-xs text-stone-400">
              JPG, PNG or WebP recommended.
            </p>
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="input resize-none"
              placeholder="Short description of the product..."
            />
          </Field>

          <Field label="Why I Like It">
            <textarea
              rows={5}
              value={whyILikeIt}
              onChange={(event) => setWhyILikeIt(event.target.value)}
              className="input resize-none"
              placeholder={"Hydrating without feeling heavy\nGreat for sensitive skin\nWorks beautifully under makeup"}
            />

            <p className="mt-2 text-xs text-stone-400">
              Put one reason per line.
            </p>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Affiliate URL">
              <input
                type="url"
                value={affiliateUrl}
                onChange={(event) => setAffiliateUrl(event.target.value)}
                className="input"
                placeholder="https://..."
              />
            </Field>

            <Field label="Home Tag">
              <input
                value={homeTag}
                onChange={(event) => setHomeTag(event.target.value)}
                className="input"
                placeholder="Lizzy Loves"
              />
            </Field>
          </div>

          <Field label="Tags">
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className="input"
              placeholder="Everyday, Dryness, Sensitive"
            />

            <p className="mt-2 text-xs text-stone-400">
              Separate tags with commas.
            </p>
          </Field>

          <CheckboxGroup
            title="Skin Tones"
            options={skinToneOptions}
            selected={skinTones}
            onToggle={(option) =>
              toggleValue(option, skinTones, setSkinTones)
            }
          />

          <CheckboxGroup
            title="Undertones"
            options={undertoneOptions}
            selected={undertones}
            onToggle={(option) =>
              toggleValue(option, undertones, setUndertones)
            }
          />

          <CheckboxGroup
            title="Skin Concerns"
            options={concernOptions}
            selected={concerns}
            onToggle={(option) =>
              toggleValue(option, concerns, setConcerns)
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-stone-200 bg-[#fffaf7] px-4">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
              />

              <span className="text-sm">Featured product</span>
            </label>

            <Field label="Status">
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as "draft" | "published"
                  )
                }
                className="input"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-200 px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-400"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#b77b72] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-stone-700">{label}</span>

      <div className="mt-2">{children}</div>
    </label>
  );
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-stone-700">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`min-h-10 rounded-full border px-4 text-xs transition ${
                active
                  ? "border-[#b77b72] bg-[#f7e8e4] text-[#8f5651]"
                  : "border-stone-200 bg-white text-stone-500 hover:border-[#b77b72]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}