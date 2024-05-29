//                                        Get All Elements

// Left ASIDE Elements (Create ASIDE)

const createAside = document.getElementById("create-aside");
const createAsideToggle = document.getElementById("create-toggler");
const createHiddenElements = document.querySelectorAll(".create-collapse");
const title = document.getElementById("title");
const category = document.getElementById("category");
const price = document.getElementById("price");
const tax = document.getElementById("tax");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const count = document.getElementById("count");
const total = document.getElementById("total");
const createBtn = document.getElementById("create-btn");
const resetBtn = document.getElementById("reset-btn");
const countSection = document.querySelector(".count-section");
const createAsideTitle = document.querySelector("#create-aside > h2");

const inputs = document.querySelectorAll(
  'input[type="number"],input[type="text"]'
);
const reqInputs = document.querySelectorAll("[required]");
const numberInputs = document.querySelectorAll('input[type="number"]');
const notReqInputs = document.querySelectorAll("#tax, #discount, #ads");
const textInputs = document.querySelectorAll('input[type="text"]');

// Middle Section Elements (Body & Table)

const deleteAll = document.querySelector(".delete-all-btn.btn");
const fullTable = document.querySelector(".full-table-btn.btn");
const tbody = document.getElementById("tbody");
const popup = document.getElementById("popup");
const scrollUp = document.querySelector(".scroll-up");

// Right ASIDE Elements (Search ASIDE)

const searchAside = document.getElementById("search-aside");
const searchAsideToggle = document.getElementById("search-toggler");
const searchHiddenElements = document.querySelectorAll(".search-collapse");
const searchInput = document.getElementById("search");
const searcheBtn = document.getElementById("search-btn");
const categoryContainer = document.querySelector(".categories-cointainer");

// Moods & Tmps & Regular Expression

let mode = "create"; // create Function Mood
let updatedElementIndex;   // Tmp

// REGEX
const numberReqInputsRegex = /^[1-9]\d*$/;
const numberNotReqInputsRegex = /^(?:[0-9]\d*|)$/;
const textInputsRegex = /^[A-Za-z].*$/;

// *********************

// Scroll up function

// Show and hide Scroll-up btn
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  if (scrollY > 1000) {
    scrollUp.style.visibility = "visible";
  } else {
    scrollUp.style.visibility = "hidden";
  }
});

// Scroll-up btn functionality
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// functionality of Delete All Btn , Clear (( Local Storage , Table Data , Product Array , category container, array of set )) & reset inputs
deleteAll.onclick = () => {
  tbody.innerHTML = "";
  localStorage.removeItem("products");
  productArray = [];
  arrayOfSet = [];
  categoryContainer.innerHTML = "";
  resetBtn.click();
};

// Functionality of fullTable Btn
fullTable.addEventListener("click", showData);

// functionality of of RESET Btn
resetBtn.onclick = () => {
  inputs.forEach((input) => {
    input.value = "";
    input.style.cssText = "outline: none";
    input.removeAttribute("placeholder");
  });

  getTotal();
};

// functionality of Create ASIDE
createAsideToggle.onclick = () => {
  if (createAside.style.width == "0%") {
    openCreateAside();
    closeSearchAside();
  } else {
    closeCreateAside();
  }
};

function openCreateAside() {
  createAside.style.width = "90%";

  setTimeout(() => {
    createHiddenElements.forEach((ele) => {
      ele.classList.remove("create-collapse");
    });
  }, 280);

  createAsideToggle.innerHTML = "x";
  createAsideToggle.style.backgroundColor = "white";
  createAsideToggle.style.color = "red";
  popup.style.setProperty("visibility", "visible", "important");
}

function closeCreateAside() {
  createAside.style.width = "0%";

  setTimeout(() => {
    createHiddenElements.forEach((ele) => {
      ele.classList.add("create-collapse");
    });
  }, 185);

  createAsideToggle.innerHTML = "+";
  createAsideToggle.style.backgroundColor = "rgb(41, 41, 41)";
  createAsideToggle.style.color = "white";
  popup.style.setProperty("visibility", "hidden", "important");

  // Change Mode to Create While Close Create Aside
  mode = "create";
  createBtn.innerHTML = "CREATE";
  createAsideTitle.innerHTML = "Add New product";
  countSection.style.cssText = "display:flex";

  inputs.forEach((input) => {
    input.style.cssText = "outline: none";
    input.removeAttribute("placeholder");
  });
}

