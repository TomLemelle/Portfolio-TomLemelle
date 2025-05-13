import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  categories: string[];
  date?: string;
  client?: string;
  link?: string;
  technologies: ITechnologie[];
  thumbnail: string;
  images: string[];
  featured?: boolean;
}

export interface ITechnologie {
  name: string;
  url: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  features: {
    title: string;
    items: string[];
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export type Language = "en" | "fr" | "it";
