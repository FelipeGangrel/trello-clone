type ListWrapperProps = {
  children: React.ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
  return <ul className="h-full w-72 shrink-0 select-none">{children}</ul>
}
