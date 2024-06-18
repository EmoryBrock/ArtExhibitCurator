// SearchFilter.js
import React from "react";

export default function SearchFilter({ filters, onFilterChange, onApplyFilters, onClearFilters }) {
  return (
    <div>
      <label>
        Type:
        <select name="type" onChange={onFilterChange}>
          <option value="">All</option>
          {filters.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <select name="date" onChange={onFilterChange}>
          <option value="">All</option>
          {filters.dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sort By:
        <select name="sort" onChange={onFilterChange}>
          <option value="title">Title</option>
          <option value="date">Date</option>
        </select>
      </label>
      <label>
        Order:
        <select name="order" onChange={onFilterChange}>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </label>
      <button onClick={onApplyFilters}>Apply filters</button>
      <button onClick={onClearFilters}>Clear filters</button>
    </div>
  );
}