// functionality of Search ASIDE
searchAsideToggle.onclick = () => {
  if (searchAside.style.width == "0%") {
    openSearchAside();
    closeCreateAside();
    popup.style.setProperty("visibility", "visible", "important");
  } else {
    closeSearchAside();
    popup.style.setProperty("visibility", "hidden", "important");
  }
};

function openSearchAside() {
  searchAside.style.width = "250px";

  setTimeout(() => {
    searchHiddenElements.forEach((ele) => {
      ele.classList.remove("search-collapse");
    });
  }, 100);

  searchAsideToggle.innerHTML = "X";
  searchAsideToggle.style.backgroundColor = "white";
  searchAsideToggle.style.color = "red";
  popup.style.setProperty("visibility", "visible", "important");
}

function closeSearchAside() {
  searchAside.style.width = "0%";

  setTimeout(() => {
    searchHiddenElements.forEach((ele) => {
      ele.classList.add("search-collapse");
    });
  }, 100);

  searchAsideToggle.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
  searchAsideToggle.style.backgroundColor = "rgb(41, 41, 41)";
  searchAsideToggle.style.color = "white";
}

// Get total & Validate it
inputs.forEach((input) => {
  input.addEventListener("keyup", getTotal);
});

// Validation reqiurements => [fillfull =>(title,category,price) && input[type="numbers"] didn't be a negative number ]
function getTotal() {
  if (
    title.value.trim() != "" &&
    category.value.trim() != "" &&
    price.value.trim() != ""
  ) {
    // validation
    if (
      price.value.trim() >= 0 &&
      tax.value.trim() >= 0 &&
      ads.value.trim() >= 0 &&
      discount.value.trim() >= 0
    ) {
      total.innerHTML = ` ${+price.value.trim() +
        +tax.value.trim() +
        +ads.value.trim() +
        -discount.value.trim()
        }$ `;
      total.style.backgroundColor = "green";
    } else {
      total.innerHTML = "";
      total.style.backgroundColor = "red";
    }
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

// Create product

// Main Array
let productArray = [];
// Return Data from Local Storage
if (localStorage.getItem("products") !== null) {
  productArray = JSON.parse(localStorage.getItem("products"));
} else {
  productArray = [];
}

// Create Btn Action (The Main Function)
createBtn.addEventListener("click", createProduct);

// ############################################## MAIN Function ##################################################

// Create Function
function createProduct() {
  //  Create Mode

  if (mode == "create") {
    if (
      textInputsRegex.test(title.value.trim()) &&
      textInputsRegex.test(category.value.trim()) &&
      numberReqInputsRegex.test(price.value.trim()) &&
      numberReqInputsRegex.test(count.value.trim()) &&
      numberNotReqInputsRegex.test(tax.value.trim()) &&
      numberNotReqInputsRegex.test(ads.value.trim()) &&
      numberNotReqInputsRegex.test(discount.value.trim())
    ) {
      for (let i = 0; i < count.value.trim(); i++) {
        // collect product data
        let productInfo = {
          title: title.value.trim().toLowerCase(),
          category: category.value.trim(),
          price: price.value.trim(),
          tax: tax.value.trim(),
          ads: ads.value.trim(),
          discount: discount.value.trim(),
          count: count.value.trim(),
          total: total.innerHTML,
        };

        // Push Product Data Into Array
        productArray.push(productInfo);

        // Add Product into local storage
        localStorage.setItem("products", JSON.stringify(productArray));
      }

      // Show Data When Click on Create btn
      showData();

      // Add A New Category
      makeNewCategory();

      // clear Inputs
      clearInputs();

      // close Create ASide
      closeCreateAside();
    } else {
      inputValidationStyling();
      return false;
    }
  }

  // ****************************************************** End Create MODE ***********************************************

  // Update MODE
  else {
    createBtn.innerHTML = "UPDATE";
    createAsideTitle.innerHTML = "Update Product";
    countSection.style.cssText = "display:none";

    createBtn.addEventListener("click", () => {
      if (mode == "update") {
        if (
          textInputsRegex.test(title.value.trim()) &&
          textInputsRegex.test(category.value.trim()) &&
          numberReqInputsRegex.test(price.value.trim()) &&
          numberNotReqInputsRegex.test(tax.value.trim()) &&
          numberNotReqInputsRegex.test(ads.value.trim()) &&
          numberNotReqInputsRegex.test(discount.value.trim())
        ) {
          // Updating Data of Product Array
          productArray[updatedElementIndex].title = title.value
            .trim()
            .toLowerCase();
          productArray[updatedElementIndex].category = category.value.trim();
          productArray[updatedElementIndex].price = price.value.trim();
          productArray[updatedElementIndex].tax = tax.value.trim();
          productArray[updatedElementIndex].ads = ads.value.trim();
          productArray[updatedElementIndex].discount = discount.value.trim();
          productArray[updatedElementIndex].total = total.innerHTML;

          // Add Product into local storage
          localStorage.setItem("products", JSON.stringify(productArray));

          // Show Data When Click on Create btn
          showData();

          // Add New category (if user updated a new one)
          makeNewCategory();

          // clear Inputs
          clearInputs();

          // Close ASIDE & Return Create mood
          closeCreateAside();
          mode = "create";
          createBtn.innerHTML = "CREATE";
          createAsideTitle.innerHTML = "Add New product";
          countSection.style.cssText = "display:flex";

          // Reload the page to render categoryContainer , and settimeout to avoid reload before close create Aside (aside transition 600ms)
          setTimeout(() => {
            window.location.reload();
          }, 650);
        } else {
          inputValidationStyling();
          return false;
        }
      }
    });
  }
  console.log(mode);
}

// ######################################### End OF MAIN Function ##################################################

// Uses Show Data in Global scope To Always refresh table Content
showData();

// Input Validation styling
function inputValidationStyling() {
  // Input Validation (Inputs not empty)
  for (let i = 0; i < reqInputs.length; i++) {
    if (
      reqInputs[i].value.trim() == "" ||
      reqInputs[i].value.trim().startsWith("0")
    ) {
      reqInputs[i].style.cssText = "outline: red solid 3px";
      reqInputs[i].setAttribute("placeholder", "Please fill This input");

      reqInputs[i].addEventListener("input", () => {
        reqInputs[i].style.cssText = "outline: none";
        reqInputs[i].removeAttribute("placeholder");
      });
    }
  }

  // Input Validation (no Negative values)
  for (let i = 0; i < numberInputs.length; i++) {
    if (Number(numberInputs[i].value.trim()) < 0) {
      numberInputs[i].style.cssText = "outline: red solid 3px";
      numberInputs[i].setAttribute("placeholder", "Please fill This input");

      numberInputs[i].addEventListener("input", () => {
        if (Number(numberInputs[i].value.trim()) > 0.1) {
          numberInputs[i].style.cssText = "outline: none";
          numberInputs[i].removeAttribute("placeholder");
        }
      });
    }
  }

}

// Show Data
function showData() {
  tbody.innerHTML = "";

  for (let i = 0; i < productArray.length; i++) {
    tbody.innerHTML += `
    <tr>
    <td>${i + 1}</td>
    <td>${productArray[i].title}</td>
    <td>${productArray[i].category}</td>
    <td>${productArray[i].price}</td>
    <td>${productArray[i].tax}</td>
    <td>${productArray[i].ads}</td>
    <td>${productArray[i].discount}</td>
    <td>${productArray[i].total}</td>

    <td> <button onclick="updateProduct(${i})" >
      <i class="fa-solid fa-pen"></i>
    </button> </td>

    <td> <button onclick="deleteProduct(${i})" >
      <i class="fa-solid fa-trash"></i>
    </button> </td>
  </tr>
  `;
  }
}

// Update Product
function updateProduct(index) {
  // Change Value of Tmp (updatedElementIndex) To Use it in Update Mode in Create Element Function
  updatedElementIndex = index;

  // Change Mode
  mode = "update";

  // Open Create Aside
  openCreateAside();

  // Put Products Value In Inputs
  title.value = productArray[index].title;
  category.value = productArray[index].category;
  price.value = productArray[index].price;
  tax.value = productArray[index].tax;
  ads.value = productArray[index].ads;
  discount.value = productArray[index].discount;
  getTotal();

  // Calling Create Product on Update mode to Render Create Aside
  createProduct();
}

// Delete Product
function deleteProduct(index) {
  // delete Product And Show Data
  productArray.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productArray));
  // Reload Page to refreshes CategoryContainer
  window.location.reload();
}

