import planes from "./planes.json";

const Selection = () => {
  const count = planes.length;
  const [planeChecklist, setPlaneChecklist] = useState(planes.reduce((acc, cur) => {

    acc.push({ name: cur.name, selected: true, id: cur.id });
    acc.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return acc;
  }, []))
  const checkedCount = planeChecklist.reduce((acc, cur) => {
    if (cur.selected) acc++;
    return acc;
  }, 0)
  const [imageURL, setImageURL] = useState("");

  const handleHover = (e) => {
    const sel = planes.find(plane => plane.id === e.currentTarget.id)

    if (sel) setImageURL(sel.image_uris.large);
  }
  const handleCheck = (e) => {
    const newList = [...planeChecklist];
    newList.forEach(line => {
      if (line.id === e.target.id) line.selected = e.target.checked;
    })
    setPlaneChecklist(newList);
  }

  const handleSelectAll = (e) => {
    e.preventDefault();
    const newList = [...planeChecklist];
    newList.forEach(line => {
      line.selected = true;
    })
    setPlaneChecklist(newList);
  }

  return (
    <div className='selection_main'>
      <div className='selection_sidebar'>
        <form className='selection_form'>
          <div className='selection_buttons'>
            <button>Start</button>
            <button onClick={handleSelectAll}>Select All</button>
          </div>
          Selected: {checkedCount} of {count}
          {planeChecklist.map(list => {
            return (
              <div onMouseOver={handleHover} id={list.id} key={list.name}>
                <input type='selection_checkbox' checked={list.selected} onChange={handleCheck} id={list.id} />
                <label className='selection_plane'  >{list.name}</label>
              </div>
            )
          })}
        </form>
      </div >
      <div className='selection_maindiv'>
        <div className='selection_imgdiv'>
          {imageURL ? <img className='selection_preview' src={imageURL} /> : ""}
        </div>
      </div>
    </div >
  );
}

export default Selection;