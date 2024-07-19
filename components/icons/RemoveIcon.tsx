interface RemoveIconProps {
  className?: string;
}

const RemoveIcon: React.FC<RemoveIconProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" className={`${className}`}>
      <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
    </svg>
  )
}

export default RemoveIcon;
