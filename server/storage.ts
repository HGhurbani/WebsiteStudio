import { 
  websites, 
  pages, 
  headerTemplates,
  type Website, 
  type Page, 
  type HeaderTemplate,
  type InsertWebsite, 
  type InsertPage, 
  type InsertHeaderTemplate 
} from "@shared/schema";

export interface IStorage {
  // Website operations
  getWebsites(): Promise<Website[]>;
  getWebsite(id: number): Promise<Website | undefined>;
  createWebsite(website: InsertWebsite): Promise<Website>;
  updateWebsite(id: number, website: Partial<InsertWebsite>): Promise<Website | undefined>;
  deleteWebsite(id: number): Promise<boolean>;

  // Page operations
  getPages(websiteId: number): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;

  // Header template operations
  getHeaderTemplates(): Promise<HeaderTemplate[]>;
  getHeaderTemplate(id: number): Promise<HeaderTemplate | undefined>;
  createHeaderTemplate(template: InsertHeaderTemplate): Promise<HeaderTemplate>;
}

export class MemStorage implements IStorage {
  private websites: Map<number, Website>;
  private pages: Map<number, Page>;
  private headerTemplates: Map<number, HeaderTemplate>;
  private currentWebsiteId: number;
  private currentPageId: number;
  private currentTemplateId: number;

  constructor() {
    this.websites = new Map();
    this.pages = new Map();
    this.headerTemplates = new Map();
    this.currentWebsiteId = 1;
    this.currentPageId = 1;
    this.currentTemplateId = 1;

    // Initialize with default header templates
    this.initializeHeaderTemplates();
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeHeaderTemplates() {
    const templates = [
      {
        name: "رأس كلاسيكي",
        type: "classic",
        previewImage: "/templates/classic-header.svg"
      },
      {
        name: "رأس وسطي", 
        type: "centered",
        previewImage: "/templates/centered-header.svg"
      },
      {
        name: "رأس عمودي",
        type: "vertical", 
        previewImage: "/templates/vertical-header.svg"
      }
    ];

    templates.forEach(template => {
      const headerTemplate: HeaderTemplate = {
        id: this.currentTemplateId++,
        ...template
      };
      this.headerTemplates.set(headerTemplate.id, headerTemplate);
    });
  }

  private initializeSampleData() {
    // Create sample website
    const website: Website = {
      id: this.currentWebsiteId++,
      name: "موقع الشركة الرئيسي",
      domain: "company-main.com", 
      primaryLanguage: "ar",
      supportedLanguages: ["ar", "en"],
      primaryColor: "#1976D2",
      secondaryColor: "#424242",
      fontFamily: "Noto Sans Arabic",
      isActive: true
    };
    this.websites.set(website.id, website);

    // Create sample page
    const page: Page = {
      id: this.currentPageId++,
      websiteId: website.id,
      title: "الصفحة الرئيسية",
      slug: "home",
      headerTemplate: "classic",
      headerContent: {
        title: "شركتنا",
        navigationLinks: [
          { label: "الرئيسية", url: "/", order: 1 },
          { label: "عن الشركة", url: "/about", order: 2 },
          { label: "الخدمات", url: "/services", order: 3 },
          { label: "تواصل معنا", url: "/contact", order: 4 }
        ]
      },
      sections: [
        {
          id: "hero-1",
          type: "hero",
          order: 1,
          content: {
            title: "مرحباً بكم في شركتنا",
            description: "نقدم أفضل الحلول التقنية المبتكرة لنمو أعمالكم",
            buttonText: "ابدأ الآن",
            buttonUrl: "#services",
            backgroundType: "gradient",
            backgroundValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }
        },
        {
          id: "services-1", 
          type: "services",
          order: 2,
          content: {
            title: "خدماتنا المميزة",
            services: [
              {
                title: "تطوير المواقع",
                description: "نصمم ونطور مواقع ويب احترافية وسريعة",
                icon: "fas fa-code"
              },
              {
                title: "تطبيقات الجوال", 
                description: "تطبيقات ذكية لنظامي iOS و Android",
                icon: "fas fa-mobile-alt"
              },
              {
                title: "التسويق الرقمي",
                description: "استراتيجيات تسويقية متقدمة لنمو أعمالكم", 
                icon: "fas fa-chart-line"
              }
            ]
          }
        }
      ],
      isPublished: true
    };
    this.pages.set(page.id, page);
  }

  // Website operations
  async getWebsites(): Promise<Website[]> {
    return Array.from(this.websites.values());
  }

  async getWebsite(id: number): Promise<Website | undefined> {
    return this.websites.get(id);
  }

  async createWebsite(insertWebsite: InsertWebsite): Promise<Website> {
    const id = this.currentWebsiteId++;
    const website: Website = { ...insertWebsite, id };
    this.websites.set(id, website);
    return website;
  }

  async updateWebsite(id: number, websiteUpdate: Partial<InsertWebsite>): Promise<Website | undefined> {
    const website = this.websites.get(id);
    if (!website) return undefined;
    
    const updatedWebsite = { ...website, ...websiteUpdate };
    this.websites.set(id, updatedWebsite);
    return updatedWebsite;
  }

  async deleteWebsite(id: number): Promise<boolean> {
    const deleted = this.websites.delete(id);
    // Also delete associated pages
    Array.from(this.pages.entries()).forEach(([pageId, page]) => {
      if (page.websiteId === id) {
        this.pages.delete(pageId);
      }
    });
    return deleted;
  }

  // Page operations
  async getPages(websiteId: number): Promise<Page[]> {
    return Array.from(this.pages.values()).filter(page => page.websiteId === websiteId);
  }

  async getPage(id: number): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const id = this.currentPageId++;
    const page: Page = { ...insertPage, id };
    this.pages.set(id, page);
    return page;
  }

  async updatePage(id: number, pageUpdate: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pages.get(id);
    if (!page) return undefined;
    
    const updatedPage = { ...page, ...pageUpdate };
    this.pages.set(id, updatedPage);
    return updatedPage;
  }

  async deletePage(id: number): Promise<boolean> {
    return this.pages.delete(id);
  }

  // Header template operations
  async getHeaderTemplates(): Promise<HeaderTemplate[]> {
    return Array.from(this.headerTemplates.values());
  }

  async getHeaderTemplate(id: number): Promise<HeaderTemplate | undefined> {
    return this.headerTemplates.get(id);
  }

  async createHeaderTemplate(insertTemplate: InsertHeaderTemplate): Promise<HeaderTemplate> {
    const id = this.currentTemplateId++;
    const template: HeaderTemplate = { ...insertTemplate, id };
    this.headerTemplates.set(id, template);
    return template;
  }
}

export const storage = new MemStorage();
