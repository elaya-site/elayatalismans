import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/components/AudioProvider";
import AmbientAudioControl from "@/components/AmbientAudioControl";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "ELAYA Talismans — Bijoux acier inoxydable doré | 7 collections",
  description:
    "Bijoux en acier inoxydable doré inspirés de lieux et d'émotions. 7 collections — Santa Fe, Cheyenne, Newport, Sequoia, Wakan Tanka, New York, Royal Castle. Livraison France 3,90€.",
  keywords: "bijoux acier inoxydable, collier femme, bracelet femme, boucles d'oreilles, bague femme, bijoux dorés, talismans, ELAYA",
  openGraph: {
    title: "ELAYA Talismans — Bijoux acier inoxydable doré",
    description: "7 collections de bijoux inspirées de lieux et d'émotions. Acier inoxydable doré, hypoallergénique, livraison France.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.elayatalismans.com",
    siteName: "ELAYA Talismans",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.elayatalismans.com",
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
