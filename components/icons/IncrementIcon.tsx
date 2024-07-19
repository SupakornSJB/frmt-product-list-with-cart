interface DecrementIconProps {
  className?: string
}

const DecrementIcon: React.FC<DecrementIconProps> = ({ className }) => {
  return (
    <svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z" /></svg>
  )
}

export default DecrementIcon;
