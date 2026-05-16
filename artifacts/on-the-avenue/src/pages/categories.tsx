import { useOtaListCategories } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export function Categories() {
  const { data: categories, isLoading } = useOtaListCategories();

  return (
    <div className="pb-32">
      {/* Header */}
      <section className="bg-muted/30 border-b border-border py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Navigation</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">Categories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Explore the avenue by interest. From culinary experiences to wellness retreats.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-32 w-full rounded-none" />
              ))}
            </div>
          ) : categories?.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Categories forming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {categories?.map(category => (
                <Link 
                  key={category.slug} 
                  href={`/categories/${category.slug}`}
                  className="group block relative overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-colors p-8 md:p-10"
                  data-testid={`card-category-${category.slug}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <h2 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">{category.label}</h2>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">{category.count} {category.count === 1 ? 'Location' : 'Locations'}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}