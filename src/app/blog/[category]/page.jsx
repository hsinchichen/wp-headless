import { categoryPost } from '@/data/getPost';
import defaultsImg from '@/../public/game5.webp';
import Image from 'next/image';
import Link from 'next/link';



async function Category({ params }) {
  const posts = await categoryPost(params.category);

  return posts.length <= 0 ? (
    'not fount'
  ) : (
    <>
      <h1 className="text-[36px] text-center py-5">{params.category}</h1>
      <ul className="grid grid-cols-4 gap-5">
        {posts?.map((post) => (
          <li key={post?.slug}>
            <Link href={`/blog/${params.category}/${post.slug}`}>
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

export default Category;
