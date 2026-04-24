import type { RegistryItem } from "@/lib/registry";

export function RegistryCard({ item }: { item: RegistryItem }) {
  return (
    <article className="registry-card">
      <div className="registry-card__meta">
        <span>{item.category}</span>
        <span>{item.retailer}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.note}</p>
      <div className="registry-card__footer">
        <div className="price-block" aria-label="Price">
          {item.salePrice ? (
            <>
              <span className="price-block__sale">{item.salePrice}</span>
              <span className="price-block__original">{item.price}</span>
            </>
          ) : (
            <span>{item.price}</span>
          )}
        </div>
        <a className="text-link" href={item.href} aria-label={`Open registry item: ${item.title}`}>
          View item
        </a>
      </div>
    </article>
  );
}
