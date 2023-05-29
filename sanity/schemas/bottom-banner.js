const bottomBanner = {
    name: "bottomBannerImages",
    title: "Bottom Banner Images",
    type: "document",
    fields: [
      {
        name: "bannerTitle",
        title: "Banner Title",
        type: "string",
        options: { hotspot: true },
      },
      {
        name: "bannerImage",
        title: "Banner Image",
        type: "image",
        options: { hotspot: true },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "bannerURL",
        title: "Banner URL",
        type: "string",
      },
    ],
  };
  
  export default bottomBanner;
  