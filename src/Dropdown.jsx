import { useCallback, useState } from 'react'

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

function MenuGroup({ section, onItemClick }) {
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
            return (<MenuItem onClick={onItemClick} key={option.value} option={option} />)
        })}
    </div>)
}

function MenuItem({ option, onClick }) {
    return (<button
        value={option.value}
        className="dropdown__option"
        role="menuitem"
        style={{display: 'block', width: '100%', textAlign: 'left'}}
        onClick={onClick}>
        {option.label}
    </button>)
}

function Dropdown({ selected, setSelected, sections }) {
    const [isOpen, setOpen] = useState(false);

    const handleItemClick = useCallback((e) => {
        setSelected(e.target.value);
        setOpen(false);
    }, [setSelected])

    function handleOnClick() {
        setOpen((open) => !open);
    }

    return (
        <div name="dropdown" className="dropdown">
            <button role="button" aria-haspopup="menu" aria-expanded={isOpen}
                onClick={handleOnClick}>
                {selected}
            </button>
            {isOpen && <div role="menu" className='dropdown__menu'>
                {sections.map((section) => {
                    return (<MenuGroup key={section.id} section={section} onItemClick={handleItemClick} />)
                }).reduce((prev, curr) => (<>{prev} <hr/> {curr}</>))}</div>}
        </div>
    );
}

function App() {
    const [intervals, setIntervals] = useState(INTERVALS)
    const [activeItem, setActiveItem] = useState('5m');

    return (
        <>
            <Dropdown selected={activeItem} setSelected={setActiveItem} sections={intervals} />
        </>
    )
}

export default App
