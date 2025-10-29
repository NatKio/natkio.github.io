document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const clearButton = document.getElementById("clearButton");
  const addCourseButton = document.getElementById("addCourse");
  const coursesDiv = document.getElementById("courses");
  const output = document.getElementById("output");

  // Prevent default form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = form.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        alert("Please fill out all required fields.");
        return;
      }
    }

    // Gather form data
    const data = new FormData(form);
    let html = `<h2>${data.get("firstName")} ${data.get("lastName")}</h2>`;
    html += `<p><strong>${data.get("acknowledgeStatement")}</strong></p>`;
    html += `<p>${data.get("personalStatement")}</p>`;
    html += `<h3>Courses:</h3><ul>`;

    const courseDepts = Array.from(form.querySelectorAll("[name='courseDept']")).map(i => i.value);
    const courseNums = Array.from(form.querySelectorAll("[name='courseNumber']")).map(i => i.value);
    const courseNames = Array.from(form.querySelectorAll("[name='courseName']")).map(i => i.value);
    const courseReasons = Array.from(form.querySelectorAll("[name='courseReason']")).map(i => i.value);

    courseDepts.forEach((_, i) => {
      html += `<li>${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]} (${courseReasons[i]})</li>`;
    });
    html += `</ul>`;

    html += `<p><em>"${data.get("quote")}" — ${data.get("quoteAuthor")}</em></p>`;
    html += `<a href="#" id="resetLink">Reset Form</a>`;

    form.style.display = "none";
    output.innerHTML = html;

    // Reset link functionality
    document.getElementById("resetLink").addEventListener("click", (e) => {
      e.preventDefault();
      output.innerHTML = "";
      form.style.display = "block";
      form.reset();
    });
  });

  // Add new course fields
  addCourseButton.addEventListener("click", () => {
    const courseGroup = document.createElement("div");
    courseGroup.classList.add("course-group");
    courseGroup.innerHTML = `
      <input type="text" name="courseDept" placeholder="Department" required>
      <input type="text" name="courseNumber" placeholder="Course Number" required>
      <input type="text" name="courseName" placeholder="Course Name" required>
      <input type="text" name="courseReason" placeholder="Reason">
      <button type="button" class="deleteCourse">Delete</button>
    `;
    coursesDiv.appendChild(courseGroup);

    courseGroup.querySelector(".deleteCourse").addEventListener("click", () => {
      coursesDiv.removeChild(courseGroup);
    });
  });

  // Clear button functionality
  clearButton.addEventListener("click", () => {
    Array.from(form.querySelectorAll("input, textarea")).forEach((input) => {
      if (input.type !== "file") input.value = "";
    });
  });

  // Picture preview
  document.getElementById("pictureUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("picturePreview").src = URL.createObjectURL(file);
    }
  });
});
