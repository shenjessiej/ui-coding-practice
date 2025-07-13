import { useState, useEffect, useMemo } from "react";

function Column({ height, value, x }) {
  const [show, setShow] = useState(false);

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        textAlign: "center",
      }}
    >
      <div style={{ flexGrow: 1, position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
          {show ? value : ""}
        </div>
      </div>
      <div style={{ backgroundColor: "grey", height: `${height}px` }}></div>
    </div>
  );
}

function Histogram({ h = 300, w = 500, min = 1, max = 10, n = 200 }) {
  const [nums, setNums] = useState([]);
  const [height, setHeight] = useState(0);

  const xAxis = useMemo(() => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
        {nums.map((_, i) => {
          return <div style={{borderTop: '1px solid black', flexGrow: 1, textAlign: 'center'}}>{i}</div>;
        })}
      </div>
    );
  }, [nums]);

  const yAxis = useMemo(() => {
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {new Array(height)
          .fill()
          .map((_, i) => i)
          .filter((val) => val % 10 === 0)
          .map((val) => (
            <div key={val} style={{ flexGrow: 1, textAlign: "center" }}>
              {height - val}
            </div>
          ))}
      </div>
    );
  }, [height]);

  const columns = useMemo(() => {
    if (nums.length === 0 || height === 0) return null;

    return nums.map((num, index) => {
      return (
        <Column key={index} height={(num / height) * h} value={num} x={index} />
      );
    });
  }, [nums, height, h]);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await fetch(
          `https://www.random.org/integers/?num=${n}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
        );
        if (!payload.ok) {
          throw new Error("Failed to fetch payload");
        }
        const text = await payload.text();
        const arr = text
          .split("\n")
          .filter((val) => val.trim().length > 0)
          .map((val) => Number(val));

        const map = new Map();
        arr.forEach((num) => {
          map.set(num, (map.get(num) || 0) + 1);
        });

        let newNums = [];
        map.entries().forEach(([k, v]) => {
          newNums[k] = v;
        });

        setHeight(
          Math.ceil(
            Math.max(...newNums.filter((val) => val > 0).values()) / 10
          ) * 10
        );
        setNums(newNums);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: `${w}px`,
        height: `${h}px`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: '5px' }}>
        {yAxis}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <div style ={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            borderLeft: '1px solid black'
        }}>
        {columns}
        </div>  
        {xAxis}
      </div>
    </div>
  );
}
function App() {
  return <Histogram h={300} w={600} min={1} max={12} n={200} />;
}

export default App;
