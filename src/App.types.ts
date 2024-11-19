export type GalleryItemType = {
  id: string;
  urls: {
    full?: string;
    raw?: string;
    regular?: string;
    small?: string;
    thumb?: string;
  };
  alt_description: string | null;
  likes: number;
};
