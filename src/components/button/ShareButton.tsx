"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Share2 } from 'lucide-react';
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaWhatsappSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';

export function ShareButton() {
  const songLink = window.location.href;

  const handleCopy = () => {
    if (songLink) {
      navigator.clipboard.writeText(songLink);
      toast.success('Link copied to clipboard');
    }
  };

  const handleRedirect = (url: string) => {
    navigator.clipboard.writeText(songLink);
    window.open(url, '_blank');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Share2
          strokeWidth={1.25}
          size={22}
          className="text-black cursor-pointer dark:text-white"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-2">Share</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <ul className="flex items-center gap-4 justify-normal">
                <li
                  onClick={() =>
                    handleRedirect(
                      `https://www.instagram.com/?url=${encodeURIComponent(
                        songLink
                      )}`
                    )
                  }
                >
                  <FaInstagramSquare
                    size={50}
                    className="text-black cursor-pointer dark:text-white"
                  />
                </li>
                <li
                  onClick={() =>
                    handleRedirect(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        songLink
                      )}`
                    )
                  }
                >
                  <FaFacebookSquare
                    size={50}
                    className="text-black cursor-pointer dark:text-white"
                  />
                </li>
                <li
                  onClick={() =>
                    handleRedirect(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        songLink
                      )}`
                    )
                  }
                >
                  <FaSquareXTwitter
                    size={50}
                    className="text-black cursor-pointer dark:text-white"
                  />
                </li>
                <li
                  onClick={() =>
                    handleRedirect(
                      `https://api.whatsapp.com/send?text=${encodeURIComponent(
                        songLink
                      )}`
                    )
                  }
                >
                  <FaWhatsappSquare
                    size={50}
                    className="text-black cursor-pointer dark:text-white"
                  />
                </li>
                <li
                  onClick={() =>
                    handleRedirect(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        songLink
                      )}`
                    )
                  }
                >
                  <FaLinkedin
                    size={50}
                    className="text-black cursor-pointer dark:text-white"
                  />
                </li>
              </ul>
              <div className="mt-4">
                <Input value={songLink} readOnly />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCopy}>Copy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
