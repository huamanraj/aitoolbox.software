export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl p-4 animate-pulse space-y-4">
      <div className="h-56 w-full bg-muted rounded-lg" />
      <div className="h-8 w-2/3 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-5/6 bg-muted rounded" />
      <div className="h-4 w-4/6 bg-muted rounded" />
    </div>
  );
}


