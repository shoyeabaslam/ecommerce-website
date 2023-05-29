const slider_schema = {
  name: "sliderImages",
  title: "Slider Images",
  type: "document",
  fields: [
    {
      name: "sliderTitle",
      title: "Image Title",
      type: "string",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sliderImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default slider_schema;
