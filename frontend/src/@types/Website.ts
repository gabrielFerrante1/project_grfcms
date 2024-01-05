import { Page  } from "./Page";

export type Website = {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    bgcolor: string;
    txtcolor: string;
    count_views: number
}

export type WebsiteDetail = {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    bgcolor: string;
    txtcolor: string;
    menu: { id: number, title: string, slug: string }[];
    authorized: boolean;
    index_page: null | Page;
    user_id: number
}

export type ApiGetWebsites = {
    count: number;
    next: string;
    previous: string;
    results: Website[]
}

export type ApiGetWebsiteData = {
    website: WebsiteDetail
}