// ========================= Html Elements ========================= //
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let submitBtn = document.getElementById("submitBtn");
let visitBtn = document.getElementById("visitBtn");
let deleteBtn = document.getElementById("deleteBtn");
let tableBody = document.getElementById("tableBody");

// ========================= Global variables ========================= //
let sites = [];
let index;

// ========================= Check On localStorage ========================= //
if (localStorage.getItem("sites")) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

// ========================= Functions ========================= //

// validate functions
function validateName() {
  let nameRegex = /^\w{3,}(\s+\w+)*$/;
  if (nameRegex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}
function validateMail() {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (urlRegex.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}

// [5] visit function
function goToWebsite(index) {
  window.open(sites[index].urlSite);
}

// [4] delete site
function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
}

// [3] reset function
function resetFields() {
  siteName.value = null;
  siteUrl.value = null;
}

// [2] read function
function displaySites() {
  let htmlSite = ``;
  for (let i = 0; i < sites.length; i++) {
    htmlSite += `
        <tr>
          <td>${i + 1}</td>
          <td>${sites[i].nameSite}</td>
          <td>
            <button onclick="goToWebsite(${i})" id="visitBtn" class="btn visit-btn text-white">
              <i class="fa-solid fa-eye"></i>
              Visit
            </button>
          </td>
          <td>
            <button onclick="deleteSite(${i})" id="deleteBtn" class="btn delete-btn text-white fs-6">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
        </tr>`;
    tableBody.innerHTML = htmlSite;
  }
}

// [1] add function
function addSite() {
  if (validateName() & validateMail()) {
    let site = {
      nameSite: siteName.value,
      urlSite: siteUrl.value,
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySites();
    resetFields();
  }
}

// ========================= Events ========================= //
submitBtn.addEventListener("click", () => addSite());
siteName.addEventListener("input", validateName);
siteUrl.addEventListener("input", validateMail);
