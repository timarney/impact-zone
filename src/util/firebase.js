import firebase from "../config-firebase.js";

export function watchRef(id, cb) {

  if(!id){
    console.warn("no location passed");
    return;
  }

  const ref = firebase.database().ref(id);

  ref.on("value", snapshot => {
    let items = snapshot.val();

    console.log("snapshot");

    if (!items) {
      console.log("no items");
      cb(new Error("failed to load items"), {});
      return;
    }

    

    cb(null, items);
  }, (e)=>{
    console.log(e);
  });
}

export function removeRef(id) {
  if (window.confirm("Do you really want to remove?")) {
    console.log("remove", id);

    const itemRef = firebase.database().ref(id);
    itemRef.remove(r => {
      console.log(r);
    });
  }
}