// Clear Inputs
function clearInputs() {
  inputs.forEach((input) => {
    input.value = "";
  });
  getTotal();
}

// Get all Products Category in The Global scope
let categoriesOfProductSet = new Set();

for (let i = 0; i < productArray.length; i++) {
  categoriesOfProductSet.add(productArray[i].category);
}

let categoriesOfProductArray = Array.from(categoriesOfProductSet);
// end of Get all Products Category

// Making Match Between products Categories and category Section
let arrayOfSet = [...categoriesOfProductArray];

// init Category Set
let categorySet = new Set(arrayOfSet);

// add new category For Create And Update
function makeNewCategory() {
  categorySet.add(category.value.trim());

  // Making Array Of Set For storing set Data in local storage
  arrayOfSet = Array.from(categorySet);

  // Show Category Data
  showCategoryData();
}

// Show Category Function  in Global Scope to be always Shown
showCategoryData();

// Show Category Data Function used in global scope and as a callback function in (makeNewCategory() ) function
function showCategoryData() {
  categoryContainer.innerHTML = "";

  for (let i = 0; i < arrayOfSet.length; i++) {
    categoryContainer.innerHTML += `
    <div onclick="searchByCategory(this)" class="category-item">${arrayOfSet[i]}</div>
    `;
  }
}

