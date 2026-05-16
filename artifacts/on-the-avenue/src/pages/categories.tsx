import { useOtaListCategories } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Map } from "lucide-react";

export function Categories() {
  const { data: categories, isLoading } = useOtaListCategories();

  return (
    <div className="pb-32">
      {/* Header */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-primary">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter">GRID <span className="text-primary neon-text">SECTORS</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Navigate the avenue by operational category. Select a sector to view active nodes.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-40 w-full rounded-3xl bg-white/5" />
              ))}
            </div>
          ) : categories?.length === 0 ? (
            <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 text-muted-foreground font-mono">
              NO SECTORS INITIALIZED
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map(category => (
                <Link 
                  key={category.slug} 
                  href={`/categories/${category.slug}`}
                  className="group block relative overflow-hidden bg-card border border-white/10 rounded-3xl hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] transition-all duration-300 p-8"
                  data-testid={`card-category-${category.slug}`}
                >
                  <div className="flex justify-between items-start relative z-10 h-full flex-col">
                    <div className="w-full">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                         <Map className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{category.label}</h2>
                    </div>
                    
                    <div className="w-full flex items-center justify-between mt-8 pt-6 border-t border-white/10 group-hover:border-primary/20 transition-colors">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        <span className="text-white font-bold">{category.count}</span> NODES ONLINE
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none"></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
