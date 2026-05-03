const blogMetadata = {
  "tanzania-safari-ultimate-guide-2026": {
    title: "Tanzania Safari 2026: The Ultimate Guide to Africa's Greatest Wildlife Destination",
    image: "/assets/images/blog/tanzania-safari-ultimate-guide.jpg",
  },
  "serengeti-safari-complete-guide": {
    title: "Serengeti Safari: Your Complete Guide to Tanzania's Greatest National Park",
    image: "/assets/images/blog/serengeti-safari-tanzania.jpg",
  },
  "climbing-kilimanjaro-complete-guide-2026": {
    title: "Climbing Kilimanjaro: Your Complete 2026 Guide to Africa's Highest Peak",
    image: "/assets/images/blog/climbing-kilimanjaro-trek.jpg",
  },
  "tanzania-cultural-tours-maasai-chagga-zanzibar": {
    title: "Tanzania Cultural Tours: Discover the Soul of East Africa",
    image: "/assets/images/blog/tanzania-cultural-tour-experience.jpg",
  },
  "best-safari-company-tanzania-kili-to-savanna": {
    title: "Why Kili to Savanna Adventures Is Tanzania's Best Choice for Your Safari",
    image: "/assets/images/blog/best-safari-company-tanzania.jpg",
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogMetadata[slug];

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: `Read about ${post.title} on the Kili to Savanna Adventures blog.`,
    openGraph: {
      title: post.title,
      description: `Read about ${post.title} on the Kili to Savanna Adventures blog.`,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default function BlogPostLayout({ children }) {
  return <>{children}</>;
}
