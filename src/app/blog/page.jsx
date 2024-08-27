import defaultsImg from '@/../public/game5.webp';
import { getPost } from '@/api/getPost';
import Image from 'next/image';
import Link from 'next/link';

async function Blog() {
  const posts = await getPost();

  return (
    <ul className="grid grid-cols-4 gap-5">
      {posts?.map((post) => (
        <li key={post?.slug}>
          <Link
            href={`/blog/${post.categories.edges[0].node.slug}/${post.slug}`}
          >
            <div className="relative h-[200px]">
              <Image
                className="cover"
                fill
                src={post.featuredImage?.node?.sourceUrl || defaultsImg}
                alt={post.featuredImage?.node?.altText || 'Featured image'}
              />
            </div>

            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Blog;
