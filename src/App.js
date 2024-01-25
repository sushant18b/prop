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
        id: "090ef4c7-d67b-4e94-ad55-e8f420617c20", // given by the Superset embedding UI
        supersetDomain: "http://localhost:8088",
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
      <h1>How to Embed Superset Dashboard into React</h1>
      <div id="dashboard" />
    </div>
  )
}

export default App