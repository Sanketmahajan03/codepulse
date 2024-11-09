import { Category } from "src/app/Models/category.model";

export interface BlogPost{
    id:string;
    title :string;
    shortDescription:string;
    content:string;
    featuredUrlImage: string;
    urlHandle: string;
    publishedDate: Date;
    author:string;
    isVisible: boolean;
    categories: Category[];
}