import Image from 'next/image';
import styles from './post.module.css';
import { postPage } from '@/data/getPost';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const postData = await postPage(params);

  return {
    title: postData?.title || 'Default Title',
    description: postData?.excerpt || 'Default Description',
  };
}

export default async function PostPage({ params }) {
  const postData = await postPage(params);

  const categorySlugs = postData.categories.nodes.map(
    (category) => category.slug,
  );

  console.log(categorySlugs);

  if (!categorySlugs.includes(params.category)) {
    notFound(); 
  }

  return (
    <div>
      {postData?.featuredImage && (
        <figure className={styles.post_figure}>
          <Image
            className={styles.post_img}
            fill
            src={postData?.featuredImage.node.sourceUrl}
            alt={postData?.featuredImage.node.altText}
          />
        </figure>
      )}
      <h1>{postData?.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />
    </div>
  );
}
