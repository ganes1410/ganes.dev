import React from 'react';
import { Link } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import { usePosts } from '../hooks/usePosts';

const BlogIndex = ({ location }) => {
  const posts = usePosts();
  const { title: siteTitle } = posts.site.siteMetadata;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <Bio />
      {posts.allMarkdownRemark.edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;
