import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'Doçuras & Sabores',
  publishedAt,
  modifiedAt
}) => {
  const siteUrl = 'https://docurasesabores.com.br'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | Doçuras & Sabores` : 'Doçuras & Sabores - Confeitaria Artesanal'}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Doçuras & Sabores" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          "name": "Doçuras & Sabores",
          "description": "Confeitaria artesanal especializada em bolos, doces finos e sobremesas",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "image": fullImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua das Delícias, 123",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01234-567",
            "addressCountry": "BR"
          },
          "telephone": "+55-11-99988-7766",
          "openingHours": [
            "Mo-Sa 09:00-18:00",
            "Su 10:00-14:00"
          ],
          "priceRange": "$$",
          "servesCuisine": "Confeitaria",
          "hasMenu": `${siteUrl}/menu`,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
          }
        })}
      </script>
      
      {/* Article specific structured data */}
      {type === 'article' && publishedAt && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": fullImage,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Doçuras & Sabores",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            },
            "datePublished": publishedAt,
            "dateModified": modifiedAt || publishedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            }
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEO












