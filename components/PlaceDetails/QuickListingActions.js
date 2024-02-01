"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import {
  Phone,
  MessageCircle,
  AlertCircle,
  Navigation,
  Share2,
} from "lucide-react";

const QuickListingActions = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
        >
          <MessageCircle size={12} className="mr-2" />
          Dodaj opinię
        </Button>
        <Button
          variant="outline"
          className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
        >
          <Navigation size={12} className="mr-2" />
          Nawiguj
        </Button>
        <Button
          variant="outline"
          className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
        >
          <Phone size={12} className="mr-2" />
          Zadzwoń
        </Button>
        <Button
          variant="outline"
          className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
        >
          <Share2 size={12} className="mr-2" />
          Udostępnij
        </Button>
        <Button
          variant="outline"
          className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
        >
          <AlertCircle size={12} className="mr-2" />
          Zgłoś błąd
        </Button>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
export default QuickListingActions;
