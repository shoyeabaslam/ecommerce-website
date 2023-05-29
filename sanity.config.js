import { defineConfig} from "sanity";
import schemas from './sanity/schemas';
import {deskTool} from 'sanity/desk'


const config = defineConfig({
    projectId : 'oqxfb1x1',
    dataset : 'production',
    title : 'my-ecommerce-website',
    apiVersion : '2023-05-07',
    basePath : '/admin',
    plugins : [deskTool()],
    schema : {types:schemas},
    
})


export default config;