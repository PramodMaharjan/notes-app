import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Split from "react-split";
import Editor from "./components/Editor";
import { notesCollection, db } from "./firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc
} from "@firebase/firestore";

function App() {
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState("")
  const [tempNoteText, setTempNoteText] = useState("")

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  const editNote = useCallback(async text => {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
  }, [currentNoteId])

  const createNewNote = async () => {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  const updateCurrentNoteId = (id) => {
    setCurrentNoteId(id)
  }

  const handleDelete = async id => {
    const docRef = doc(db, "notes", id)
    await deleteDoc(docRef)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, snapshot => {
      const notesArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setNotes(notesArray)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && tempNoteText !== currentNote.body) {
        editNote(tempNoteText);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tempNoteText, currentNote, editNote]);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes, currentNoteId])

  return (
    <main>
      {notes.length > 0 ?
        <Split
          // sizes={[30, 70]}
          direction="horiontal"
          className="split"
        >
          <Sidebar
            notes={sortedNotes}
            createNewNote={createNewNote}
            updateCurrentNoteId={updateCurrentNoteId}
            findCurrentNote={currentNote}
            handleDelete={handleDelete}
          />
          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split> :
        <div className="no--notes">
          <div>
            <h2>You have no notes</h2>
            <button
              className="notes--button"
              style={{
                height: "40px",
                width: "120px",
                margin: "0px"
              }}
              onClick={createNewNote}
            >
              Create One
            </button>
          </div>
        </div>
      }
    </main>
  );
}

export default App;
