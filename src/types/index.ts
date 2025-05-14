import { ReactNode } from 'react';

export type TAuthContextProps = {
  children: ReactNode;
};

export interface Country {
  area?: number;
  capital?: string;
  countryCallingCode?: string;
  emoji?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  name?: string;
  countryCode?: string;
}

export type TUser = {
  profile_id?: string;
  user_id?: string;
  createdAt?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  profession?: ITag;
  profession_id?: string;
  avatar?: string;
  bio?: string;
  location?: Country;
  linkedIn?: string;
  instagram?: string;
  facebook?: string;
  dribble?: string;
  github?: string;
  behance?: string;
  x?: string;
  website?: string;
  number_of_designs?: string | number;
  number_of_likes?: string | number;
  number_of_shares?: string | number;
  number_of_views?: string | number;
};

export type TAppState = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
  user?: TUser | undefined;
};

export enum ETagType {
  GENERAL = 1,
  TOOL = 2,
  FONT = 3,
  PROFESSION = 4,
}

export interface ITag {
  id?: string;
  name?: string;
  type?: ETagType;

  createdAt?: string;
  updatedAt?: string;
}

export interface IFetchTagQuery {
  type?: ETagType;
  search: string;
  page?: number;
  limit?: number;
}

export interface IDesignCategory {
  id?: string;
  name?: string;
  description?: string;
  parent_category_id?: string;
  createdAt?: string;
  updatedAt?: string;
  number_of_designs?: string;
  number_of_views?: string;
}

export interface IFetchDesignCategoryQuery {
  name: string;
  page?: number;
  limit?: number;
}

export type TDesignStatus = 'pending' | 'approved' | 'rejected';

export interface IDesign {
  name?: string;
  description?: string;
  site_icon?: string;
  site_thumbnail?: string;
  user_works_at_place?: boolean;
  link?: string;
  images?: string[];
  tags?: ITag[];
  tools?: ITag[];
  fonts?: any[];
  comment_count?: number;
  categories?: IDesignCategory[];
  location?: Country;

  id?: string;
  avg_rating?: string;
  under_review?: boolean;

  number_of_likes?: string;
  number_of_views?: string;

  approvedAt?: string;
  rejectedAt?: string;

  user?: {
    profile: { username?: string };
    id?: string;
  };
  user_id?: string;
}

export interface IFavourite {
  id?: string;
  user_id?: string;
  design_id?: string;
  collection_id?: string;
  createdAt?: string;
  updatedAt?: string;
  design?: IDesign;
}

export type TNotification = {
  id: string;
  userId: string;
  type: number;
  message: string;
  link: string;
  createdAt: string;
  readAt: string;
};

export type IComment = {
  id?: string;
  content?: string;
  userId?: number;
  designId?: string;
  parentId?: string;
  createdAt?: string;
  replies_count?: number;
};

export type TClaim = {
  design_id: string;
  user_id: string;
  user_works_at_place: boolean;
  role: ITag;
  role_id: string;
  identification_document_url: string;
  additional_document_url: string;
  additional_info: string;
};

export type TContact = {
  name: string;
  company: string;
  phone?: string | null;
  email: string;
  comment: string;
};

export type TInteractions = {
  liked?: boolean;
  favorited?: boolean;
};

export type TContributors = {
  avatars: {};
  total: number;
};

export type TCommentLike = {
  hasLiked: boolean;
};
