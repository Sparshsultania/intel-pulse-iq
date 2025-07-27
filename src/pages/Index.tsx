import { Chatbot } from "@/components/Chatbot";
import { TopMovers } from "@/components/TopMovers";

const Index = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Main Content - Chatbot */}
      <div className="flex-1 mb-6">
        <Chatbot />
      </div>

      {/* Bottom Section - Top Movers */}
      <div className="mt-auto">
        <TopMovers />
      </div>
    </div>
  );
};

export default Index;
