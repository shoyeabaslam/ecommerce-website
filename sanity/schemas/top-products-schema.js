const home_products = {
    "name": "topProducts",
    "title": "Top Products",
    "type": "document",
    "fields": [
      {
        "name": "title",
        "type": "string",
        "title": "Title",
        "validation": Rule => Rule.required()
      },
      {
        "name": "slug",
        "type": "slug",
        "title": "Slug",
        "options": {
          "source": "title",
          "maxLength": 96
        },
        "validation": Rule => Rule.required()
      },
      {
        "name": "image",
        "type": "image",
        "title": "Image",
        "options":{hotspot:true},
        "validation": Rule => Rule.required()
      },
      {
        "name": "alternateImages",
        "type": "array",
        "title": "Alternate Images",
        "of": [
          {
            "type": "image",
            "title": "Alternate Image",
            "options": {
              "hotspot": true
            },
          }
        ],
        "validation": Rule => Rule.max(3)
      },
      {
        "name": "actualprice",
        "type": "number",
        "title": "Actual Price",
        "validation": Rule => Rule.required().positive()
      },
      {
        "name": "price",
        "type": "number",
        "title": "Price",
        "validation": Rule => Rule.required().positive()
      },
      {
        'name': 'popularTag',
        'title': 'Popular Tag',
        'type': 'string',
        'options': {
          'list': [
            { 'title': 'Best Seller', 'value': 'Best Seller' },
            { 'title': 'New Arrival', 'value': 'New Arrival' },
            { 'title': 'Trending', 'value': 'Trending' },
            { 'title': 'Hot Deal', 'value': 'Hot Deal' }
          ],
          'layout': 'radio' // Specifies radio button layout
        }
      },
      {
        "name": "stock",
        "type": "string",
        "title": "Stock",
        "options": {
          "list": [
            { "title": "Available", "value": "available" },
            { "title": "Out of stock", "value": "outOfStock" }
          ],
          "layout": "radio"
        }
      },
      {
        "name" : "category",
        "title" : "Category",
        "type" : "string",
        "validation": Rule => Rule.required()
  
      },
      {
        "name": "description",
        "title": "Description",
        "type": "array",
        of:[{type:"block"}],
        "validation": Rule => Rule.required()
      },
      
    ]
  }
  
  
  export default home_products