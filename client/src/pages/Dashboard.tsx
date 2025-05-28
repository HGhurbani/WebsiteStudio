import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import WebsiteOverview from "@/components/WebsiteOverview";
import PageStructurePanel from "@/components/PageStructurePanel";
import MainEditor from "@/components/MainEditor";
import PropertiesPanel from "@/components/PropertiesPanel";
import { useWebsiteStore } from "@/stores/websiteStore";
import { usePageStore } from "@/stores/pageStore";
import { useEffect } from "react";
import type { Website, Page } from "@shared/schema";

export default function Dashboard() {
  const { setWebsites, setCurrentWebsite } = useWebsiteStore();
  const { setPages, setCurrentPage } = usePageStore();

  const { data: websites, isLoading: websitesLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  const { data: pages, isLoading: pagesLoading } = useQuery<Page[]>({
    queryKey: ["/api/websites/1/pages"],
    enabled: !!websites && websites.length > 0,
  });

  useEffect(() => {
    if (websites && websites.length > 0) {
      setWebsites(websites);
      setCurrentWebsite(websites[0]);
    }
  }, [websites, setWebsites, setCurrentWebsite]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      setPages(pages);
      setCurrentPage(pages[0]);
    }
  }, [pages, setPages, setCurrentPage]);

  if (websitesLoading || pagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-lg text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <WebsiteOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                <PageStructurePanel />
              </div>
              
              <div className="lg:col-span-6">
                <MainEditor />
              </div>
              
              <div className="lg:col-span-3">
                <PropertiesPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
