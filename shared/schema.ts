import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").notNull().unique(),
  primaryLanguage: text("primary_language").notNull().default("ar"),
  supportedLanguages: json("supported_languages").$type<string[]>().notNull().default(["ar", "en"]),
  primaryColor: text("primary_color").notNull().default("#1976D2"),
  secondaryColor: text("secondary_color").notNull().default("#424242"),
  fontFamily: text("font_family").notNull().default("Noto Sans Arabic"),
  isActive: boolean("is_active").notNull().default(true),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  headerTemplate: text("header_template").notNull().default("classic"),
  headerContent: json("header_content").$type<{
    logo?: string;
    title: string;
    navigationLinks: Array<{ label: string; url: string; order: number }>;
  }>().notNull(),
  sections: json("sections").$type<Array<{
    id: string;
    type: "hero" | "services" | "gallery" | "video" | "text";
    order: number;
    content: any;
    styling?: any;
  }>>().notNull().default([]),
  isPublished: boolean("is_published").notNull().default(false),
});

export const headerTemplates = pgTable("header_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // classic, centered, vertical
  previewImage: text("preview_image"),
});

export const insertWebsiteSchema = createInsertSchema(websites).omit({
  id: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
});

export const insertHeaderTemplateSchema = createInsertSchema(headerTemplates).omit({
  id: true,
});

export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;
export type Website = typeof websites.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertHeaderTemplate = z.infer<typeof insertHeaderTemplateSchema>;
export type HeaderTemplate = typeof headerTemplates.$inferSelect;

// Widget type definitions
export type WidgetType = "hero" | "services" | "gallery" | "video" | "text";

export interface HeroContent {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl?: string;
  backgroundType: "gradient" | "image" | "color";
  backgroundValue: string;
}

export interface ServiceContent {
  title: string;
  description: string;
  icon: string;
  url?: string;
}

export interface ServicesContent {
  title: string;
  services: ServiceContent[];
}

export interface GalleryContent {
  title: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  layout: "grid" | "masonry" | "carousel";
}

export interface VideoContent {
  title: string;
  videoUrl: string;
  thumbnail?: string;
  description?: string;
}

export interface TextContent {
  title?: string;
  content: string;
  alignment: "left" | "center" | "right";
}
