"use client";

import GenericPage from "../components/GenericPage";
import Link from "next/link";
import React from "react";

const blogPosts = [
  {
    slug: "tanzania-safari-ultimate-guide-2026",
    title:
      "Tanzania Safari 2026: The Ultimate Guide to Africa's Greatest Wildlife Destination",
    excerpt:
      "Tanzania is not just a safari destination — it is the safari destination. Home to the world's largest unbroken animal migration, the continent's highest mountain, and some of Africa's most pristine wilderness...",
    category: "Safari Guide",
    keywords: "Tanzania safari, Tanzania safari 2026, best safari in Tanzania",
    image: "/assets/images/blog/tanzania-safari-ultimate-guide.jpg",
  },
  {
    slug: "serengeti-safari-complete-guide",
    title:
      "Serengeti Safari: Your Complete Guide to Tanzania's Greatest National Park",
    excerpt:
      "Mention 'safari' anywhere in the world and one name immediately comes to mind: the Serengeti. This legendary national park in northern Tanzania is synonymous with African wildlife, big skies, and raw primal encounters...",
    category: "Destination Guide",
    keywords:
      "Serengeti safari, Great Migration Tanzania, Serengeti safari packages",
    image: "/assets/images/blog/serengeti-safari-tanzania.jpg",
  },
  {
    slug: "climbing-kilimanjaro-complete-guide-2026",
    title:
      "Climbing Kilimanjaro: Your Complete 2026 Guide to Africa's Highest Peak",
    excerpt:
      "At 5,895 metres above sea level, Mount Kilimanjaro is the highest mountain in Africa, the world's highest free-standing volcano, and one of the Seven Summits. Every year, tens of thousands of trekkers attempt to reach Uhuru Peak...",
    category: "Trekking & Climbing",
    keywords: "climb Kilimanjaro, Kilimanjaro routes, Kilimanjaro cost 2025",
    image: "/assets/images/blog/climbing-kilimanjaro-trek.jpg",
  },
  {
    slug: "tanzania-cultural-tours-maasai-chagga-zanzibar",
    title: "Tanzania Cultural Tours: Discover the Soul of East Africa",
    excerpt:
      "Tanzania's wildlife is world-famous, but the country's human story is equally extraordinary. From the ancient Maasai warriors of the northern plains to the Swahili merchants of Zanzibar's Stone Town...",
    category: "Cultural Tours",
    keywords:
      "Tanzania cultural tour, Maasai village Tanzania, Zanzibar cultural tour",
    image: "/assets/images/blog/tanzania-cultural-tour-experience.jpg",
  },
  {
    slug: "best-safari-company-tanzania-kili-to-savanna",
    title:
      "Why Kili to Savanna Adventures Is Tanzania's Best Choice for Your Safari",
    excerpt:
      "With hundreds of safari companies competing for your attention online, choosing the right operator for your Tanzania trip is one of the most important decisions you will make.Get it right and you will return home...",
    category: "About Us",
    keywords:
      "best safari company Tanzania, Tanzania safari operator, Arusha safari company",
    image: "/assets/images/blog/best-safari-company-tanzania.jpg",
  },
];

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card-wrapper col-md-4 col-sm-6">
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card">
          <div className="blog-card-image-container">
            <img
              src={post.image}
              alt={post.title}
              className="blog-card-image"
            />
          </div>
          <div className="blog-card-content">
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-footer">
              <span className="read-more-btn">Read more</span>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .blog-card-wrapper {
          margin-bottom: 30px;
        }
        .blog-card-link {
          text-decoration: none !important;
          color: inherit;
        }
        .blog-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }
        .blog-card-image-container {
          height: 200px;
          overflow: hidden;
        }
        .blog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-card-image {
          transform: scale(1.05);
        }
        .blog-card-content {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fff;
          z-index: 2;
        }
        .blog-card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #333;
          line-height: 1.4;
        }
        .blog-card-excerpt {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .blog-card-footer {
          min-height: 40px;
        }
        .read-more-btn {
          display: inline-block;
          background: #f9a825;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        .blog-card:hover .read-more-btn {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default function BlogPage() {
  return (
    <GenericPage title={"The Blog"}>
      <div className="blank-mask"></div>

      <div id="main-zone" className="row">
        <div className="col-sm-12">
          <div className="blog-listing-container">
            <div className="row">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .blog-listing-container {
          padding: 20px 0;
        }
      `}</style>
    </GenericPage>
  );
}
