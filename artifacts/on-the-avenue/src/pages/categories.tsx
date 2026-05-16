import { useOtaListCategories } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Map } from "lucide-react";

export function Categories() {
  const { data: categories, isLoading } = useOtaListCategories();

  return (
    <div className="pb-32 bg-muted/10">
      {/* Header */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight text-foreground">Categories</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Browse the avenue by category to find exactly what you're looking for today.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-40 w-full rounded-3xl bg-muted" />
              ))}
            </div>
          ) : categories?.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border text-muted-foreground shadow-sm">
              No categories available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map(category => (
                <Link 
                  key={category.slug} 
                  href={`/categories/${category.slug}`}
                  className="group block relative overflow-hidden bg-card border border-border rounded-3xl hover:border-primary/40 hover:shadow-md transition-all duration-300 p-8"
                  data-testid={`card-category-${category.slug}`}
                >
                  <div className="flex justify-between items-start relative z-10 h-full flex-col">
                    <div className="w-full">
                      <div className="w-12 h-12 rounded-full bg-muted mb-6 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                         <Map className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h2 className="text-2xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors tracking-tight">{category.label}</h2>
                    </div>
                    
                    <div className="w-full flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <span className="text-sm text-muted-foreground font-medium">
                        {category.count} places
                      </span>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}