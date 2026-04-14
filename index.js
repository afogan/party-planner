// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-ford"; // Make sure to change this!
const RESOURCE = "/events"; "/rsvps"; "/guests";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

/** Updates state with all events from the API */
async function getEvents() {
 try {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result.data);
    events = result.data
    render ();
  } catch (error) {
    console.error(error)
  }
}

/** Updates state with a single event from the API */
async function getEvent(id) {
try {
    const response = await fetch(API+"/"+id);
    const result = await response.json();
    selectedEvent = result.data;
    render ();
  } catch (error) {
    console.error(error)
  }
  
}

// === Components ===

/** Event name that shows more details about the event when clicked */
function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href="#selected">${event.name}</a>
  `; 
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

/** A list of names of all events */
function EventList() {
const $ul = document.createElement("ul");
$ul.classList.add("upcomingParties");

const $events = events.map(EventListItem);
$ul.replaceChildren(...$events);
  
return $ul; 
}
/** Detailed information about the selected event */
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to see more details.";
    return $p;
  }
const $event = document.createElement("section");
$event.classList.add("event");
$event.innerHTML = `
<h3>${selectedEvent.name} #${selectedEvent.id}</h3>
<figure>
  <p>${selectedEvent.description}</p>  
  <p>${selectedEvent.date}</p>
  <p>${selectedEvent.location}</p>;
  </figure>
`;
return $event;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}
init();