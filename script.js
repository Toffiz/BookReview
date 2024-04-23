import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

document.addEventListener('DOMContentLoaded', function() {
    // Example functionality for form submissions
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Login Submitted!');
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Registration Submitted!');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var loginLink = document.querySelector('a[href="#login"]');
    var registerLink = document.querySelector('a[href="#register"]');
    var closes = document.querySelectorAll('.close');

    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    loginLink.onclick = function() {
        openModal(document.getElementById('login-modal'));
    };

    registerLink.onclick = function() {
        openModal(document.getElementById('register-modal'));
    };

    closes.forEach(close => {
        close.onclick = function() {
            modals.forEach(modal => closeModal(modal));
        };
    });

    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    };
});

// Get modal elements and close buttons
const registerModal = document.getElementById('register-modal');
const loginModal = document.getElementById('login-modal');
const registerClose = document.querySelector('#register-modal .close');
const loginClose = document.querySelector('#login-modal .close');

// Get form elements
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Functions to open and close modals
function openModal(modal) {
    modal.style.display = 'block';
}
function closeModal(modal) {
    modal.style.display = 'none';
}

// Event listeners for modal open and close actions
document.querySelector('a[href="#register"]').addEventListener('click', () => openModal(registerModal));
document.querySelector('a[href="#login"]').addEventListener('click', () => openModal(loginModal));
registerClose.onclick = () => closeModal(registerModal);
loginClose.onclick = () => closeModal(loginModal);
window.onclick = function(event) {
    if (event.target === registerModal || event.target === loginModal) {
        closeModal(event.target);
    }
};

// Handling form submissions
registerForm.onsubmit = function(event) {
    event.preventDefault();
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
        closeModal(registerModal);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to register: ' + error.message);
    });
};

loginForm.onsubmit = function(event) {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Login successful!');
            closeModal(loginModal);
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to login: ' + error.message);
    });
};


document.addEventListener('DOMContentLoaded', function() {

    // Import the functions you need from the SDKs you need
   
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
   
    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyDNn4USSAqIzPuxTKTU803Oifllta5_jPY",
    authDomain: "bookreviewdb-a9714.firebaseapp.com",
    projectId: "bookreviewdb-a9714",
    databaseURL: "https://bookreviewdb-a9714-default-rtdb.firebaseio.com/",
    storageBucket: "bookreviewdb-a9714.appspot.com",
    messagingSenderId: "487026821655",
    appId: "1:487026821655:web:360645bab78a3da49fea52"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const dbRef = firebase.database().ref('Books');

    dbRef.once('value', function(snapshot) {
        if (!snapshot.exists()) {
            console.log('No data available');
            return;
        }
        const booksContainer = document.querySelector('.book-list');
        snapshot.forEach(function(childSnapshot) {
            const book = childSnapshot.val();
            console.log(book); // Check what book data looks like
            if (book) {
                const bookElement = document.querySelector('#book-template').cloneNode(true);
                bookElement.style.display = 'block';
                bookElement.querySelector('.book-title').textContent = book.title || 'No title';
                bookElement.querySelector('.book-desc').textContent = book.desc || 'No description available.';
                bookElement.querySelector('.book-image').src = book.image || 'path/to/default-image.jpg';
                bookElement.querySelector('.book-image').alt = `Cover of ${book.title}`;
                bookElement.querySelector('.rating-value').textContent = book.rating || 'N/A';
                booksContainer.appendChild(bookElement);
            }
        });
    });
    
});

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "..."; // Truncate and add ellipsis
    } else {
        return str;
    }
}

// When setting book details in your script:

document.addEventListener('DOMContentLoaded', function() {
    const dbRef = firebase.database().ref('Books');
    let books = []; // Store fetched books for searching
    const ratingModal = document.getElementById('rating-modal');
    const closeModalButton = document.querySelector('#rating-modal .close');

    // Fetch and display all books
    function displayBooks(query = '') {
        const booksContainer = document.querySelector('#books-display');
        booksContainer.innerHTML = '<h2>Featured Books</h2>'; // Clear previous results

        books.filter(book => {
            return book.title.toLowerCase().includes(query.toLowerCase()) ||
                   book.author.toLowerCase().includes(query.toLowerCase()) ||
                   book.desc.toLowerCase().includes(query.toLowerCase());
        }).forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `
                <img src="${book.image}" alt="Cover of ${book.title}" class="book-image">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-desc">${book.desc}</p>
                <p class="book-rating">Rating: <span class="rating-value">${book.rating}</span>/5</p>
            `;
            bookElement.onclick = () => openRatingModal(book);
            booksContainer.appendChild(bookElement);
        });
    }
    function openRatingModal(book) {
        document.getElementById('modal-book-title').textContent = book.title;
        document.getElementById('modal-book-image').src = book.image;
        document.getElementById('modal-book-desc').textContent = book.desc;
        ratingModal.style.display = 'block';
    }

    closeModalButton.onclick = function() {
        ratingModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == ratingModal) {
            ratingModal.style.display = 'none';
        }
    };

    // Initial fetch of books
    dbRef.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            let book = childSnapshot.val();
            books.push(book);
        });
        displayBooks(); // Display all books initially
    });

    document.getElementById('rate-comment-form').onsubmit = function(event) {
        event.preventDefault();
        const rating = document.getElementById('book-rating').value;
        const comment = document.getElementById('book-comment').value;
        console.log(`Rating: ${rating}, Comment: ${comment}`); // Replace with Firebase operations
        ratingModal.style.display = 'none';
    };

    // Search functionality
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('search-input').value;
        displayBooks(searchQuery);
    });
});





