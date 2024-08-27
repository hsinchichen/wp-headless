import Image from 'next/image';
import Link from 'next/link';

async function Blog() {
  // 定义 GraphQL 查询作为字符串
  const query = `
    query allposts {
      posts {
        nodes {
          title
          content
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `;

  // 发出 GraphQL 请求
  const res = await fetch(process.env.WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const posts = json.data.posts.nodes;

  return (
    <ul className="grid grid-cols-4 gap-5 ">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`blog/${post.slug}`}>
            {post.featuredImage && (
              <div className="relative h-[200px]">
                <Image
                  className="cover"
                  fill
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText}
                />
              </div>
            )}
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Blog;
