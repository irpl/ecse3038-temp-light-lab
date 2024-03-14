var names = [
  "Abe",
  "Abraham",
  "Addison",
  "Adelaide",
  "Adeline",
  "Agatha",
  "Agnes",
  "Albert",
  "Alejandra",
  "Alice",
  "Alma",
  "Amara",
  "Ambrose",
  "Amos",
  "Anita",
  "Ansel",
  "Archie",
  "Aron",
  "Arthur",
  "Artie",
  "Atticus",
  "August",
  "Barron",
  "Bea",
  "Beatrix",
  "Beau",
  "Benedict",
  "Bennett",
  "Bernadette",
  "Bernard",
  "Bertie",
  "Bessie",
  "Birdie",
  "Blaine",
  "Blevins",
  "Blythe",
  "Bonnie",
  "Brady",
  "Calliope",
  "Camille",
  "Carlo",
  "Carole",
  "Cassady",
  "Celia",
  "Clara",
  "Clarence",
  "Clellon",
  "Clifford",
  "Cole",
  "Colette",
  "Connie",
  "Cornelius",
  "Cyrus",
  "Dahlia",
  "Daisy",
  "Damion",
  "Darcy",
  "Dean",
  "Denton",
  "Dessie",
  "Dodie",
  "Dominic",
  "Dora",
  "Doris",
  "Dorothy",
  "Earl",
  "Edison",
  "Edith",
  "Edmund",
  "Edwin",
  "Elaine",
  "Eleanor",
  "Elijah",
  "Ellis",
  "Elmer",
  "Elon",
  "Elrod",
  "Emile",
  "Emily",
  "Emma",
  "Emmett",
  "Enid",
  "Ernest",
  "Erwin",
  "Ethel",
  "Etta",
  "Eugenie",
  "Evangeline",
  "Evelyn",
  "Ezra",
  "Faith",
  "Fanny",
  "Faye",
  "Felix",
  "Fletcher",
  "Flora",
  "Florence",
  "Frances",
  "Francis",
  "Frank",
  "Gabrielle",
  "Gael",
  "Galatea",
  "Genevieve",
  "George",
  "Georgia",
  "Gerald",
  "Gert",
  "Gertrude",
  "Gracy",
  "Greta",
  "Gunther",
  "Gus",
  "Harmon",
  "Harold",
  "Harper",
  "Harriet",
  "Harvey",
  "Hattie",
  "Hayden",
  "Hazel",
  "Hector",
  "Henrietta",
  "Henry",
  "Herbert",
  "Hester",
  "Hilda",
  "Holden",
  "Hope",
  "Howard",
  "Hugh",
  "Ian",
  "Ignatius",
  "Imogen",
  "Inez",
  "Irene",
  "Iris",
  "Isabella",
  "Jane",
  "Jarrett",
  "Jasper",
  "Jedediah",
  "Jerry",
  "Joan",
  "Jocelyn",
  "Joel",
  "Josephine",
  "Joyce",
  "Julien",
  "Katherine",
  "Kenneth",
  "Kingsley",
  "Lacey",
  "Lacy",
  "Langston",
  "Laura",
  "Lee",
  "Lincoln",
  "Liza",
  "Lorraine",
  "Louis",
  "Lucas",
  "Lucille",
  "Lucinda",
  "Luisa",
  "Lydia",
  "Margaret",
  "Marjorie",
  "Marshall",
  "Martha",
  "Mathilde",
  "Maxine",
  "Mickey",
  "Milton",
  "Minnie",
  "Miriam",
  "Mollie",
  "Morgan",
  "Neal",
  "Nell",
  "Nelson",
  "Neville",
  "Nora",
  "Norene",
  "Norman",
  "Octavia",
  "Olive",
  "Opal",
  "Orville",
  "Oscar",
  "Otis",
  "Owen",
  "Patricia",
  "Pearl",
  "Penelope",
  "Peyton",
  "Pierce",
  "Polly",
  "Pollyanna",
  "Posey",
  "Presley",
  "Preston",
  "Ralph",
  "Randall",
  "Rawlins",
  "Raymond",
  "Reed",
  "Reginald",
  "Richard",
  "Rodney",
  "Rolla",
  "Rollo",
  "Rosemary",
  "Roy",
  "Ruby",
  "Ruth",
  "Rutherford",
  "Sadie",
  "Sal",
  "Sandra",
  "Scarlet",
  "Selma",
  "Seraphina",
  "Shadrack",
  "Sherman",
  "Shirley",
  "Shoshana",
  "Sophia",
  "Spencer",
  "Stanley",
  "Sterling",
  "Susannah",
  "Sylvia",
  "Theodore",
  "Tobias",
  "Tobin",
  "Trudy",
  "Una",
  "Valentina",
  "Vera",
  "Viola",
  "Violet",
  "Virginia",
  "Waldo",
  "Whitman",
  "Wilber",
  "Wilbert",
  "Willa",
  "Willie",
  "Windsor",
  "Winston",
  "Wren",
  "Wright",
  "Wyatt",
];

var identifier;
function setIdentifier() {
  if (localStorage.getItem("identifier") == null) {
    var name = names[Math.floor(Math.random() * names.length)];
    var number = Date.now() % 10000;

    identifier = name + "#" + number;
    localStorage.setItem("identifier", identifier);
  }
  identifier = localStorage.getItem("identifier");
  document.querySelector(".identifier").innerHTML = identifier;
}

document.getElementById("light-switch").addEventListener("change", function (e) {
  light_switch = this;
  console.log(light_switch.checked);

  var state = {
    light: this.checked,
  };

  fetch("/api/light", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "api-key": identifier,
    },
    body: JSON.stringify(state),
  })
    .then((res) => res.json())
    .then((json) => (light_switch.check = json.lights));
});

function getTemp() {
  fetch("/api/temp", {
    headers: {
      "api-key": identifier,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      temp = parseFloat(data.temp).toFixed(2);
      document.querySelector(".temp-val").innerHTML = `${temp}&#176;C`;
    });
}
function getLight() {
  fetch("/api/light", {
    headers: {
      "api-key": identifier,
    }
  })
  .then((response) => {
    if (!response.ok) { // Check for non-200 status
      if (response.status === 404) {
        fetch("/api/light", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "api-key": identifier,
          },
          body: JSON.stringify({"light": false}),
        })
      } else {
        throw new Error("Error fetching light status: " + response.status);
      }
    }
    return response.json(); // Proceed only if the status is OK
  })
  .then((data) => document.getElementById("light-switch").checked = data.light)
  .catch((error) => console.error("Error:", error));
}

setInterval(() => {
  getTemp();
}, 500);
setIdentifier();
getLight();
