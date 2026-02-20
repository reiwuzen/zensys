import { useEffect, useMemo, useState } from "react";
import "./overview.scss";
import { useLibrary } from "@/hooks/useLibrary";
import type { VersionedPage } from "@/types/page";
import { formatToLocaleDateTime } from "@/helper/formatToLocaleDateTime";

const Skeleton = ({ className = "" }: { className?: string }) => {
  return <div className={`skeleton ${className}`} />;
};

const OverviewSkeleton = () => {
  return (
    <div className="overview">
      <div className="overview-search-bar">
        <Skeleton className="skeleton-input" />
      </div>

      <div className="overview-section">
        <div className="overview-block">
          <h2>Last Opened</h2>
          <div className="overview-scroll">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton-card">
                <Skeleton className="skeleton-title" />
                <Skeleton className="skeleton-line" />
                <Skeleton className="skeleton-line short" />
              </div>
            ))}
          </div>
        </div>

        <div className="overview-block">
          <h2>Last Updated</h2>
          <div className="overview-scroll">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton-card">
                <Skeleton className="skeleton-title" />
                <Skeleton className="skeleton-line" />
                <Skeleton className="skeleton-line short" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const { pagesStore,pageActions } = useLibrary();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lastOpenedPages: VersionedPage[] = useMemo(
    () =>
      [...pagesStore.pages]
        .filter((p) => p.pageMeta.lastOpenedAt.trim() !== "")
        .sort((a, b) =>
          b.pageMeta.lastOpenedAt.localeCompare(
            a.pageMeta.lastOpenedAt,
          ),
        ),
    [pagesStore.pages],
  );

  const lastUpdatedPages: VersionedPage[] = useMemo(
    () =>
      [...pagesStore.pages]
        .filter((p) => p.pageMeta.lastUpdatedAt.trim() !== "")
        .sort((a, b) =>
          b.pageMeta.lastUpdatedAt.localeCompare(
            a.pageMeta.lastUpdatedAt,
          ),
        ),
    [pagesStore.pages],
  );

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    (async () => {
      await pageActions.pages
        .load()
        .catch((err) => {
          if (!cancelled) setError(String(err));
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <OverviewSkeleton />;

  if (error) {
    return <div className="overview error">{error}</div>;
  }

  return (
    <div className="overview loaded">
      <div className="overview-search-bar">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="search" placeholder="Search memories..." />
      </div>

      <div className="overview-section">
        <div className="overview-block">
          <h2>Last Opened</h2>
          <div className="overview-scroll">
            {lastOpenedPages.map((p) => (
              <div key={p.pageMeta.id} className="card">
                <h3>{p.pageMeta.title}</h3>
                <p>{formatToLocaleDateTime(p.pageMeta.lastOpenedAt)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-block">
          <h2>Last Updated</h2>
          <div className="overview-scroll">
            {lastUpdatedPages.map((p) => (
              <div key={p.pageMeta.id} className="card">
                <h3>{p.pageMeta.title}</h3>
                <p>{formatToLocaleDateTime(p.pageMeta.lastUpdatedAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
