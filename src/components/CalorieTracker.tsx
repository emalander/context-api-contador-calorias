
import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTracker() {

  const {caloriesConsumed, caloriesBurned, netCalories} = useActivity()

  return (
    <>
      <h2 className="text-3xl font-black text-white text-center">Resumen de Calorias</h2>
      <div className="flex flex-col items center md:flex-row md:justify-between gap-5 mt-10"> 
        <CalorieDisplay 
          calories= {caloriesConsumed}
          textTitle="Consumidas"
        />
        <CalorieDisplay 
          calories= {caloriesBurned}
          textTitle="Calorias quemadas"
        />
        <CalorieDisplay 
          calories= {netCalories}
          textTitle="Diferencia en calorias"
        />
      </div>
    </>
  )
}
