// Define TypeScript types for the JSON structure
export type NewsEntry = {
    title: string;
    blurb: string;
    date: string;
    url: string;
};

export type ApiResponse = {
    entries: NewsEntry[];
};