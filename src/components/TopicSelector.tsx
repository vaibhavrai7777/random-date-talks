
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
  className?: string;
  selectedTopic?: string | null;
}

const TopicSelector = ({ onSelectTopic, className, selectedTopic: externalSelectedTopic }: TopicSelectorProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(externalSelectedTopic || null);
  
  useEffect(() => {
    if (externalSelectedTopic !== undefined) {
      setSelectedTopic(externalSelectedTopic);
    }
  }, [externalSelectedTopic]);
  
  const topics = [
    "Dating Apps",
    "First Dates",
    "Relationships",
    "Breakups",
    "Online Dating",
    "Dating Profile",
    "Conversation Starters",
    "Red Flags",
    "Long Distance",
  ];
  
  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    onSelectTopic(topic);
  };
  
  return (
    <div className={cn("py-6", className)}>
      <h3 className="font-semibold text-gray-700 mb-4 text-lg flex items-center gap-2">
        <Heart className="h-5 w-5 text-pink-500" />
        Choose a topic
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button
            key={topic}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-gray-200 bg-white hover:bg-app-purple/10 hover:text-app-purple hover:border-app-purple/30 shadow-sm transition-all transform hover:scale-105",
              selectedTopic === topic 
                ? "bg-gradient-candy text-white border-transparent hover:text-white hover:bg-gradient-candy hover:opacity-90" 
                : "text-gray-600"
            )}
            onClick={() => handleSelectTopic(topic)}
          >
            {topic}
            {selectedTopic === topic && (
              <span className="ml-1 text-xs">✓</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
