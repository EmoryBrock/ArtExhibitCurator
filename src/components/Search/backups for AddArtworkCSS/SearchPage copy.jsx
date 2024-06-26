import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

export default function Search () {

  return (
    <>
    <div className='search-bar-container'>
      <SearchBar />
    </div>
    <div><SearchResults /></div>
    </>
  )
}
