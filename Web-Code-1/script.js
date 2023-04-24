const output = document.getElementById("country");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

function resetInput() {
    document.getElementById("input").value = "";
    country_ID = [];
    cprobability = [];
    document.getElementById("results").innerHTML = "";
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const getData = async function () {

    removeAllChildNodes(output);
    let country_ID = [];
    let cprobability = [];
    const input = document.getElementById("input").value;
    if (input == "") {
        alert("Enter a name")
    } else {

        await fetch(`https://api.nationalize.io?name=${input}`)
            .then(function (response) {
                return response.json();
            })
            .then(async function (data) {
                if (data.country[0] == null || data.country[1] == null) {
                    throw new Error(`Enter a proper name`)
                } else {

                    cprobability.push(data.country[0].probability);
                    cprobability.push(data.country[1].probability);
                    country_ID.push(data.country[0].country_id);
                    country_ID.push(data.country[1].country_id);

                    document.getElementById("results").innerHTML = `Results for ${input}`;


                    for (let i = 0; i < country_ID.length; i++) {
                        await fetch(`https://restcountries.com/v2/alpha/${country_ID[i]}`).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            const countries = document.createElement("div");
                            countries.classList.add("countries");
                            const c_ID = document.createElement("p");
                            c_ID.innerText = country_ID[i];
                            const cP = document.createElement("p");
                            cP.innerText = `Probability: ${cprobability[i]}`;
                            const country_name = document.createElement("p");
                            country_name.innerText = `${data.name}`;
                            const image = document.createElement("img");
                            image.src = data.flag;
                            image.classList.add("image");
                            countries.appendChild(c_ID);
                            countries.appendChild(country_name);
                            countries.appendChild(cP);
                            countries.appendChild(image);
                            output.appendChild(countries);
                        })
                    }


                }

            }).catch(e => {
                alert(`${e.message} `);
            })

    }

    resetInput();

}


