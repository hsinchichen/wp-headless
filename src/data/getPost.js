export async function getPost() {
  const query = `
    query allPosts {
      posts {
        nodes {
          title
          content
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            edges {
              node {
                slug
              }
            }
          }
        }
      }
    }
  `;

  return fetchGraphQLData(query);
}

export async function categoryPost(params) {
  const query = `
    query postsCategory($categoryName: String = "") {
      posts(where: {categoryName: $categoryName}) {
        nodes {
          title
          content
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const variables = { categoryName: params };
  return fetchGraphQLData(query, variables);
}

async function fetchGraphQLData(query, variables = {}) {
  try {
    const res = await fetch(process.env.WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (!json?.data?.posts?.nodes) {
      throw new Error('No posts found');
    }

    return json.data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function postPage(params) {
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
        categories {
          nodes {
            slug
          }
        }
      }
    }
  `;

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
    cache: 'no-store',
  });

  const data = await res.json();
  const postData = data.data.post;

  return postData;
}
