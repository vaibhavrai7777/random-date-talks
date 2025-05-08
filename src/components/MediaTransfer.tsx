
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Image, Contact } from "lucide-react";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";

interface MediaTransferProps {
  onSendMedia: (type: string, content: string) => void;
  isConnected: boolean;
}

const MediaTransfer = ({ onSendMedia, isConnected }: MediaTransferProps) => {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // In a real app, we would upload the file and get a URL back
    // For demo purposes, we'll just create a placeholder URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onSendMedia(type, content);
      toast({
        title: "Media sent",
        description: `Your ${type} has been shared successfully.`,
      });
    };
    reader.readAsDataURL(file);
  };
  
  const simulateContactShare = () => {
    // For demo, we'll just share a mock contact
    const mockContact = {
      name: "Alex Johnson",
      phone: "+1 (555) 123-4567",
      email: "alex@example.com"
    };
    
    onSendMedia("contact", JSON.stringify(mockContact));
    toast({
      title: "Contact shared",
      description: "Contact information has been shared successfully.",
    });
  };
  
  if (!isConnected) {
    return null;
  }
  
  return (
    <div className="flex space-x-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-app-purple/10 hover:text-app-purple"
            onClick={() => setActiveMedia("image")}
          >
            <Image className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share an image</DrawerTitle>
            <DrawerDescription>
              Upload an image to share in the conversation
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex flex-col items-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 w-full max-w-md text-center">
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, "image")} 
                />
                <div className="flex flex-col items-center">
                  <Image className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to select an image</span>
                </div>
              </label>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-app-purple/10 hover:text-app-purple"
            onClick={() => setActiveMedia("camera")}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Take a photo</DrawerTitle>
            <DrawerDescription>
              Take a photo with your camera to share
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex flex-col items-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 w-full max-w-md text-center">
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, "camera")} 
                />
                <div className="flex flex-col items-center">
                  <Camera className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to take a photo</span>
                </div>
              </label>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-app-purple/10 hover:text-app-purple"
            onClick={() => setActiveMedia("contact")}
          >
            <Contact className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share a contact</DrawerTitle>
            <DrawerDescription>
              Share contact information in the conversation
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex flex-col items-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 w-full max-w-md">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Alex Johnson</h4>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">alex@example.com</p>
                </div>
                <Button className="w-full" onClick={simulateContactShare}>Share this contact</Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MediaTransfer;
