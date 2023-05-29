const categories = {
  name: "categories",
  title: "Categories",
  type: "document",
  fields: [
    {
      name: "category",
      type: "string",
      title: "Category",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categoryImage",
      type: "image",
      title: "Category Image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subcategories",
      type: "array",
      title: "Subcategories",
      of: [{ type: "string" }],
    },
  ],
};

export default categories;
