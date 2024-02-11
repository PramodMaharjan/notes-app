
const Sidebar = ({ notes, createNewNote, updateCurrentNoteId, findCurrentNote, handleDelete }) => {

    return (
        <div className="sidebar">
            <div className="sidebar--title">
                <h2>Notes</h2>
                <button className="notes--button" onClick={createNewNote}>+</button>
            </div>
            {notes && notes.map((note, index) => {
                const summary = note.body && note.body.split("\n")[0]
                return <div key={note.id}>
                    <div
                        onClick={() => updateCurrentNoteId(note.id)}
                        className={`title ${findCurrentNote.id === note.id ? "selected--note" : ""}`}
                    >
                        <h4
                            className="text--snippet"
                        >
                            {summary}
                        </h4>
                        <button className="delete-btn" onClick={() => handleDelete(note.id)}>
                            <i className="gg-trash trash-icon"></i>
                        </button>
                    </div>
                </div>
            })}
        </div>
    );
}

export default Sidebar;