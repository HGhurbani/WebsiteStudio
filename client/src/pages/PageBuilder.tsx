import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import PageStructurePanel from "@/components/PageStructurePanel";
import MainEditor from "@/components/MainEditor";
import PropertiesPanel from "@/components/PropertiesPanel";
import { useWebsiteStore } from "@/stores/websiteStore";
import { usePageStore } from "@/stores/pageStore";
import type { Website, Page } from "@shared/schema";

export default function PageBuilder() {
  const [, params] = useRoute("/websites/:websiteId/pages/:pageId");
  const websiteId = params?.websiteId ? parseInt(params.websiteId) : 0;
  const pageId = params?.pageId ? parseInt(params.pageId) : 0;

  const { currentWebsite, setCurrentWebsite } = useWebsiteStore();
  const { currentPage, setCurrentPage } = usePageStore();

  const { data: website, isLoading: websiteLoading } = useQuery<Website>({
    queryKey: ["/api/websites", websiteId],
    enabled: !!websiteId,
  });

  const { data: page, isLoading: pageLoading } = useQuery<Page>({
    queryKey: ["/api/pages", pageId],
    enabled: !!pageId,
  });

  useEffect(() => {
    if (website) {
      setCurrentWebsite(website);
    }
  }, [website, setCurrentWebsite]);

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [page, setCurrentPage]);

  if (websiteLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-lg text-gray-600">جاري تحميل محرر الصفحات...</p>
        </div>
      </div>
    );
  }

  const handlePreview = () => {
    if (currentWebsite && currentPage) {
      // This would open a new window with the live preview
      window.open(`/preview/${currentWebsite.domain}/${currentPage.slug}`, "_blank");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          websiteName={currentWebsite?.name}
          onPreview={handlePreview}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
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

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 left-6 lg:hidden">
        <button className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
          <i className="fas fa-plus text-xl"></i>
        </button>
      </div>
    </div>
  );
}
