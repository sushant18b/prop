import { useEffect } from "react"
import { embedDashboard } from "@superset-ui/embedded-sdk"
import "./App.css"

function App() {
  const getToken = async () => {
    const response = await fetch("/guest-token")
    const token = await response.json()
    return token
  }

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "9faa52d0-3526-4f63-bf48-90a7ffc065fd", // given by the Superset embedding UI
        supersetDomain: "https://propcheckup-u11274.vm.elestio.app",
        mountPoint: document.getElementById("dashboard"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
      })
    }
    if (document.getElementById("dashboard")) {
      embed()
    }
  }, [])

  return (
    <div className="App">
      <h1>How to Embed Superset Dashboard into React1</h1>
      <div id="dashboard" />
    </div>
  )
}


export default App
