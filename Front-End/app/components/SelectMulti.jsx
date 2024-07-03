'use client';
import React from 'react';

function SelectMulti({
  categories,
  selectedCategories,
  onSelectCategory,
  onDeselectCategory,
  onRemoveLast,
  onClose,
}) {
  const [filteredCategories, setFilteredCategories] =
    React.useState(categories);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);
  const selectedSet = new Set(selectedCategories);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setShowOptions(true);
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(searchTerm)
      )
    );
  };

  const handleSelect = (category) => {
    onSelectCategory(category);
    setShowOptions(false);
    setSearchTerm('');
  };

  const handleDeselect = (category) => {
    onDeselectCategory(category);
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchTerm === '') {
      onRemoveLast();
    }
  };

  const searchInputRef = React.useRef(null);

  const filteredOptions = filteredCategories
    .filter((category) => !selectedSet.has(category))
    .map((category) => (
      <div
        key={category}
        className="cursor-pointer hover:bg-[#17a9c3] p-2"
        onClick={() => handleSelect(category)}
      >
        {category}
      </div>
    ));

  const handleFocus = () => {
    setShowOptions(true);
    searchInputRef.current.focus();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[800px] font-roboto relative sm:mx-6">
        {/* <button
          className="absolute top-3 right-3 text-3xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button> */}
        <button
          className="absolute top-3 right-3 text-3xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl text-gray-800 mb-2">Edit Skills</h3>
        <p className="text-sm text-gray-500 mb-4">
          Click a skill if you'd like to remove it.
        </p>

        <div className="relative mb-6">
          <input
            ref={searchInputRef}
            className="w-full border border-gray-300 p-3 rounded-md"
            placeholder="Search all skills..."
            value={searchTerm}
            onChange={handleFilter}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            name="searchCategory"
          />
          {showOptions && (
            <div className="absolute w-full border border-gray-300 bg-white rounded-md z-10 max-h-[250px] overflow-auto">
              {filteredOptions}
            </div>
          )}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {selectedCategories.map((category) => (
            <button
              key={category}
              className="bg-[#17a9c3] text-white rounded-full px-2 py-1 text-sm focus:outline-none "
              onClick={() => handleDeselect(category)}
            >
              {category}
              <span className="text-dark ml-2">&times;</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-2 rounded-md text-[#888888] border border-[#cccccc]"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* <button className="px-6 py-2 rounded-md text-white bg-[#17a9c3]">
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
}

function StoryComponent() {
  const categories = [
    'Data Structures & Algorithms',
    'C/C++',
    'Git',
    'HTML/CSS',
    'Python',
    'MATLAB',
    'Adobe Creative Suite',
    'Adobe Illustrator',
    'Adobe Photoshop',
  ];
  const [selectedCategories, setSelectedCategories] = React.useState([
    'Data Structures & Algorithms',
    'C/C++',
    'Git',
  ]);
  const [showComponent, setShowComponent] = React.useState(true);

  function handleSelectCategory(category) {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories.includes(category)) {
        return [...prevCategories, category];
      }
      return prevCategories;
    });
  }

  function handleDeselectCategory(category) {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((c) => c !== category)
    );
  }

  function handleRemoveLastCategory() {
    setSelectedCategories((prevCategories) =>
      prevCategories.slice(0, prevCategories.length - 1)
    );
  }

  function handleClose() {
    setShowComponent(false);
  }

  if (!showComponent) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-[#e6f7ff]">
      <SelectMulti
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={handleSelectCategory}
        onDeselectCategory={handleDeselectCategory}
        onRemoveLast={handleRemoveLastCategory}
        onClose={handleClose}
      />
    </div>
  );
}

export default SelectMulti;
