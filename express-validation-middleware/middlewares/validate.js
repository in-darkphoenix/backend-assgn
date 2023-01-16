const validate = (req, res, next) => {
  const { id, name, rating, description, genre, cast } = req.body;
  if (id && name && rating && description && genre && cast) {
    if (
      typeof id === "number" &&
      typeof name === "string" &&
      typeof rating === "number" &&
      typeof description === "string" &&
      typeof genre === "string" &&
      Array.isArray(cast)
    ) {
      next();
    } else {
      res.status(400).send({ message: "Type Mismatch Error" });
    }
  } else {
    res.status(400).send({ message: "Incomplete data to post" });
  }
};

module.exports = validate;
