import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from nltk.metrics.distance import editDistanceance

# Load the CSV file into a dataframe
df = pd.read_csv('urlDataset.csv')

# Preprocess the data
def preprocess_data(url):
    # Euclidean Distance
    characterFrequency = np.array(list(url)).astype(float)
    characterFrequency /= np.linalg.norm(characterFrequency)
    euclideanDistance = np.sum((characterFrequency - np.array(list('standard English')))**2)
    
    # Character Frequencies
    characterCounts = {c: url.count(c)/len(url) for c in set(url)}
    
    # Edit distance
    editDistance = editDistance(url, 'standard English')
    
    # Length of URL
    urlLength = len(url)
    
    # Presence of @ and - symbols
    has_AT_symbol = int('@' in url)
    has_dash_symbol = int('-' in url)
    
    return [euclideanDistance, characterCounts, editDistance, urlLength, has_AT_symbol, has_dash_symbol]

df['features'] = df['URL'].apply(preprocess_data)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df['features'], df['Label'], test_size=0.2, random_state=42)

# Create a count vectorizer to convert character counts into feature vectors
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)

# Train the model using the SMO algorithm
classifier = SVC(kernel='linear')
classifier.fit(X_train, y_train)

# Make predictions on the test set
y_pred = classifier.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")