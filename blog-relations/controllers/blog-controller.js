const Blog = require("../models/Blog");
const Category = require("../models/Category");

const createBlog = async (blog) => {
  const { title, body, categories } = blog;

  const categoryIds = [];
  const categoriesArray = await Category.find();
  categories.forEach((category) => {
    const foundCategory = categoriesArray.find(
      (elem) => elem.name === category
    );
    if (foundCategory) {
      categoryIds.push(foundCategory._id);
    }
  });

  const addedBlog = await Blog.create({
    title,
    body,
    category_ids: categoryIds,
  });

  return addedBlog;
};

module.exports = { createBlog };
