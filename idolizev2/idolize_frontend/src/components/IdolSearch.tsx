import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const IdolForm: React.FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery( event.target.value )
  }

  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Please enter a search term")
      return
    }

    setResults([])
    setError("")

    axios
      .get(`http://127.0.0.1:8000/api/idols/?search=${query}`)
      .then((response) => {
        setResults(response.data)
      })
      .catch((error) => {
        setError("Failed to fetch data")
        console.error(error)
      })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter"){
      handleSearch()
    }
  }

  return (
    <div>
      <h1>Idol search</h1>
      <input onChange={handleChange} onKeyDown={handleKeyDown}/>
      <button onClick={handleSearch}>Search</button>
      
      {error && <p>{error}</p>}

      {results.length > 0 ? (
        <ul>
          {results.map((idol, index) => (
            <li 
            key={idol.id}
            onClick={() => navigate(`idols/${idol.id}`)}
            style={{ cursor: "pointer", textDecoration: "underline" }}>
              {idol.idol_name} - {idol.nickname}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}