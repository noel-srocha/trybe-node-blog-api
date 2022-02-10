const posts = require('../services/postsService');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.dataValues.id;
  const { status, addPost, message } = await posts.createPost({ title, userId, content });
  if (message) { return res.status(status).json({ message }); }
  return res.status(status).json(addPost);
};

const getPosts = async (req, res) => {
  const { status, allPosts } = await posts.getPosts();
  return res.status(status).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { status, postById, message } = await posts.getPostById(id);
  if (message) { return res.status(status).json({ message }); }
  return res.status(status).json(postById);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { status, newPost, message } = await posts.updatePost(id, { title, content });
  if (message) { return res.status(status).json({ message }); }
  return res.status(status).json(newPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { status, deletedpost, message } = await posts.deletePost(id);
  if (message) { return res.status(status).json({ message }); }
  return res.status(status).json(deletedpost);
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };