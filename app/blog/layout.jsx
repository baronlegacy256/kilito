export const metadata = {
  title: "The Blog",
  description: "Read the Kili to Savanna blog for the latest guides, tips, and stories about safaris, climbing Kilimanjaro, and cultural tours in Tanzania.",
  openGraph: {
    title: "The Blog",
    description: "Read the Kili to Savanna blog for the latest guides, tips, and stories about safaris, climbing Kilimanjaro, and cultural tours in Tanzania.",
    url: "https://kilitosavannaadventures.com/blog",
    images: ["/assets/images/blog/best-safari-company-tanzania.jpg"],
  }
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
