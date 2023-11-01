"use client";

import { useDrop } from "react-dnd";

import StopEditor from "./StopEditor";
import StopsContainer from "./StopsContainer";
import Stop from "./Stop";
import Button from "../../UI/Button";
import Modal, { ModalButton, ModalDisplay } from "../../UI/Modal";
import ApproveAction from "../../UI/ApproveAction";
import useJourney from "@/src/hooks/useJourney";
import { IJourney } from "@/src/models/Journey";

type JourneyEditorProps = {
  editableJourney: IJourney;
};

function JourneyEditor({ editableJourney }: JourneyEditorProps) {
  const {
    journeyIsEditing,
    editableStop,
    addStop,
    saveEditStop,
    stops,
    deleteStop,
    startEditStop,
    moveStop,
    findStop,
    clearStops,
    isSubmitting,
    postJourney,
    cancelEditing,
    patchJourney,
    deleteJourney,
  } = useJourney(editableJourney);

  const [, drop] = useDrop(() => ({ accept: "card" }));

  return (
    <div className="flex flex-col bg-slate-400 rounded-xl">
      <StopEditor
        editableStop={editableStop}
        saveForm={addStop}
        editForm={saveEditStop}
      />
      {stops.length < 1 ? (
        <div className="mt-5 text-center text-lg text-slate-50">
          No stops yet...
          <br />
          Create new journey or edit journeys on the right.
        </div>
      ) : (
        <StopsContainer
          reference={drop}
          data={stops}
          render={(data) =>
            data.map((item, i) => (
              <Stop
                key={item.id}
                stop={item}
                deleteItem={deleteStop}
                editItem={startEditStop}
                moveStop={moveStop}
                findStop={findStop}
              />
            ))
          }
        />
      )}
      <div className="flex items-center justify-end">
        {stops.length > 0 && (
          <div className="flex gap-3 py-3 px-5">
            {journeyIsEditing ? (
              <>
                <Button onClick={cancelEditing} type="secondary">
                  Cancel
                </Button>
                <Modal>
                  <ModalButton name="delete">
                    <Button type="danger">Delete</Button>
                  </ModalButton>
                  <ModalDisplay name="delete">
                    <ApproveAction title="Delete" onClick={deleteJourney}>
                      Are you sure you want to delete the journey?
                    </ApproveAction>
                  </ModalDisplay>
                </Modal>
                <Button onClick={patchJourney} type="primary">
                  Update
                </Button>
              </>
            ) : (
              <>
                <Modal>
                  <ModalButton name="journey">
                    <Button type="danger">Cancel</Button>
                  </ModalButton>
                  <ModalDisplay name="journey">
                    <ApproveAction title="Delete" onClick={clearStops}>
                      Are you sure you want to cancel the journey creation? It
                      will delete all created stops.
                    </ApproveAction>
                  </ModalDisplay>
                </Modal>
                <Button disabled={isSubmitting} onClick={postJourney}>
                  Save Journey
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JourneyEditor;
