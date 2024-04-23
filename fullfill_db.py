import requests
import pyrebase
import random
from firebase_config import config

# Initialize Firebase
firebase = pyrebase.initialize_app(config)
db = firebase.database()

# Google Books API setup
GOOGLE_API_KEY = 'AIzaSyAAA8NCAsFMiA5fKva5KKMPTVLWVxeIwAI'
SEARCH_TERMS = ['literature', 'science', 'history']  # Example search terms

def fetch_books(search_term, startIndex=0, maxResults=40):
    """Fetch books from Google Books API"""
    url = f"https://www.googleapis.com/books/v1/volumes?q={search_term}&startIndex={startIndex}&maxResults={maxResults}&key={GOOGLE_API_KEY}"
    response = requests.get(url)
    return response.json()

def upload_books(books_data):
    """Upload books data to Firebase"""
    for book in books_data.get('items', []):
        try:
            title = book['volumeInfo']['title']
            authors = book['volumeInfo'].get('authors', ['Unknown'])[0]
            description = book['volumeInfo'].get('description', 'No description available.')
            image_links = book['volumeInfo'].get('imageLinks', {}).get('thumbnail', '')
            publish_year = book['volumeInfo'].get('publishedDate', 'N/A').split('-')[0]

            # Random rating between 1 and 5
            rating = random.randint(1, 5)

            book_data = {
                'title': title,
                'author': authors,
                'desc': description,
                'image': image_links,
                'year': publish_year,
                'rating': rating
            }
            db.child("Books").push(book_data)
            print(f"Uploaded: {title} with rating {rating}")
        except KeyError as e:
            print(f"Missing data for a book, skipped due to error: {e}")

def main():
    max_results_per_term = 67  # Split the number of books you want among the search terms
    for term in SEARCH_TERMS:
        print(f"Fetching books for: {term}")
        for start_index in range(0, max_results_per_term, 40):  # Adjust step to match maxResults
            books_data = fetch_books(term, start_index, min(40, max_results_per_term - start_index))
            upload_books(books_data)

if __name__ == '__main__':
    main()
