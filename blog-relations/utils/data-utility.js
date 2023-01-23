const { faker } = require("@faker-js/faker");
const crypto = require("crypto");

const Category = require("../models/Category");
const Blog = require("../models/Blog");

const getBlogCategoryIds = async () => {
  const categories = await Category.find();
  const blogCategoryIds = [];
  const l = crypto.randomInt(1, 6);

  for (let i = 1; i <= l; i++) {
    const odds = crypto.randomInt(0, 2);
    let l_idx;
    let r_idx;
    if (odds === 0) {
      l_idx = 0;
      r_idx = 5;
    } else {
      l_idx = 5;
      r_idx = 10;
    }

    const categoryId = categories[crypto.randomInt(l_idx, r_idx)]._id;
    blogCategoryIds.push(categoryId);
  }

  return blogCategoryIds;
};

const getaddresses = () => {
  const addresseses = [];
  const l = crypto.randomInt(1, 4);

  for (let i = 1; i <= l; i++) {
    const address = {
      line1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      pincode: faker.address.zipCode("#####"),
    };

    addresseses.push(address);
  }

  return addresseses;
};

const getUserBlogIds = async () => {
  const blogs = await Blog.find();
  const userBlogIds = [];
  const l = crypto.randomInt(1, 8);

  for (let i = 1; i <= l; i++) {
    const odds = crypto.randomInt(0, 2);
    let l_idx;
    let r_idx;
    if (odds === 0) {
      l_idx = 0;
      r_idx = 50;
    } else {
      l_idx = 50;
      r_idx = 100;
    }
    const blogId = blogs[crypto.randomInt(l_idx, r_idx)]._id;
    userBlogIds.push(blogId);
  }

  return userBlogIds;
};

module.exports = { getBlogCategoryIds, getaddresses, getUserBlogIds };
