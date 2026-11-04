const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined. Add it to the .env file.")
}

export const API_URL = apiUrl
