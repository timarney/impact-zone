import { api_host, getLocation } from "./index";
import firebase from "../config-firebase.js";
import { DateTime } from "luxon";
export const now = DateTime.local().toISODate();

function diffList(snap, res, ref) {
  for (let prop in res.people) {
    let id = res.people[prop].id;
    if (!snap.people[id]) {
      let data = res.people[prop];
      ref
        .child("people")
        .child(id)
        .set(data);
    }
  }
}

function addRecord(locationId, data) {
  const date = now;
  const ref = firebase.database().ref();

  ref
    .child(locationId)
    .child(date)
    .set(data, err => {
      if (err) {
        console.log(err);
      }
    });
}

async function getPeople(locationId) {
  const response = await getLocation(locationId);
  return response.data;
}

export function syncPeople(locationId, date = now) {
  if (!locationId) return;

  const ref = firebase.database().ref(locationId + "/" + date);

  //Check for record--------------------------------------------------
  ref.once("value", async function(snapshot) {
    const location = api_host + "/locations/" + locationId;
    if (snapshot.val() == null) {
      console.log("INDEX.JS No Firebase data exists:" + location);
      addRecord(locationId, await getPeople(locationId));
    } else {
      //console.log("DIFF List:" + location);
      diffList(snapshot.val(), await getPeople(locationId), ref);
    }
  });
}
