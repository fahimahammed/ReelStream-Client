export interface IVideo {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
    uploadedBy: string;
    likeCount: number;
    viewCount: number;
    user: {
        name: string;
    };
}

export interface IMeta {
    total: number;
    page: number;
    limit: number;
}
