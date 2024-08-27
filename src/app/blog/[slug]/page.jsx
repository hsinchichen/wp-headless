import Image from 'next/image';
import styles from './post.module.css';

async function PostPage({ params }) {
  const singlePost = `
  query singlepost($id: ID = "") {
    post(id: $id, idType: SLUG) {
    title(format: RENDERED)
    content(format: RENDERED)
    featuredImage {
      node {
      sourceUrl
      altText
      }
    }
  }
}`;

  const res = await fetch(process.env.WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: singlePost,
      variables: {
        id: params.slug,
      },
    }),
  });

  const data = await res.json();

  const postData = data.data.post;

  return (
    <div>
      {postData.featuredImage && (
        <figure className={styles.post_figure}>
          <Image
            className={styles.post_img}
            fill
            src={postData.featuredImage.node.sourceUrl}
            alt={postData.featuredImage.node.altText}
          />
        </figure>
      )}
      <h1>{postData.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </div>
  );
}

export default PostPage;
