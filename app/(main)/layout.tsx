import Header from "@/components/header/Header";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Next Furniture",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target:
        process.env.NEXT_PUBLIC_SITE_URL +
        "/furnitures?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
      >
        Skip to content
      </a>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
      >
        Skip to content
      </a>
      <header role="banner" className="">
        <Header />
      </header>
      <main id="main-content" className="min-h-screen ">
        {children}
      </main>
      <footer role="contentinfo"></footer>
    </>
  );
}
