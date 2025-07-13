import { useCallback, useState, useRef, useEffect } from 'react'
import {Fragment} from 'react';
import './dropdown.css'

const INTERVALS = [{
    id: 1,
    label: 'Minutes',
    options: [{
        value: "1m",
        label: '1 minute'
    }, {
        value: '5m',
        label: "5 minutes"
    }, {
        value: '15m',
        label: "15 minutes"
    }, {
        value: '30m',
        label: "30 minutes"
    }]
},
{
    id: 2,
    label: 'Hours',
    options: [{
        value: "1h",
        label: '1 hour'
    }, {
        value: '2h',
        label: "2 hours"
    }, {
        value: '6h',
        label: "6 hours"
    }]
}, {
    id: 3,
    label: 'Days',
    options: [{
        value: "1d",
        label: '1 day'
    }]
}
]

function MenuGroup({ section, onSelect }) {
    const [expanded, setExpanded] = useState(true);

    function handleOnClick() {
        setExpanded((expanded) => !expanded);
    }

    return (<div>
        <button onClick={handleOnClick}
            value={section.label}
            className='dropdown__sectionlabel'>
            {section.label}
        </button>

        {expanded && section.options.map((option) => {
            return (<MenuItem onClick={onSelect} key={option.value} option={option} />)
        })}
    </div>)
}

function MenuItem({ option, onClick }) {
    return (<li
        value={option.value}
        className="dropdown__option"
        role="menuitem"
        style={{display: 'block', width: '100%', textAlign: 'left'}}
        onClick={onClick}>
        {option.label}
    </li>)
}

function Dropdown({ selected, onSelect, sections }) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = useCallback((e) => {
        onSelect(e.target.value);
        setOpen(false);
    }, [onSelect])

    function handleOnClick() {
        setOpen((open) => !open);
    }

    return (
        <div role="combobox" name="dropdown" className="dropdown">
            <button role="button" aria-haspopup="listbox" aria-expanded={isOpen}
                aria-controls="dropdown-options"
                onClick={handleOnClick}>
                {selected}
            </button>
            {isOpen && <ul id="dropdown-options" role="listbox" className='dropdown__menu'>
                {sections.map((section, i) => {
                    return (<Fragment key={section.id}>
                            {i > 0 && <hr />}
                        <MenuGroup key={section.id} section={section} onSelect={handleSelect} />
                        </Fragment>)
                })}</ul>}
        </div>
    );
}



const options = [
  { value: "1m", label: "1 Minute" },
  { value: "5m", label: "5 Minutes" },
  { value: "15m", label: "15 Minutes" },
];

function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSelect(highlightedIndex);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current) {
      const item = listRef.current.children[highlightedIndex];
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative w-64">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-listbox"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="w-full text-left border p-2"
      >
        {options[selectedIndex].label}
      </button>

      {isOpen && (
        <ul
          id="dropdown-listbox"
          role="listbox"
          ref={listRef}
          className="absolute w-full mt-1 max-h-60 overflow-y-auto border bg-white"
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              id={`option-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              className={`p-2 cursor-pointer ${
                i === highlightedIndex ? "bg-blue-100" : ""
              }`}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => handleSelect(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


function App() {
    const [intervals, setIntervals] = useState(INTERVALS)
    const [activeItem, setActiveItem] = useState('5m');

    return (
        <>
        <AccessibleDropdown/>
            <Dropdown selected={activeItem} onSelect={(val) => setActiveItem(val)} sections={intervals} />
        </>
    )
}

export default App
