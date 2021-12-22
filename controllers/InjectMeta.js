export const injectMetaVisitor = (req, res, next) => {
  const posts = [
    {
      title: "Post #1",
      description: "This is the first post",
      thumbnail: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
    },
  ];
  // inject meta tags
  htmlData = htmlData
    .replace("<title>React App</title>", `<title>${post.title}</title>`)
    .replace("__META_OG_TITLE__", post.title)
    .replace("__META_OG_DESCRIPTION__", post.description)
    .replace("__META_DESCRIPTION__", post.description)
    .replace("__META_OG_IMAGE__", post.thumbnail);
  return res.send(htmlData);
};
