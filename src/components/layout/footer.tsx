import { Camera, Mail, Music2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card/70">
      <div className="container-padded grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="font-serif text-2xl font-semibold text-primary">
            Lullaby Candle Co.
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Hand-poured candles for quiet rituals, beautiful gifting, and homes that feel softly lit from within.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/products" className="hover:text-primary">
              Shop candles
            </Link>
            <Link href="/#about" className="hover:text-primary">
              Our story
            </Link>
            <Link href="/#contact" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Social</h3>
          <div className="mt-4 flex gap-3">
            <a className="rounded-full border p-3 hover:bg-secondary" href="https://instagram.com" aria-label="Instagram">
              <Camera className="h-4 w-4" />
            </a>
            <a className="rounded-full border p-3 hover:bg-secondary" href="mailto:hello@example.com" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a className="rounded-full border p-3 hover:bg-secondary" href="https://tiktok.com" aria-label="TikTok">
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        (c) {new Date().getFullYear()} Lullaby Candle Co. All rights reserved.
      </div>
    </footer>
  );
}
