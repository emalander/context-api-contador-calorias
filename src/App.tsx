import { useEffect, useMemo} from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hooks/useActivity"

function App() {

  //const [state, dispatch] = useReducer(activityReducer,initialState)
  const {state,dispatch} = useActivity()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])
 
  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() =>dispatch({type:'restartApp'})}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="pt-10">
        <div className="flex justify-center">
          <div className="flex-initial w-96">
            <Form/>
          </div>
          <div className="flex-none w-32">
            
          </div>
          <div className="flex-initial w-96">
            <h1 className="text-center text-lg font-bold text-white bg-slate-600 uppercase p-3 rounded-t-lg">
              Actividad
            </h1>
            {state.activities.length > 0? <ActivityList/> : <h1 className="text-center text-lg font-bold text-white bg-slate-400 uppercase p-3 rounded-b-lg">No hay actividades aún</h1>}
            
          </div>
        </div>
      </section>
      <section className="bg-gray-800 py-10 m-10">
        <div className="max-w-4xl mx-auto">
             <CalorieTracker/> 
        </div>
      </section>
    </>
  )
}

export default App
