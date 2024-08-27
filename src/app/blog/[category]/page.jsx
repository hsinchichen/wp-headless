import { categoryPost } from '@/api/getPost';
import defaultsImg from '@/../public/game5.webp';
import Image from 'next/image';
import Link from 'next/link';

// async function Category({ params }) {
//   const categoryPost = `
//   query postsCategory($categoryName: String = "") {
//   posts(where: {categoryName: $categoryName}) {
//     nodes {
//       title
//       content
//       slug
//     }
//   }
// }
// `;

//   const res = await fetch(process.env.WP_API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: categoryPost,
//       variables: {
//         categoryName: params.category,
//       },
//     }),
//   });

//   const json = await res.json();

//   const posts = json.data?.posts.nodes;

//   return posts.length === 0 ? (
//     'not fount '
//   ) : (
//     <ul className="grid grid-cols-4 gap-5 ">
//       {posts.map((post) => (
//         <li key={post.slug}>
//           <Link href={`/blog/${params.category}/${post.slug}`}>
//             <div className="relative h-[200px]">
//               <Image
//                 className="cover"
//                 fill
//                 src={post?.featuredImage?.node?.sourceUrl || defaultsImg}
//                 alt={post?.featuredImage?.node?.altText}
//               />
//             </div>
//             <h2>{post.title}</h2>
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

async function Category({ params }) {
  const posts = await categoryPost(params.category);

  return posts.length <= 0 ? (
    'not fount'
  ) : (
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
  );
}

export default Category;
