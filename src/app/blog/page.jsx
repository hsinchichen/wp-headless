import defaultsImg from '@/../public/game5.webp';
import { getPost } from '@/data/getPost';
import Image from 'next/image';
import Link from 'next/link';

async function Blog() {
  const posts = await getPost();

  return (
    <>
      <h1 className="text-[36px] text-center py-5">Blog</h1>
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
    </>
  );
}

export default Blog;
