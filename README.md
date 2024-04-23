<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="container">
        <header>
            <h1>Book Review Platform</h1>
        </header>
        <section>
            <h2>Overview</h2>
            <p>Book Review Platform is a web-based application that allows users to read, publish, and discuss book reviews. This platform supports user registrations, book searches, and interactive features such as rating and commenting on books. Users can view book details, search for books by title, author, or description, and interact with other readers through comments.</p>
        </section>
        <section>
            <h2>Features</h2>
            <ul>
                <li>User Authentication: Register and log in to access personalized features.</li>
                <li>Book Listings: Browse a list of books fetched from the Google Books API.</li>
                <li>Search Functionality: Search for books based on keywords in the title, author's name, or description.</li>
                <li>Ratings and Comments: Logged-in users can rate books and leave comments.</li>
                <li>Responsive Design: Accessible on various devices, ensuring a seamless reading and interaction experience.</li>
            </ul>
        </section>
        <section>
            <h2>Technology Stack</h2>
            <ul>
                <li>Frontend: HTML, CSS, JavaScript</li>
                <li>Backend: Firebase Realtime Database, Firebase Authentication, Flask</li>
                <li>APIs: Google Books API</li>
            </ul>
        </section>
        <section>
            <h2>Installation and Setup</h2>
            <h3>Prerequisites</h3>
            <ul>
                <li>Flask, flask_cors, pyrebase, requests</li>
            </ul>
            <h3>Local Development</h3>
            <p>1. <strong>Clone the repository:</strong></p>
            <code>git clone https://github.com/your-username/book-review-platform.git</code>
            <p>2. <strong>Install dependencies:</strong></p>
            <p>This project requires no specific libraries to be installed for the front-end if running directly in the browser as it uses vanilla HTML, CSS, and JS. Ensure you have the Firebase project set up.</p>
            <p>3. <strong>Run the application:</strong></p>
            <p>Open the <code>index.html</code> file in a browser to view the application. For a better development experience, you can use an HTTP server such as <code>http-server</code>:</p>
            <code>python -m venv venv</code>
            <code>source venv/bin/activate</code>
            <code>pip install flask, flask_cors, requests, pyrebase4</code>
            <code>http-server .</code>
            <p>Visit <a href="http://localhost:5000">http://localhost:5000</a> to access the application.</p>
        </section>
        <section>
            <h2>Чего не хватает</h2>
            <ul>
                <li>Рейтинг книг не подключен к базе данных, есть просто готовая форма, я не успел ее сделать</li>
                <li>Более удобного и красивого дизайна чем мое, хотел подобрать рассветку под ваши иконки красно-белое</li>
                <li>Нехватает также поиска по фильтрам и рекомендация книг по интересу, незнаю пока как реализовать это, и не успею думаю</li>
            </ul>
        </section>
        <footer>
            <p>&copy; 2024 Book Review Platform</p>
        </footer>
    </div>
</body>
</html>
