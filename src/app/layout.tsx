import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/components/AudioProvider";
import AmbientAudioControl from "@/components/AmbientAudioControl";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "ELAYA Talismans — Des bijoux inspirés de lieux et d'instants",
  description:
    "ELAYA transforme des lieux et des émotions en talismans modernes à porter chaque jour. Sept collections, sept univers émotionnels.",
  openGraph: {
    title: "ELAYA Talismans",
    description: "Des bijoux inspirés de lieux et d'instants. Talismans en édition limitée.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <AudioProvider>
            {children}
            <AmbientAudioControl />
          </AudioProvider>
        </CartProvider>
      </body>
    </html>
  );
}
