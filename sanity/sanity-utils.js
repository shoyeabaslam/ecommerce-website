import { createClient, groq } from "next-sanity";
import config from '../sanity/config/client-config' // this is from client-config.js
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(config)

export  function urlFor(source) {
  return builder.image(source)
}


export async function getProducts(category, page, dataPerPage, type,sort) {
  if (type === '' || type === 'all') {
    return createClient(config).fetch(
      groq`*[_type == "products" && category == "${category}"] | order(${sort}) [${page}...${dataPerPage}] {
        _id,
        title,
        "slug": slug.current,
        "image": image.asset->url,
        actualprice,
        price,
        stock,
        category
      }`
    );
  } else {
    return createClient(config).fetch(
      groq`*[_type == "products" && category == "${category}" && '${type}' in tags] | order(${sort}) [${page}...${dataPerPage}] {
        _id,
        title,
        "slug": slug.current,
        "image": image.asset->url,
        actualprice,
        price,
        stock,
        category
      }`
    );
  }
}


// to fetch the total products by its categories
export async function getTotalProducts(category) {
  return createClient(config).fetch(
    groq`*[_type == "products" && category == "${category}"]`
  );
}


export async function getCategories() {
  return createClient(config).fetch(
    groq`*[_type == 'categories']{
      _id,
      category,
      "categoryImage":categoryImage.asset->url,
    }`
  );
}


export async function getSubCategories(category) {
  return createClient(config).fetch(
    groq`*[_type == 'categories' && category == '${category}']{
      _id,
      subcategories
    }`
  );
}



export async function getTopProducts() {
  return createClient(config).fetch(
    groq`*[_type == 'topProducts']{
      _id,
      title,
      "slug":slug.current,
      "image":image.asset->url,
      actualprice,
      price,
      popularTag,
      stock
    }`
  );
}


export async function getDealOfTheDay() {
  return createClient(config).fetch(
    groq`*[_type == 'dealOfTheDay']{
      _id,
      title,
      "slug":slug.current,
      "image":image.asset->url,
      actualprice,
      price,
      percentage,
      stock
    }`
  );
}



// ---------------fetching all product through id for description page-----------------------------

export async function getAllProductsById(myid) {
  return createClient(config).fetch(
    groq`*[_type in ['topProducts', 'dealOfTheDay' ,'products'] && _id =='${myid}']{
      _id,
      title,
      "image":image.asset->url,
      "alternateImages" : alternateImages[].asset->url,
      actualprice,
      price,
      stock,
      popularTag,
      stock,
      description
    }`
  );
}


export async function getAllBannerImages(){
  return createClient(config).fetch(
    groq`*[_type == 'sliderImages']{
      _id,
      "sliderImage":sliderImage.asset->url
    }`
  )
}

export async function getBottomBannerImages(){
  return createClient(config).fetch(
    groq`*[_type == 'bottomBannerImages']{
      _id,
      bannerTitle,
      "bannerImage":bannerImage.asset->url,
      bannerURL
    }`
  )
}

// ----------------------------------------------------------------------

export async function isUserDuplicate(uEmail){
  const result = await createClient(config).fetch(
    groq`*[_type=='usersAccount' && uEmail == '${uEmail}']{
      uEmail,
    }`
  )
  if(result.length == 0){
    return false
  }
  else{
    return true
  }
}

// ----------------------fetting Orders----------------------------------------------
export async function getOrders(){
  return createClient(config).fetch(
    groq`*[_type =='orders']{
      orderId,
      customer,
      items,
      totalPrice,
      orderStatus,
      payment,
      specialInstruction
    }`
  )
}
// --------------------------------------------------



export async function searchItems(query) {
    return createClient(config).fetch(
      groq`*[_type == "products" && (title match ".*${query}*." || category match ".*${query}*." ||tags[] match ".*${query}*." )]{
        _id,
        title,
        "slug": slug.current,
        "image": image.asset->url,
        actualprice,
        price,
        stock,
        category,
        tags
      }`
    );
  } 
