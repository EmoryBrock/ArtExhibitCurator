import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

export default function Search () {

  return (
    <>
      <section className='search-bar-container' aria-label="Search Bar">
        <SearchBar />
      </section>
      <section aria-label="Search Results">
        <SearchResults />
      </section>
    </>
  )
}
