var chatbotHtml = `
    <style>
        #getInTouchButton {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 0px 10px 5px 0px;
            display: block;
            width: 200px;
            height: 30px;
            background-color: lightskyblue;
            color: black;
            border: 0;
            border-radius: 10px;
        }

        .crm-modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }

        .crm-modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>

        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

        <div id="getInTouchOpenModal" class="crm-modal">
        <div class="crm-modal-content">
            <span class="close">&times;</span>
            <div class="card">
            <div class=card-body>
                <div id="container"> </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto mb-2">
        <button type="submit" class="btn btn-primary" id="submit" onclick="saveLeadForm()">Save</button>
        </div>
        </div>
    </div>
  </div>
 <button type="button" id="getInTouchButton" onclick="getTemplate()">Get In Touch</button>
`

var bodyHTML = document.body.innerHTML
bodyHTML = bodyHTML + chatbotHtml
document.body.innerHTML = bodyHTML

const modal = document.getElementById('getInTouchOpenModal');
const close = document.getElementsByClassName("close")[0];

close.addEventListener('click', () => {
    modal.style.display = 'none';
})

function alertOne() {
    console.log('alertOneCall')
}

async function getTemplate() {
    let response = await fetch(`https://api.wolfeocrm.com/v1/setting/2/template/52`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMVENCV1M4RkRVTkdTMDNUIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWxvZ2dlcnouY29tL2FwaS92MS9sb2dpbiIsImlhdCI6MTY3NzY2MzM1NCwiZXhwIjoxNjc3NjY2OTU0LCJuYmYiOjE2Nzc2NjMzNTQsImp0aSI6IkxUQ0JXUzhGRFVOR1MwM1QxNjc3NjYzMzU0In0.slVAXBNyrkrFd0lLDP_UtB2NPX78B4qSjSC0Mjuh9YA'
        }
    }).then(async (res) => {
        data = await res.json();
    })
        .catch((err) => {
            console.log('err===', err)
        })

    allData = data.attributes.data.sections;

    var container = document.getElementById("container");

    for (var i = 0; i < allData.length; i++) {

        for (var j = 0; j < data.attributes.data[allData[i]].fields.length; j++) {

            if (data.attributes.data[allData[i]].fields[j] == data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName) {

                var paragraph = document.createElement("p");
                var input = document.createElement("input");
                var selectList = document.createElement("select");


                paragraph.style.margin = "0px 0px 5px 0px";
                input.style.margin = "0px 0px 10px 0px";
                selectList.style.margin = "0px 0px 10px 0px";


                paragraph.textContent = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].labelName;

                if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldType == "Pick List") {

                    if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName == "leadSource") {

                        let response = await fetch(` https://api.wolfeocrm.com/v1/master/source/list`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMVENCV1M4RkRVTkdTMDNUIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWxvZ2dlcnouY29tL2FwaS92MS9sb2dpbiIsImlhdCI6MTY3NzY2MzM1NCwiZXhwIjoxNjc3NjY2OTU0LCJuYmYiOjE2Nzc2NjMzNTQsImp0aSI6IkxUQ0JXUzhGRFVOR1MwM1QxNjc3NjYzMzU0In0.slVAXBNyrkrFd0lLDP_UtB2NPX78B4qSjSC0Mjuh9YA'
                            }
                        }).then(async (res) => {
                            leadSourceData = await res.json();
                        })
                            .catch((err) => {
                                console.log('err===', err)
                            })

                        var leadSourceArray = leadSourceData._embedded.leadSources;
                        selectList.id = "mySelectTwo";

                        for (var l = 0; l < leadSourceArray.length; l++) {
                            var option = document.createElement("option");
                            option.value = leadSourceArray[l].id;
                            option.text = leadSourceArray[l].name;
                            selectList.appendChild(option);
                        }

                    } else {

                        var array = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].pickListValues;
                        selectList.id = "mySelect";

                        for (var k = 0; k < array.length; k++) {
                            var option = document.createElement("option");
                            option.value = array[k].id;
                            option.text = array[k].name;
                            selectList.appendChild(option);
                        }
                    }

                    container.appendChild(paragraph);
                    container.appendChild(selectList);
                    selectList.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;

                } else {
                    input.type = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldType;
                    input.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                    input.placeholder = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].placeholder;

                    container.appendChild(paragraph);
                    container.appendChild(input);
                }

            }
        }
    }

    modal.style.display = 'block';
}
