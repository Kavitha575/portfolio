// Load gallery items
const projects = [
    { title: "Corporate Branding", image: "images/image1.png" },
    { title: "Mobile App Designer", image: "images/image2.png" },
    { title: "Modern Art Gallery", image: "images/image3.png" }
];

function loadGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-title">${project.title}</div>
        `;
        galleryContainer.appendChild(projectElement);
    });
}

document.addEventListener("DOMContentLoaded", loadGallery);

// Export to PDF
document.getElementById("export-pdf").addEventListener("click", async () => {
    try {
        const response = await fetch('/.netlify/functions/generatePDF', { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Jane_Doe_Portfolio.pdf";
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting PDF:', error);
        alert('Failed to export PDF.');
    }
});

// Submit contact form
document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Message sent successfully!");
            event.target.reset();
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert("Failed to send message.");
    }
});
