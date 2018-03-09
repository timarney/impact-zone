function personPlaceAttendance(data, obj) {
  let percent = 0;
  let present = 0;
  let absent = 0;

  for (const prop in data) {
    if (!data.hasOwnProperty(prop)) {
      continue;
    }

    let name = data[prop].name;

    let id = data[prop].id;

    if (!obj.people[name]) {
      obj.people[name] = { id, present: 0, absent: 0, percent: `0%`, streak: {} };
    }

    let person = obj.people[name];

    if (data[prop].in === true) {
      // update location @ date
      present++;
      // update person overall
      person["present"]++;

      if (
        typeof person.streak.present !== "undefined" &&
        person.streak.present >= 1
      ) {
        person.streak.present++;
      } else {
        person.streak = { present: 1 };
      }
    } else {
      // update location @ date
      absent++;
      // update person overall
      person["absent"]++;

      if (
        typeof person.streak.absent !== "undefined" &&
        person.streak.absent >= 1
      ) {
        person.streak.absent++;
      } else {
        person.streak = { absent: 1 };
      }
    }

    /*
    if (name === "Ania Wolframe") {
      console.log(name, "streak->", person.streak, data[prop].in);
    }
    */

    percent = Math.floor(
      person.present / (person.absent + person.present) * 100
    );

    person["percent"] = percent;
  }

  return { present, absent };
}

export async function getAttendance(data) {
  if (!data) return;
  const attendance = await initAttendance();

  Object.entries(data).forEach(([key, value]) => {
    let d = personPlaceAttendance(data[key].people, attendance);
    let percent = Math.floor(d.present / (d.absent + d.present) * 100);
    attendance.dates[key] = percent;
    attendance.overall.total += percent;
    attendance.overall.entries++;
  });

  attendance.overall.percent = Math.floor(
    attendance.overall.total / attendance.overall.entries
  );
  return attendance;
}

export function initAttendance() {
  let attendance = {};
  attendance.overall = { total: 0, entries: 0, percent: 0 };
  attendance.people = {};
  attendance.dates = {};
  return attendance;
}

/*
const dates = {
    "2018-02-20": false,
    "2018-02-27": false,
    "2018-03-06": true
}
*/
export function datesToCal(obj) {
  const dates = Object.keys(obj);

  const attendance = dates.filter(function (key) {
    return obj[key]
  });

  return { dates, attendance };
}