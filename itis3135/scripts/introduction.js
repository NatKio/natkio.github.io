document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const clearButton = document.getElementById("clearButton");
  const addCourseButton = document.getElementById("addCourse");
  const coursesDiv = document.getElementById("courses");
  const output = document.getElementById("output");
  const picturePreview = document.getElementById("picturePreview");
  const pictureUpload = document.getElementById("pictureUpload");
  const defaultPreviewSrc = "images/yellowstoneselfie.jpg";

  // Safety check: ensure all required elements exist
  if (!form || !clearButton || !addCourseButton || !coursesDiv || !output || !picturePreview || !pictureUpload) {
    console.error("One or more required DOM elements are missing.");
    return;
  }

  // Utility function to remove extra course groups
  function removeExtraCourses() {
    const courseGroups = coursesDiv.querySelectorAll(".course-group");
    courseGroups.forEach((group, index) => {
      if (index > 0) coursesDiv.removeChild(group);
    });
  }

  // Submit button
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        alert("Please fill out all required fields.");
        return;
      }
    }

    const data = new FormData(form);
    const firstName = data.get("firstName") || "";
    const lastName = data.get("lastName") || "";
    const ack = data.get("acknowledgeStatement") || "";
    const personal = data.get("personalStatement") || "";
    const quote = data.get("quote") || "";
    const quoteAuthor = data.get("quoteAuthor") || "";

    let html = `<h2>${firstName} ${lastName}</h2>`;
    html += `<p><strong>${ack}</strong></p>`;
    html += `<p>${personal}</p>`;
    html += `<h3>Courses:</h3><ul>`;

    const courseDepts = Array.from(form.querySelectorAll("[name='courseDept']")).map((i) => i.value.trim());
    const courseNums = Array.from(form.querySelectorAll("[name='courseNumber']")).map((i) => i.value.trim());
    const courseNames = Array.from(form.querySelectorAll("[name='courseName']")).map((i) => i.value.trim());
    const courseReasons = Array.from(form.querySelectorAll("[name='courseReason']")).map((i) => i.value.trim());

    courseDepts.forEach((_, i) => {
      if (courseDepts[i] && courseNums[i] && courseNames[i]) {
        html += `<li>${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]} (${courseReasons[i] || "No reason provided"})</li>`;
      }
    });
    html += `</ul>`;

    if (quote || quoteAuthor) {
      html += `<p><em>"${quote}" — ${quoteAuthor}</em></p>`;
    }

    // Ensure only one reset link exists
    const resetId = "resetLink";
    if (document.getElementById(resetId)) {
      document.getElementById(resetId).remove();
    }

    html += `<a href="#" id="${resetId}">Reset Form</a>`;
    form.style.display = "none";
    output.innerHTML = html;

    document.getElementById(resetId).addEventListener("click", (e) => {
      e.preventDefault();
      output.innerHTML = "";
      form.style.display = "block";
      form.reset();
      picturePreview.src = defaultPreviewSrc;
      removeExtraCourses();
    });
  });

  // Add course
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

  // Clear button
  clearButton.addEventListener("click", () => {
    form.querySelectorAll("input, textarea").forEach((input) => {
      if (input.type === "file") {
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
      } else {
        input.value = "";
      }
    });
    picturePreview.src = defaultPreviewSrc;
    removeExtraCourses();
  });

  // Reset button
  form.addEventListener("reset", () => {
    picturePreview.src = defaultPreviewSrc;
    removeExtraCourses();
  });

  // Picture preview
  pictureUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      picturePreview.src = URL.createObjectURL(file);
    }
  });

  console.log("introduction.js loaded successfully");
});