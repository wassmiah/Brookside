import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { NEWS, formatNewsDate, getNewsArticle } from "../data/news";
import "./News.css";

const NEWS_VISIBLE = false;

export function NewsList() {
  return (
    <>
      <SEO
        title="News & Updates"
        description="Company news, recruitment updates, partnerships, and stories from Brookside Manpower Services."
        keywords="Brookside news, recruitment updates, EVA partnership, company updates, Brookside Manpower Services"
        ogImage="/manila.jpg"
        ogImageAlt="Brookside Manpower Services news and updates"
        canonicalUrl="/news"
        noindex={!NEWS_VISIBLE}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "News & Updates",
          description: "Company news, recruitment updates, partnerships, and stories from Brookside Manpower Services.",
          url: "https://brooksidemps.com/news",
          isPartOf: {
            "@type": "WebSite",
            name: "Brookside Manpower Services",
            url: "https://brooksidemps.com",
          },
        }}
      />
      <section className="news-page section-partition">
        <p className="section-eyebrow">Brookside</p>
        <h1 className="neon-section-title news-page-title">
          <span className="orange">News</span> <span className="blue">&amp; Updates</span>
        </h1>
        <p className="section-lead">
          Company news, recruitment, partnerships, events, and notes from the industry we work in.
        </p>
        <div className="news-grid">
          {NEWS.map((article) => (
            <article className="news-card" key={article.slug}>
              <Link to={`/news/${article.slug}`} className="news-card-link">
                <img src={article.image} alt={article.imageAlt} className="news-card-image" />
                <div className="news-card-body">
                  <p className="news-card-meta">
                    <span>{article.category}</span>
                    <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
                  </p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <span className="news-card-more">Read article</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function NewsArticle() {
  const { slug } = useParams();
  const article = getNewsArticle(slug);

  if (!article) {
    return (
      <section className="news-page section-partition">
        <h1 className="news-article-title">Article not found</h1>
        <p className="section-lead">That update is no longer available.</p>
        <Link to="/news" className="contact-us-btn"><span>Back to News</span></Link>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        keywords={`${article.category}, Brookside news, Brookside Manpower Services, ${article.title}`}
        ogImage={article.image}
        ogImageAlt={article.imageAlt}
        ogType="article"
        canonicalUrl={`/news/${article.slug}`}
        noindex={!NEWS_VISIBLE}
        articleAuthor="Brookside Manpower Services"
        articlePublishedTime={article.date}
        articleSection={article.category}
        articleTags={[article.category, "Brookside Manpower Services"]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.description,
            image: `https://brooksidemps.com${article.image}`,
            datePublished: article.date,
            author: {
              "@type": "Organization",
              name: "Brookside Manpower Services",
              url: "https://brooksidemps.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Brookside Manpower Services",
              logo: {
                "@type": "ImageObject",
                url: "https://brooksidemps.com/logo192.png",
              },
            },
            mainEntityOfPage: `https://brooksidemps.com/news/${article.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://brooksidemps.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "News & Updates",
                item: "https://brooksidemps.com/news",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://brooksidemps.com/news/${article.slug}`,
              },
            ],
          },
        ]}
      />
      <article className="news-article section-partition">
        <p className="section-eyebrow">{article.category}</p>
        <h1 className="news-article-title">{article.title}</h1>
        <p className="news-article-date">
          <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
        </p>
        <img src={article.image} alt={article.imageAlt} className="news-article-image" />
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link to="/news" className="news-back">All news &amp; updates</Link>
      </article>
    </>
  );
}

export function NewsPreview() {
  if (!NEWS_VISIBLE) return null;

  return (
    <section className="news-home section-partition" id="news" aria-label="News and updates">
      <h2 className="neon-section-title">
        <span className="orange">News</span> <span className="blue">&amp; Updates</span>
      </h2>
      <p className="section-lead">Recent notes from Brookside.</p>
      <div className="news-grid">
        {NEWS.slice(0, 3).map((article) => (
          <article className="news-card" key={article.slug}>
            <Link to={`/news/${article.slug}`} className="news-card-link">
              <img src={article.image} alt={article.imageAlt} className="news-card-image" />
              <div className="news-card-body">
                <p className="news-card-meta">
                  <span>{article.category}</span>
                  <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
                </p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span className="news-card-more">Read article</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="news-home-action">
        <Link to="/news" className="contact-us-btn"><span>View all updates</span></Link>
      </div>
    </section>
  );
}
