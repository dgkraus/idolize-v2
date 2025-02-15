import React, { useState } from 'react'
import axios from 'axios'

export const IdolForm: React.FC = () => {
  const [query, setQuery] = useState({ value: "" })
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ value: event.target.value })
  }

  const handleSearch = () => {
    if (query.value.trim() === "") {
      setError("Please enter a search term")
      return;
    }

    setResults([])
    setError("")

    axios
      .get(`http://127.0.0.1:8000/api/idols/?search=${query.value}`)
      .then((response) => {
        setResults(response.data)
      })
      .catch((error) => {
        setError("Failed to fetch data");
        console.error(error)
      });
  };

  return (
    <div>
      <h1>Idol search</h1>
      <input onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      
      {error && <p>{error}</p>}

      {results.length > 0 ? (
        <ul>
          {results.map((idol, index) => (
            <li key={index}>
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