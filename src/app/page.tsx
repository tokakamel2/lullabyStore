import { ArrowRight, Flame, Gift, Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/features/products/product-card";
import { getProducts } from "@/features/products/api";

export default async function HomePage() {
  const featuredProducts = await getProducts({ activeOnly: true, featuredOnly: true });

  return (
    <div>
      <section className="container-padded grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-primary">Hand-poured serenity</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Candles made for soft homes and slower evenings.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover feminine, premium soy candles crafted in small batches with layered scents, elegant vessels, and
            a warm glow that turns everyday routines into rituals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">Our story</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-accent blur-3xl" />
          <div className="relative overflow-hidden rounded-[3rem] border bg-card p-4 shadow-xl">
            <div className="rounded-[2.4rem] bg-[linear-gradient(135deg,hsl(342_47%_88%),hsl(31_64%_91%))] p-8">
              <div className="mx-auto flex aspect-[4/5] max-w-sm flex-col justify-end rounded-[2rem] border border-white/60 bg-white/45 p-8 shadow-inner backdrop-blur">
                <Flame className="mb-8 h-14 w-14 text-primary" />
                <p className="font-serif text-4xl font-semibold">The Signature Glow Edit</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Floral, gourmand, fresh, and woody candles poured with clean soy wax and cotton wicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padded py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Featured products</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Customer-loved candles</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="container-padded py-16">
        <Card className="overflow-hidden bg-card/85">
          <CardContent className="grid gap-10 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
            <div className="rounded-[2rem] bg-secondary p-8">
              <Heart className="h-10 w-10 text-primary" />
              <h2 className="mt-8 font-serif text-4xl font-semibold">Made by hand, finished with feeling.</h2>
            </div>
            <div className="space-y-5 text-muted-foreground">
              <p className="text-lg leading-8">
                Lullaby Candle Co. began as a love letter to quiet evenings: the first match strike, the blooming scent,
                and the little pause that makes a room feel held.
              </p>
              <p className="leading-7">
                Each candle is poured in small batches, cured with patience, and packaged for beautiful gifting. We use
                soy wax, thoughtfully blended fragrance oils, and vessels chosen to live on after the final burn.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border bg-background/70 p-5">
                  <Gift className="mb-3 h-5 w-5 text-primary" />
                  Premium gifting details
                </div>
                <div className="rounded-3xl border bg-background/70 p-5">
                  <Flame className="mb-3 h-5 w-5 text-primary" />
                  Clean, slow-burning glow
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="contact" className="container-padded py-16">
        <div className="rounded-[3rem] border bg-primary px-8 py-12 text-primary-foreground shadow-xl md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] opacity-80">Contact</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-serif text-4xl font-semibold">Need a custom candle gift box?</h2>
              <p className="mt-4 max-w-2xl leading-7 opacity-85">
                Send us your event date, preferred scent family, and quantity. We will help you create a soft,
                memorable candle moment.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <a href="mailto:hello@example.com">hello@example.com</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
