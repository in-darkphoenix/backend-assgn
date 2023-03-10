const emoji = require("node-emoji");
const { faker } = require("@faker-js/faker");
const crypto = require("crypto");

const Category = require("../models/Category");
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

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

const generateFakeCategory = async (count = 10) => {
  const categories = [];

  for (let i = 0; i < count; i++) {
    const category = {
      name: faker.random.word(),
    };

    categories.push(category);
  }

  await Category.insertMany(categories);
  console.log("Categories added to categories collection");
};

const generateFakeBlog = async (count = 100) => {
  const blogs = [];

  for (let i = 0; i < count; i++) {
    const blog = {
      title: faker.hacker.phrase(),
      body: faker.lorem.paragraphs(crypto.randomInt(10, 16)),
      category_ids: await getBlogCategoryIds(),
    };

    blogs.push(blog);
  }

  await Blog.insertMany(blogs);
  console.log("Blogs added to blogs collection");
};

const generateFakeUser = async (count = 20) => {
  const users = [];
  const sexes = ["male", "female", "trans", "other"];

  for (let i = 0; i < count; i++) {
    const s = sexes[crypto.randomInt(0, 4)];
    const fullName = faker.name.fullName({ sex: s });
    const firstName = fullName.split(" ")[0];
    const user = {
      name: fullName,
      email: faker.internet.email(firstName),
      social_profile: {
        linkedIn: "@" + faker.internet.userName(firstName),
        facebook: "@fb_" + faker.internet.userName(firstName),
        twiter: "@twt_" + faker.internet.userName(firstName),
        github: "@" + faker.internet.userName(firstName),
        instagram: "@ig_" + faker.internet.userName(firstName),
      },
      addresses: getaddresses(),
      blog_ids: await getUserBlogIds(),
    };

    users.push(user);
  }

  await User.insertMany(users);
  console.log("Users added to the users collections");
};

const generateFakeComment = async (count = 250) => {
  const blogs = await Blog.find();
  const users = await User.find();
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      blog_id: blogs[crypto.randomInt(0, blogs.length)]._id,
      user_id: users[crypto.randomInt(0, users.length)]._id,
      message: faker.lorem.sentence(),
      rating: (Math.random() * 10).toFixed(1),
    };

    comments.push(comment);
  }

  await Comment.insertMany(comments);
  console.log("Comments added to the comments collection");
};

const generateFakeLike = async (count = 20) => {
  const blogs = await Blog.find();
  const users = await User.find();
  const likes = [];
  const emojis = ["heart", "smile", "cry"];

  for (let i = 0; i < count; i++) {
    const like = {
      blog_id: blogs[crypto.randomInt(0, blogs.length)]._id,
      user_id: users[crypto.randomInt(0, users.length)]._id,
      emoji: emoji.get(emojis[crypto.randomInt(0, 3)]),
    };

    likes.push(like);
  }

  await Like.insertMany(likes);
  console.log("Likes added to the likes collection");
};

module.exports = {
  generateFakeCategory,
  generateFakeBlog,
  generateFakeUser,
  generateFakeComment,
  generateFakeLike,
};
