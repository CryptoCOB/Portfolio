/**
 * Reusable Loading Skeleton Components
 */

export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton skeleton-card ${className}`} />
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={className}>
    {[...Array(lines)].map((_, i) => (
      <div key={i} className="skeleton skeleton-text" style={{ width: `${100 - i * 10}%` }} />
    ))}
  </div>
);

export const SkeletonTitle = ({ className = '' }) => (
  <div className={`skeleton skeleton-title ${className}`} />
);

export const ProjectCardSkeleton = () => (
  <div className="glass-card p-6 sm:p-8">
    <SkeletonTitle />
    <SkeletonText lines={4} />
    <div className="flex gap-4 mt-6">
      <div className="skeleton" style={{ width: '100px', height: '40px', borderRadius: '9999px' }} />
      <div className="skeleton" style={{ width: '100px', height: '40px', borderRadius: '9999px' }} />
    </div>
  </div>
);

export const ServiceCardSkeleton = () => (
  <div className="glass-card p-6 sm:p-8">
    <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '1rem' }} />
    <SkeletonTitle />
    <SkeletonText lines={3} />
  </div>
);

export const GridSkeleton = ({ count = 3, CardComponent = SkeletonCard }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {[...Array(count)].map((_, i) => (
      <CardComponent key={i} />
    ))}
  </div>
);
