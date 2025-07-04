import { useState } from "react";

let id = 0;
const INITIAL_TASKS = [
  { id: id++, label: "Walk the dog" },
  { id: id++, label: "Water the plants" },
  { id: id++, label: "Wash the dishes" },
];

function ShoppingList() {
  const [newItem, setNewItem] = useState("");
  const [listItems, setListItems] = useState(INITIAL_TASKS);
  const [completedItems, setCompletedItems] = useState([]);

  function handleInputChange(e) {
    setNewItem(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const label = newItem.trim();
    if (!label) return;
    setListItems([...listItems, { id: id++, label: label }]);
    setNewItem("");
  }

  function handleCheck(e) {
    const item = Number(e.target.value);
    const newArr = completedItems.includes(item)
      ? completedItems.filter((val) => val !== item)
      : [...completedItems, item];
    setCompletedItems(newArr);
  };

  function handleDelete(id) {
    const item = Number(id);
    const newListItems = listItems.filter((val) => val.id !== item);
    setListItems(newListItems);
    const newCompletedItems = completedItems.filter(
      (val) => val !== item,
    );
    setCompletedItems(newCompletedItems);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="Add new task"
          type="text"
          onChange={handleInputChange}
          value={newItem}
        />
        <button type="submit">Add item</button>
      </form>
      <ul>
        {listItems.map((item) => {
          return (
            <li 
              key={item.id}
              style={{
                textDecoration: completedItems.includes(item.id)
                  ? "line-through"
                  : "none",
              }}
            >
              <input
                type="checkbox"
                onChange={handleCheck}
                value={item.id}
                checked={completedItems.includes(item.id)}
                aria-checked={completedItems.includes(item.id)}
              />
              {item.label}

              <button onClick={()=> handleDelete(item.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  return <ShoppingList />;
}
