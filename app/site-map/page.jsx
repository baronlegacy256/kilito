import GenericPage from '@/app/components/GenericPage';

export const metadata = {
  title: "Site Map",
  description: "Navigate the Kili to Savanna website with our comprehensive site map.",
  openGraph: {
    title: "Site Map",
    description: "Navigate the Kili to Savanna website with our comprehensive site map.",
    url: "https://kilitosavannasafariclub.com/site-map",
    images: ["/assets/images/home/logo.png"],
  }
};

export default function SiteMap() {
  return <GenericPage title="Site Map" />;
}
