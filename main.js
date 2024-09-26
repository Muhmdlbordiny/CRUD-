let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp; // global

//get total price
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#f21";
    }
}

//create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if (
        title.value != "" &&
        price.value != "" &&
        category.value != "" &&
        count.value < 100
    ) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datapro.push(newPro);
                }
            } else {
                newPro.count = 1;
                datapro.push(newPro);
            }
        } else {
            datapro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(datapro));

    showdata();
};

//save local storage
//clear inputs after create
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//read
function showdata() {
    getTotal();
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table += ` <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>









                    </tr>
                `;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
                                <button onclick="deleteAll()"> Delete All (${datapro.length}) </button>
                            `;
    } else {
        btnDelete.innerHTML = "";
    }
}
showdata();

//delete
function deletedata(i) {
    console.log(i);
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
//count

//update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = datapro[i].title;

    submit.innerHTML = "Update";
    mood = "Update";
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    });
}
//search
let MoodSearch = "title ";

function getsearchmood(id) {
    let searc = document.getElementById("search");
    if (id === "searchtitle") {
        MoodSearch = "title";
    } else {
        MoodSearch = "category";
    }
    searc.placeholder = "Search By " + MoodSearch;

    searc.focus();
    searc.value = "";
    showdata();
}

function searchdata(value) {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        if (MoodSearch == "title") {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += ` <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
                        </tr>
                    `;
            }
        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += ` <tr>
                             <td>${i}</td>
                             <td>${datapro[i].title}</td>
                             <td>${datapro[i].price}</td>
                             <td>${datapro[i].taxes}</td>
                             <td>${datapro[i].ads}</td>
                             <td>${datapro[i].discount}</td>
                             <td>${datapro[i].total}</td>
                             <td>${datapro[i].category}</td>
                             <td><button onclick="updateData(${i})" id="update">Update</button></td>
                             <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
                      </tr>
                     `;
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }
}

//clean data
//clean data