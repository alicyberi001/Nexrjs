export const urls = {
  posts: {
    list: "/posts",
    byId: (id: number) => `/posts/${id}`,
    byUser: (id: number) => `/posts/user/${id}`,
    byTag: (tag: string) => `/posts/tag/${tag}`,
  },
  Users: {
    list: "/users",
    byId: (id: number) => `/users/${id}`,
  },
  comments: {
    byPostId: (pid: number) => `/comments/post/${pid}`,
  },
};
