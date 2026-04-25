import type { RegistryItem } from "@/lib/registry";

export function RegistryCard({ item }: { item: RegistryItem }) {
  return (
    <a className="registry-card" href={item.href} aria-label={`Open registry item: ${item.title}`}>
      <span className="registry-card__category">{item.category}</span>
      <h3 className="registry-card__title">{item.title}</h3>
      <p className="registry-card__note">{item.note}</p>
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
        <span className="registry-card__cta">View →</span>
      </div>
    </a>
  );
}
