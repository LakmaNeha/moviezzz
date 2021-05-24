import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase_config";

export default function WatchList({ watchList }) {
  function deleteItem(x) {
    db.collection("items").doc(x).delete();
  }

  if (watchList.length !== 0) {
    return (
      <div className="watchList">
        {watchList.map((_item, _index) => {
          return (
            <div className="card" key={_index}>
              <img className="imgInWatchList" src={_item.poster} alt="poster" />
              <h4>{_item.name}</h4>
              <DeleteIcon
                style={{ fontSize: 30, color: "white", marginBottom: "1rem" }}
                onClick={() => deleteItem(_item.id)}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="noItems">
        <h2>No Movies added to WatchList</h2>
      </div>
    );
  }
}
