import React, {useState, useEffect} from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function CollectionForm({
  id,
  title,
  description,
  inputId,
  inputValue,
  onInputChange,
  inputPlaceholder,
  buttonText,
  onButtonClick,
  selectValue,
  onSelectChange,
  selectOptions,
}) {

  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate an asynchronous operation to fetch selectOptions
    setTimeout(() => {
      setIsLoading(false); // Simulating end of loading
    }, 2000); // Simulating 2 seconds loading time (adjust as needed)
  }, []);



  if (isLoading) {
    return <div><LoadingSpinner /></div>
  }
  return (
    <div
      id={id}
      className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12 flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-800">{description}</p>
        )}
      </div>
      {inputId ? (
        <div className="relative mt-4">
          <label htmlFor={inputId} className="sr-only">
            {title}
          </label>
          <input
            type="text"
            id={inputId}
            value={inputValue}
            onChange={onInputChange}
            placeholder={inputPlaceholder}
            className="w-full rounded-md border-gray-600 shadow-sm sm:text-sm py-4"
          />
        </div>
      ) : (
        <select
          value={selectValue}
          onChange={onSelectChange}
          className="w-full rounded-md border-gray-600 shadow-sm sm:text-sm py-4 mt-4"
        >
          <option value="" disabled>
            Select a collection
          </option>
          {selectOptions.map((collection) => (
            <option key={collection.key} value={collection.value}>
              {collection.label}
            </option>
          ))}
        </select>
      )}
      <button
        className="inline-block rounded border border-indigo-600 px-12 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 mt-4"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
