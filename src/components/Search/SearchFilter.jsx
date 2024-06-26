import React from "react";

export default function SearchFilter({ filters, onFilterChange, onApplyFilters, onClearFilters }) {
  return (
    <aside className="border-2 p-3 rounded-md" aria-labelledby="filter-heading">
      <h2 id="filter-heading" className="font-semibold pb-3">Results Filters</h2>
      <div>
        <label htmlFor="type">Artwork Type:</label>
        <select id="type" name="type" onChange={onFilterChange}>
          <option value="">All</option>
          {filters.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="py-2">
        <label htmlFor="date">Artwork Date Created:</label>
        <select id="date" name="date" onChange={onFilterChange}>
          <option value="">All</option>
          {filters.dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="pb-2">
        <label htmlFor="sort">Sort Results By:</label>
        <select id="sort" name="sort" onChange={onFilterChange}>
          <option value="title">Title</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="pb-2">
        <label htmlFor="order">Arrange Results In:</label>
        <select id="order" name="order" onChange={onFilterChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="pt-3 text-left">
        <button
          onClick={onApplyFilters}
          className="rounded-md bg-indigo-500 p-2 text-sm font-medium text-white shadow"
        >
          Apply Filters
        </button>
      </div>
      <div className="py-2 text-left">
        <button
          onClick={onClearFilters}
          className="rounded-md bg-indigo-500 p-2 text-sm font-medium text-white shadow"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}