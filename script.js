document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const tableBody = document.querySelector("#userTable tbody");

    // Load saved data on page load
    loadEntries();

    // Date Validation (Age must be between 18 and 55)
    document.getElementById("dob").addEventListener("change", function () {
        let dob = new Date(this.value);
        let today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        let monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert("Your age must be between 18 and 55.");
            this.value = "";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const termsAccepted = document.getElementById("terms").checked;

        if (!name || !email || !password || !dob || !termsAccepted) {
            alert("All fields must be filled and Terms must be accepted.");
            return;
        }

        const userData = { name, email, password, dob, termsAccepted };

        // Save data to local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        // Update Table
        addEntryToTable(userData);
        form.reset();
    });

    function loadEntries() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => addEntryToTable(user));
    }

    function addEntryToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.termsAccepted}</td>
        `;
        tableBody.appendChild(row);
    }
});