// search Functions

// Search by Category Function , **** Its CallBack Function in (showCategoryData() ) function

function searchByCategory(element) {
  tbody.innerHTML = "";
  let categoryCounter = 1;

  // Show category search data in table
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].category == element.innerHTML) {
      tbody.innerHTML += `
      <tr>
      <td>${categoryCounter}</td>
      <td>${productArray[i].title}</td>
      <td>${productArray[i].category}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].tax}</td>
      <td>${productArray[i].ads}</td>
      <td>${productArray[i].discount}</td>
      <td>${productArray[i].total}</td>
  
      <td> <button onclick="updateProduct(${i})" >
        <i class="fa-solid fa-pen"></i>
      </button> </td>
  
      <td> <button onclick="deleteProduct(${i})" >
        <i class="fa-solid fa-trash"></i>
      </button> </td>
    </tr>
    `;
      categoryCounter++;
    }
  }

  closeSearchAside();
  popup.style.setProperty("visibility", "hidden", "important");
}

// Search by Title Function
searcheBtn.addEventListener("click", searchByTitle);

function searchByTitle() {
  tbody.innerHTML = "";
  let SearchCounter = 1;

  for (let i = 0; i < productArray.length; i++) {
    if (
      productArray[i].title.includes(searchInput.value.trim().toLowerCase())
    ) {
      tbody.innerHTML += `
      <tr>
      <td>${SearchCounter}</td>
      <td>${productArray[i].title}</td>
      <td>${productArray[i].category}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].tax}</td>
      <td>${productArray[i].ads}</td>
      <td>${productArray[i].discount}</td>
      <td>${productArray[i].total}</td>
  
      <td> <button onclick="updateProduct(${i})" >
        <i class="fa-solid fa-pen"></i>
      </button> </td>
  
      <td> <button onclick="deleteProduct(${i})" >
        <i class="fa-solid fa-trash"></i>
      </button> </td>
    </tr>
    `;
      SearchCounter++;
    }
    if (tbody.innerHTML != "") {
      closeSearchAside();
      popup.style.setProperty("visibility", "hidden", "important");
    }
  }
}
