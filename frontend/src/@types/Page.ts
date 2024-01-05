export type PageDetail = {
    id: number;
    title: string;
    slug: string;
    body: string;
    is_index: boolean;
    website_title: string;
    website_slug: string;
    website_id: number;
}

export type Page = {
    id: number;
    title: string;
    slug: string;
    body: string;
    is_index: boolean;
    website: {
        id: number;
        title: string;
        subtitle: string;
        slug: string;
        bgcolor: string;
        txtcolor: string;
    };
    menu: { id: number, title: string, slug: string }[];
}

export type ApiGetPages = {
    pages: PageDetail[]
}

export type ApiGetPageData = {
    page: Page
}