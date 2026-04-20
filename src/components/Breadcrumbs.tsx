import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm">
    <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
      <li>
        <Link to="/" className="inline-flex items-center gap-1 hover:text-primary hover:underline">
          <Home className="h-3.5 w-3.5" aria-hidden /> Home
        </Link>
      </li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary hover:underline">{item.label}</Link>
          ) : (
            <span className="text-foreground font-medium" aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
