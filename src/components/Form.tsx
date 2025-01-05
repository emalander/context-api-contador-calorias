import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories:0
}

export default function Form() {

  const {state,dispatch} = useActivity()

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId) {
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    const isNumberField = ['category', 'calories'].includes(e.target.id)
    
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value

    })
  }

  const isValidActivity = () => {
    const {name, calories} = activity
    
    return name.trim() != '' && calories > 0
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit...')
    dispatch({type:'save-activity', payload:{newActivity: activity} })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-lg font-bold text-white bg-slate-400 uppercase p-3 rounded-t-lg">
        Cargar actividad
      </h1>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select className="border border-slate-300 p-2 reounded-lg w-full bg-white rounded-lg" 
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
           
          {categories.map(category => (
            <option 
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input 
          id="name"
          type="text"
          className="border border-slate-400 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo, ensalada"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input 
          id="calories"
          type="number"
          className="border border-slate-400 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 ó 500"
          value={activity.calories !== 0 ? activity.calories : ''}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800
         hover:bg-gray-900 
         w-full 
         p-2 
         font-bold 
         uppercase 
         text-white 
         cursor-pointer rounded-md disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
