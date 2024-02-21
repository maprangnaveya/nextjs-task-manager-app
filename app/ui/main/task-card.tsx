export function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 p-2">
      <div className="flex flex-col">
        <h3 className="text-2xl font-medium">{title}</h3>
        <p className={'truncate text-sm'}>{description}</p>
      </div>
    </div>
  );
}
