"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ErrorReportDialog from "@/components/ErrorReportDialog";
import ShareDialog from "@/components/ShareDialog";

import {
  Phone,
  MessageCircle,
  AlertCircle,
  Navigation,
  Share2,
} from "lucide-react";

const QuickListingActions = ({ phone, googleMapUrl }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(!isDialogOpen);
  const toggleShareDialog = () => setShareDialogOpen(!isShareDialogOpen);

  return (
    <>
      <ScrollArea className="whitespace-nowrap px-3">
        <div className="flex items-center space-x-3 justify-center">
          <Button
            asChild
            variant="outline"
            className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
          >
            <Link href={"#reviews"}>
              <MessageCircle size={12} className="mr-2" />
              Dodaj opinię
            </Link>
          </Button>

          {googleMapUrl && (
            <Button
              asChild
              variant="outline"
              className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
            >
              <Link href={googleMapUrl} target="_blank">
                <Navigation size={12} className="mr-2" />
                Nawiguj
              </Link>
            </Button>
          )}

          {phone && (
            <Button
              asChild
              variant="outline"
              className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
            >
              <Link href={`tel:${phone}`}>
                <Phone size={12} className="mr-2" />
                Zadzwoń
              </Link>
            </Button>
          )}
          <Button
            onClick={toggleShareDialog}
            variant="outline"
            className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
          >
            <Share2 size={12} className="mr-2" />
            Udostępnij
          </Button>
          <Button
            onClick={toggleDialog}
            variant="outline"
            className="flex items-center rounded-full hover:bg-white hover:border-gray-500"
          >
            <AlertCircle size={12} className="mr-2" />
            Zgłoś błąd
          </Button>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ErrorReportDialog isOpen={isDialogOpen} onClose={toggleDialog} />

      <ShareDialog isOpen={isShareDialogOpen} onClose={toggleShareDialog} />
    </>
  );
};
export default QuickListingActions;
