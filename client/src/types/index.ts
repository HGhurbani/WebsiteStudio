export interface NavigationLink {
  label: string;
  url: string;
  order: number;
}

export interface HeaderContent {
  logo?: string;
  title: string;
  navigationLinks: NavigationLink[];
}

export interface SectionBase {
  id: string;
  type: "hero" | "services" | "gallery" | "video" | "text";
  order: number;
  content: any;
  styling?: any;
}

export interface HeroSection extends SectionBase {
  type: "hero";
  content: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl?: string;
    backgroundType: "gradient" | "image" | "color";
    backgroundValue: string;
  };
}

export interface ServicesSection extends SectionBase {
  type: "services";
  content: {
    title: string;
    services: Array<{
      title: string;
      description: string;
      icon: string;
      url?: string;
    }>;
  };
}

export interface GallerySection extends SectionBase {
  type: "gallery";
  content: {
    title: string;
    images: Array<{
      url: string;
      alt: string;
      caption?: string;
    }>;
    layout: "grid" | "masonry" | "carousel";
  };
}

export interface VideoSection extends SectionBase {
  type: "video";
  content: {
    title: string;
    videoUrl: string;
    thumbnail?: string;
    description?: string;
  };
}

export interface TextSection extends SectionBase {
  type: "text";
  content: {
    title?: string;
    content: string;
    alignment: "left" | "center" | "right";
  };
}

export type PageSection = HeroSection | ServicesSection | GallerySection | VideoSection | TextSection;

export interface WidgetType {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: "hero" | "services" | "gallery" | "video" | "text";
}
