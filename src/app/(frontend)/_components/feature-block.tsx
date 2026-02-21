interface FeatureBlockProps {
  title: string
  description: string
  tags: string[]
}

export function FeatureBlock({ title, description, tags }: FeatureBlockProps) {
  return (
    <div className="flex h-[420px] w-[900px] shrink-0 flex-col justify-between rounded-lg bg-ella-green-50 p-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-bold text-ella-green">{title}</h3>
        <div
          className="max-w-xl text-lg text-ella-slate/80 [&_strong]:font-bold [&_strong]:text-ella-green"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ella-green"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
