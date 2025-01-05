
type CalorieDisplayProps = {
    calories: number,
    textTitle: string
}

export default function CalorieDisplay({calories, textTitle}: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="font-black text-4xl text-orange">{calories}</span>
        {textTitle}
    </p>
  )
}
