import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/components/AudioProvider";
import AmbientAudioControl from "@/components/AmbientAudioControl";
import VacationBanner from "@/components/VacationBanner";
import { CartProvider } from "@/context/CartContext";
import { VACATION_MODE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "ELAYA Talismans — Bijoux bohème dorés | Acier inoxydable résistant",
  description:
    "Bijoux bohème en acier inoxydable doré — colliers, bracelets, boucles d'oreilles et bagues tendance. Résistants à l'eau, hypoallergéniques, inspirés de grands voyages. 7 collections uniques. Livraison France dès 3,90€.",
  keywords: [
    "bijoux bohème",
    "bijoux tendance femme",
    "bijoux acier inoxydable doré",
    "collier femme bohème",
    "bracelet femme doré",
    "boucles d'oreilles tendance",
    "bague femme acier",
    "bijoux résistants eau",
    "bijoux hypoallergéniques",
    "bijoux western",
    "bijoux talisman",
    "bijoux inspirés voyage",
    "bijoux ne ternissent pas",
    "bijoux cadeau femme",
    "ELAYA talismans",
  ].join(", "),
  openGraph: {
    title: "ELAYA Talismans — Bijoux bohème dorés",
    description: "Colliers, bracelets, boucles d'oreilles et bagues bohème en acier inoxydable doré. Résistants, hypoallergéniques, inspirés de grands voyages.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.elayatalismans.com",
    siteName: "ELAYA Talismans",
    images: [{ url: "/assets/home-hero.png", width: 1200, height: 630, alt: "ELAYA Talismans — Bijoux bohème dorés" }],
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
        {/* Meta Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2439752579771130');
          fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2439752579771130&ev=PageView&noscript=1"/>` }} />
      </head>
      <body suppressHydrationWarning className={VACATION_MODE ? "has-vacation-banner" : undefined}>
        {VACATION_MODE && <VacationBanner />}
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
