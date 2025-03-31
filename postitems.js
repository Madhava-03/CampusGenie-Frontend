document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');
    const typeButtons = document.querySelectorAll('.type-btn');
    let currentType = 'lost';

    // Handle form type switching
    typeButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            
            // Update button states
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current type
            currentType = this.dataset.type;
            
            // Update form
            updateFormUI(currentType);
            updateFormPlaceholders(currentType);
            
            return false; // Prevent any default behavior
        };
    });

    function updateFormUI(type) {
        const sectionTitle = document.querySelector('.section-title');
        const submitButton = document.querySelector('.submit-button');
        
        if (type === 'lost') {
            sectionTitle.textContent = 'Report Lost Item';
            submitButton.textContent = 'Submit Lost Item Report';
        } else {
            sectionTitle.textContent = 'Report Found Item';
            submitButton.textContent = 'Submit Found Item Report';
        }
    }

    // Update form placeholders based on type
    function updateFormPlaceholders(type) {
        const titleInput = document.getElementById('itemTitle');
        const locationInput = document.getElementById('location');
        const descriptionInput = document.getElementById('description');

        if (type === 'lost') {
            titleInput.placeholder = 'Name of Lost Item';
            locationInput.placeholder = 'Where did you lose it?';
            descriptionInput.placeholder = 'Describe your lost item in detail';
        } else {
            titleInput.placeholder = 'Name of Found Item';
            locationInput.placeholder = 'Where did you find it?';
            descriptionInput.placeholder = 'Describe the found item in detail';
        }
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading overlay
        const loadingOverlay = document.querySelector('.loading-overlay');
        loadingOverlay.style.display = 'flex';

        const formData = new FormData();
        formData.append('type', currentType);
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('itemTitle', document.getElementById('itemTitle').value);
        formData.append('location', document.getElementById('location').value);
        formData.append('date', document.getElementById('date').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('image', document.getElementById('itemImage').files[0]);

        try {
            // Simulate API delay (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Replace with your actual API endpoint
            const response = await fetch('/api/items', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Hide loading overlay
                loadingOverlay.style.display = 'none';
                
                // Show success popup
                const successPopup = document.querySelector('.success-popup');
                successPopup.style.display = 'block';
                
                // Reset form
                form.reset();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            alert('Error submitting form: ' + error.message);
        }
    });

    // Add this function to close the popup
    window.closePopup = function() {
        const successPopup = document.querySelector('.success-popup');
        successPopup.style.display = 'none';
    };
});