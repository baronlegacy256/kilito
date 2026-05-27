import GenericPage from '@/app/components/GenericPage';

export const metadata = {
  title: "Terms of Use",
  description: "Read the terms of use for the Kili to Savanna website and services.",
  openGraph: {
    title: "Terms of Use",
    description: "Read the terms of use for the Kili to Savanna website and services.",
    url: "https://kilitosavannasafariclub.com/terms-of-use",
    images: ["/assets/images/home/logo.png"],
  },
  alternates: {
    canonical: "https://kilitosavannasafariclub.com/terms-of-use",
  },
};

export default function TermsOfUse() {
  return <GenericPage title="Terms of Use" />;
}
