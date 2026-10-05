import { Helmet } from "react-helmet-async";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SEOComponent = ({ children }: any) => {
  const ogData = {
    title: "SFU Admission",
    description:
      "Discover the Strategy First University MBA Programme, Myanmar's leading business management education designed for aspiring leaders and innovators. Our program offers a unique dual degree option in collaboration with Wolverhampton, providing world-class education at an affordable cost. Specialize in entrepreneurship, finance, digital innovation, and human resources management. Enroll in our flexible online or on-campus options and propel your career forward with an MBA from one of Myanmar's top universities",
    url: "https://admissions.strategyfirst.edu.mm/",
    image: "https://admissions.strategyfirst.edu.mm/img/logo.webp",
    siteName: "SFU Admission",
  };

  const canonicalUrl = "https://admissions.strategyfirst.edu.mm/";

  return (
    <div>
      <Helmet>
        <title>Strategy First International College</title>

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={ogData.title} />
        <meta property="og:description" content={ogData.description} />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:image" content={ogData.image} />
        <meta property="og:site_name" content={ogData.siteName} />

        <meta
          name="description"
          content="Discover the Strategy First University MBA Program, Myanmar's leading business management education designed for aspiring leaders and innovators. Our program offers a unique dual degree option in collaboration with Wolverhampton, providing world-class education at an affordable cost. Specialize in entrepreneurship, finance, digital innovation, and human resources management. Enroll in our flexible online or on-campus options and propel your career forward with an MBA from one of Myanmar's top universities."
        />
        <meta
          name="keywords"
          content="Admission, MBA, Strategy First University, MBA Program in Myanmar, Strategy First University MBA
,Affordable MBA in Myanmar, Digital Transformation MBA, Sustainable Business  
, Dual MBA Degrees Myanmar, Part-Time MBA Myanmar, Online MBA Program Myanmar, Blended MBA Program Myanmar, Strategic Management MBA Myanmar, MBA for Entrepreneurs in Myanmar
, MBA Programs with Installment Plans in Myanmar, MBA Programs with Bank Loan Options in Myanmar
, meiktila mba, monywa mba, YUEco MBA, Yangon University of Economics MBA, Economics MBA, EMBA Myanmar, Executive MBA Myanmar"
        />

        {/* Schema.org Markup for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            name: "SFU Admission",
            url: "https://admissions.strategyfirst.edu.mm/",
            logo: "https://admissions.strategyfirst.edu.mm/img/logo.webp",
            sameAs: [
              "https://www.facebook.com/strategyfirstuniversity",
              "https://www.linkedin.com/company/strategy-first-university",
            ],
            description: ogData.description,
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Main St",
              addressLocality: "Yangon",
              addressRegion: "Yangon Region",
              postalCode: "11181",
              addressCountry: "MM",
            },
          })}
        </script>
      </Helmet>
      {children}
    </div>
  );
};

export default SEOComponent;
