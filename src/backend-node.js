import express from "express"
import fetch from "node-fetch"

const PORT = 3001
const app = express()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function fetchAccessToken() {
  try {
    const body = {
      "username": "office3",
      "password": "user@123",
      "provider": "db",
      "refresh": true,
    }

    const response = await fetch(
      "https://propcheckup-u11274.vm.elestio.app/api/v1/security/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const jsonResponse = await response.json()
    return jsonResponse?.access_token
  } catch (e) {
    console.error(error)
  }
}

async function fetchGuestToken() {
  const accessToken = await fetchAccessToken()
  try {
    const body = {
      "resources": [
        {
          "type": "dashboard",
          "id": "9faa52d0-3526-4f63-bf48-90a7ffc065fd",
        },
      ],
      "rls": [],
      "user": {
        "username": "office3",
        "first_name": "Sushant",
        "last_name": "Behera",
      },
    }
    const response = await fetch(
      "https://propcheckup-u11274.vm.elestio.app/api/v1/security/guest_token/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const jsonResponse = await response.json()
    return jsonResponse?.token
  } catch (error) {
    console.error(error)
  }
}

app.get("/guest-token", async (req, res) => {
  const token = await fetchGuestToken()
  res.json(token)
})