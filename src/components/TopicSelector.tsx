
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
  className?: string;
}

const TopicSelector = ({ onSelectTopic, className }: TopicSelectorProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
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
      <h3 className="font-semibold text-gray-700 mb-4 text-lg">Choose a topic</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button
            key={topic}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-gray-200 bg-white hover:bg-app-purple/10 hover:text-app-purple hover:border-app-purple/30 shadow-sm transition-all",
              selectedTopic === topic 
                ? "bg-gradient-candy text-white border-transparent hover:text-white hover:bg-gradient-candy hover:opacity-90" 
                : "text-gray-600"
            )}
            onClick={() => handleSelectTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
