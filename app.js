const form = document.getElementById("repair-form");
const list = document.getElementById("repair-list");

// Load saved repairs, or start with an empty list
let repairs = JSON.parse(localStorage.getItem("repairs")) || [];

function saveRepairs() {
  localStorage.setItem("repairs", JSON.stringify(repairs));
}

function renderRepairs() {
  list.innerHTML = "";

  repairs.forEach((repair, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${repair.client}</td>
      <td>${repair.device}</td>
      <td>${repair.issue}</td>
      <td>
        <select data-index="${index}" class="status-select">
          <option ${repair.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${repair.status === "In progress" ? "selected" : ""}>In progress</option>
          <option ${repair.status === "Done" ? "selected" : ""}>Done</option>
        </select>
      </td>
      <td>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    list.appendChild(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newRepair = {
    client: document.getElementById("client").value.trim(),
    device: document.getElementById("device").value.trim(),
    issue: document.getElementById("issue").value.trim(),
    status: document.getElementById("status").value,
  };

  repairs.push(newRepair);
  saveRepairs();
  renderRepairs();
  form.reset();
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.dataset.index;
    repairs.splice(index, 1);
    saveRepairs();
    renderRepairs();
  }
});

list.addEventListener("change", (event) => {
  if (event.target.classList.contains("status-select")) {
    const index = event.target.dataset.index;
    repairs[index].status = event.target.value;
    saveRepairs();
  }
});

renderRepairs();